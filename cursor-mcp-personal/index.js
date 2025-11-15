import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import screenshotDesktop from 'screenshot-desktop';

const WORKSPACE_ROOT =
  process.env.MCP_ALLOWED_ROOT ??
  path.resolve('C:\\Users\\Alexandru\\Desktop\\Cursor');

const ALLOWED_COMMANDS = new Set([
  'cmd',
  'cmd.exe',
  'powershell',
  'powershell.exe',
  'git',
  'npm',
  'npx',
  'node',
  'python',
  'dotnet'
]);

const ALLOWED_GUI_APPS = new Map(
  Object.entries({
    wizfile: 'C:\\Program Files\\WizFile\\WizFile64.exe',
    wizfile32: 'C:\\Program Files (x86)\\WizFile\\WizFile.exe'
  })
);

const SCREENSHOT_DIR = path.join(WORKSPACE_ROOT, 'screenshots');

const server = new McpServer({
  name: 'cursor-mcp-personal',
  version: '1.0.0'
});

/**
 * Ensures the requested path stays inside the allowed workspace root.
 */
function resolveSafePath(relativePath) {
  if (!relativePath) {
    throw new Error('Path is required');
  }

  const resolved = path.resolve(WORKSPACE_ROOT, relativePath);
  if (!resolved.startsWith(WORKSPACE_ROOT)) {
    throw new Error('Path escapes the allowed workspace root');
  }
  return resolved;
}

function spawnWithOutput(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? WORKSPACE_ROOT,
      windowsHide: true,
      env: options.env ?? process.env
    });

    let stdout = '';
    let stderr = '';
    if (child.stdout) {
      child.stdout.on('data', data => {
        stdout += data.toString();
      });
    }
    if (child.stderr) {
      child.stderr.on('data', data => {
        stderr += data.toString();
      });
    }

    const timeout =
      options.timeoutMs &&
      setTimeout(() => {
        child.kill('SIGTERM');
        reject(new Error('Command timed out'));
      }, options.timeoutMs);

    child.on('error', error => {
      if (timeout) {
        clearTimeout(timeout);
      }
      reject(error);
    });

    child.on('close', code => {
      if (timeout) {
        clearTimeout(timeout);
      }
      resolve({ code, stdout, stderr });
    });
  });
}

async function runCommand({
  command,
  args = [],
  cwd,
  timeoutMs,
  runAsAdmin = false
}) {
  if (!command) {
    throw new Error('command is required');
  }

  const base = command.includes('\\')
    ? path.basename(command).toLowerCase()
    : command.toLowerCase();

  if (!ALLOWED_COMMANDS.has(base)) {
    throw new Error(
      `Command "${command}" is not in the allow list. Allowed: ${[
        ...ALLOWED_COMMANDS
      ].join(', ')}`
    );
  }

  const finalCwd = cwd ? resolveSafePath(cwd) : WORKSPACE_ROOT;

  if (runAsAdmin) {
    const escapedArgs = args
      .map(arg => `'${arg.replace(/'/g, "''")}'`)
      .join(', ');
    const psCommand = [
      `Start-Process -Verb RunAs -Wait -FilePath '${command}'`,
      args.length ? `-ArgumentList ${escapedArgs}` : '',
      '-WindowStyle Hidden'
    ]
      .filter(Boolean)
      .join(' ');

    return spawnWithOutput(
      'powershell.exe',
      ['-NoProfile', '-Command', psCommand],
      { cwd: finalCwd, timeoutMs }
    );
  }

  return spawnWithOutput(command, args, { cwd: finalCwd, timeoutMs });
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function runPowerShell(script, options = {}) {
  return spawnWithOutput(
    'powershell.exe',
    ['-NoProfile', '-Command', script],
    options
  );
}

server.tool(
  'ping',
  'Simple sanity check tool that returns "pong".',
  {},
  async () => ({
    content: [
      {
        type: 'text',
        text: 'pong'
      }
    ]
  })
);

server.tool(
  'shell_run',
  'Run a whitelisted command inside the workspace with optional admin elevation.',
  {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'Executable name (e.g. "git", "npm", "powershell.exe").'
      },
      args: {
        type: 'array',
        items: { type: 'string' },
        default: []
      },
      cwd: {
        type: 'string',
        description: 'Working directory relative to the workspace root.'
      },
      timeoutMs: {
        type: 'number',
        minimum: 1000,
        maximum: 600000,
        default: 60000
      },
      runAsAdmin: {
        type: 'boolean',
        default: false,
        description: 'If true, attempt to run via UAC prompt (requires approval).'
      }
    },
    required: ['command']
  },
  async ({ command, args = [], cwd, timeoutMs = 60000, runAsAdmin = false }) => {
    const result = await runCommand({
      command,
      args,
      cwd,
      timeoutMs,
      runAsAdmin
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              exitCode: result.code,
              stdout: result.stdout.trim(),
              stderr: result.stderr.trim()
            },
            null,
            2
          )
        }
      ]
    };
  }
);

server.tool(
  'file_read',
  'Read a file within the allowed workspace root.',
  {
    type: 'object',
    properties: {
      relativePath: {
        type: 'string',
        description: 'Path relative to the workspace root.'
      },
      encoding: {
        type: 'string',
        default: 'utf-8'
      }
    },
    required: ['relativePath']
  },
  async ({ relativePath, encoding = 'utf-8' }) => {
    const target = resolveSafePath(relativePath);
    const data = await fs.readFile(target, encoding);
    return {
      content: [
        {
          type: 'text',
          text: data
        }
      ]
    };
  }
);

server.tool(
  'file_write',
  'Write text content to a file within the workspace root.',
  {
    type: 'object',
    properties: {
      relativePath: {
        type: 'string',
        description: 'File path relative to the workspace root.'
      },
      content: {
        type: 'string',
        description: 'Text content to write.'
      },
      overwrite: {
        type: 'boolean',
        default: true
      }
    },
    required: ['relativePath', 'content']
  },
  async ({ relativePath, content, overwrite = true }) => {
    const target = resolveSafePath(relativePath);
    const dirName = path.dirname(target);
    await fs.mkdir(dirName, { recursive: true });

    if (!overwrite) {
      try {
        await fs.access(target);
        throw new Error('File already exists and overwrite is false.');
      } catch {
        // file does not exist, continue
      }
    }

    await fs.writeFile(target, content, 'utf-8');
    return {
      content: [
        {
          type: 'text',
          text: `Wrote ${content.length} characters to ${relativePath}`
        }
      ]
    };
  }
);

server.tool(
  'file_delete',
  'Delete a file or directory (recursive) within the workspace root.',
  {
    type: 'object',
    properties: {
      relativePath: {
        type: 'string',
        description: 'Path relative to workspace root.'
      },
      recursive: {
        type: 'boolean',
        default: false
      }
    },
    required: ['relativePath']
  },
  async ({ relativePath, recursive = false }) => {
    const target = resolveSafePath(relativePath);
    await fs.rm(target, { recursive, force: false });
    return {
      content: [
        {
          type: 'text',
          text: `Deleted ${relativePath}`
        }
      ]
    };
  }
);

server.tool(
  'process_list',
  'List running processes (optionally filtered by name).',
  {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Optional process name to filter by.'
      },
      top: {
        type: 'number',
        default: 10,
        minimum: 1,
        maximum: 50
      }
    }
  },
  async ({ name, top = 10 }) => {
    const filter = name
      ? `Get-Process -Name '${name.replace(/'/g, "''")}' -ErrorAction SilentlyContinue`
      : 'Get-Process';
    const script = `${filter} | Sort-Object CPU -Descending | Select-Object -First ${top} Id, ProcessName, CPU, StartTime | ConvertTo-Json`;

    const result = await runPowerShell(script, { timeoutMs: 15000 });
    return {
      content: [
        {
          type: 'text',
          text: result.stdout || '[]'
        }
      ]
    };
  }
);

server.tool(
  'process_terminate',
  'Stop a process by id or name.',
  {
    type: 'object',
    properties: {
      processId: {
        type: 'number',
        description: 'Process ID to terminate.'
      },
      processName: {
        type: 'string',
        description: 'Process name to terminate (all matches).'
      },
      force: {
        type: 'boolean',
        default: false
      }
    }
  },
  async ({ processId, processName, force = false }) => {
    if (!processId && !processName) {
      throw new Error('Provide either processId or processName.');
    }
    const target = processId
      ? `-Id ${processId}`
      : `-Name '${processName.replace(/'/g, "''")}'`;
    const forceFlag = force ? '-Force' : '';
    const script = `Stop-Process ${target} ${forceFlag} -ErrorAction Stop`;
    const result = await runPowerShell(script, { timeoutMs: 10000 });

    return {
      content: [
        {
          type: 'text',
          text: result.stderr
            ? `Stop-Process completed with warnings: ${result.stderr}`
            : 'Process termination requested.'
        }
      ]
    };
  }
);

server.tool(
  'service_control',
  'Inspect or control Windows services.',
  {
    type: 'object',
    properties: {
      serviceName: {
        type: 'string',
        description: 'Target Windows service name (e.g. "Spooler").'
      },
      action: {
        type: 'string',
        enum: ['status', 'start', 'stop', 'restart']
      }
    },
    required: ['serviceName', 'action']
  },
  async ({ serviceName, action }) => {
    const escaped = serviceName.replace(/'/g, "''");
    let script;
    switch (action) {
      case 'status':
        script = `Get-Service -Name '${escaped}' | Select-Object Name, Status, StartType | ConvertTo-Json`;
        break;
      case 'start':
        script = `Start-Service -Name '${escaped}'; Get-Service -Name '${escaped}' | Select-Object Name, Status | ConvertTo-Json`;
        break;
      case 'stop':
        script = `Stop-Service -Name '${escaped}' -Force; Get-Service -Name '${escaped}' | Select-Object Name, Status | ConvertTo-Json`;
        break;
      case 'restart':
        script = `Restart-Service -Name '${escaped}' -Force; Get-Service -Name '${escaped}' | Select-Object Name, Status | ConvertTo-Json`;
        break;
      default:
        throw new Error(`Unsupported action ${action}`);
    }

    const result = await runPowerShell(script, { timeoutMs: 20000 });
    return {
      content: [
        {
          type: 'text',
          text: result.stdout || result.stderr || 'No response'
        }
      ]
    };
  }
);

server.tool(
  'launch_app',
  'Launch a GUI application (whitelisted or explicit path) via Start-Process.',
  {
    type: 'object',
    properties: {
      appKey: {
        type: 'string',
        description: `Optional shortcut key. Configured keys: ${[
          ...ALLOWED_GUI_APPS.keys()
        ].join(', ')}`,
        enum: [...ALLOWED_GUI_APPS.keys()],
        nullable: true
      },
      appPath: {
        type: 'string',
        description: 'Absolute path to an executable (.exe, .bat, .cmd, .lnk).',
        nullable: true
      },
      arguments: {
        type: 'array',
        items: { type: 'string' },
        description: 'Optional arguments passed to the application.',
        default: []
      },
      runAsAdmin: {
        type: 'boolean',
        default: false,
        description: 'If true, request elevation via UAC prompt.'
      }
    }
  },
  async ({
    appKey = null,
    appPath = null,
    arguments: args = [],
    runAsAdmin = false
  }) => {
    if (!appKey && !appPath) {
      throw new Error('Provide either appKey or appPath.');
    }

    let exePath;
    if (appKey) {
      exePath = ALLOWED_GUI_APPS.get(appKey);
      if (!exePath) {
        throw new Error(`App key "${appKey}" is not configured.`);
      }
    } else {
      if (!path.isAbsolute(appPath)) {
        throw new Error('appPath must be an absolute path.');
      }
      const allowedExt = ['.exe', '.bat', '.cmd', '.lnk'];
      if (!allowedExt.includes(path.extname(appPath).toLowerCase())) {
        throw new Error(
          `appPath must end with one of: ${allowedExt.join(', ')}`
        );
      }

      try {
        const stats = await fs.stat(appPath);
        if (!stats.isFile()) {
          throw new Error('appPath must point to a file.');
        }
      } catch (error) {
        throw new Error(`Cannot access ${appPath}: ${error.message}`);
      }
      exePath = appPath;
    }

    const escapedArgs = args.map(arg => `'${arg.replace(/'/g, "''")}'`).join(', ');
    const baseCommand = [
      `Start-Process -FilePath '${exePath.replace(/'/g, "''")}'`,
      args.length ? `-ArgumentList ${escapedArgs}` : '',
      '-WindowStyle Normal'
    ]
      .filter(Boolean)
      .join(' ');

    const command = runAsAdmin ? `${baseCommand} -Verb RunAs` : baseCommand;

    const result = await runPowerShell(command, { timeoutMs: 10000 });

    return {
      content: [
        {
          type: 'text',
          text:
            result.stderr?.trim() ||
            `Launch request sent for ${exePath}${appKey ? ` (key: ${appKey})` : ''}.`
        }
      ]
    };
  }
);

server.tool(
  'screen_capture',
  'Capture the primary screen and store PNG inside the workspace.',
  {
    type: 'object',
    properties: {
      includeBase64: {
        type: 'boolean',
        default: false,
        description:
          'If true, return the screenshot as base64 in addition to the saved file path.'
      }
    }
  },
  async ({ includeBase64 = false }) => {
    await ensureDir(SCREENSHOT_DIR);
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, '-')
      .slice(0, 19);
    const filename = `screenshot-${timestamp}.png`;
    const absolutePath = path.join(SCREENSHOT_DIR, filename);
    const relativePath = path.relative(WORKSPACE_ROOT, absolutePath);

    const imageBuffer = await screenshotDesktop({ format: 'png' });
    await fs.writeFile(absolutePath, imageBuffer);

    const response = {
      savedPath: relativePath
    };

    if (includeBase64) {
      response.base64 = imageBuffer.toString('base64');
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(response, null, 2)
        }
      ]
    };
  }
);

await server.connect(new StdioServerTransport());

