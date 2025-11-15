import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { parse } from 'csv-parse';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DATA_DIR =
  process.env.WINERY_DATA_DIR ||
  path.resolve(__dirname, '..', '..', 'WineryOperations');

type CsvRecord = Record<string, string>;

async function readCsv(fileName: string): Promise<CsvRecord[]> {
  const fullPath = path.resolve(DATA_DIR, fileName);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  return new Promise((resolve, reject) => {
    const rows: CsvRecord[] = [];
    const parser = parse({
      columns: true,
      trim: true,
      skip_empty_lines: true
    });

    fs.createReadStream(fullPath, { encoding: 'utf-8' })
      .on('error', reject)
      .pipe(parser)
      .on('data', (record: CsvRecord) => rows.push(record))
      .on('error', reject)
      .on('end', () => resolve(rows));
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', dataDir: DATA_DIR });
});

app.get('/api/tanks', async (_req, res) => {
  try {
    const tanks = await readCsv('tanks.csv');
    res.json(tanks);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/api/batches', async (_req, res) => {
  try {
    const [batches, components] = await Promise.all([
      readCsv('batches.csv'),
      readCsv('batch_components.csv').catch(() => [])
    ]);

    const componentsByBatch = components.reduce<Record<string, CsvRecord[]>>(
      (acc, component) => {
        const batchId =
          component['batch_id'] ??
          component['batchId'] ??
          (component.batch_id as string | undefined) ??
          (component.batchId as string | undefined);

        if (!batchId) {
          return acc;
        }

        const key = batchId.toString();
        acc[key] = acc[key] || [];
        acc[key].push(component);
        return acc;
      },
      {}
    );

    const enriched = batches.map(batch => {
      const key =
        batch['batch_id'] ??
        (batch['batchId'] as string | undefined) ??
        (batch.batch_id as string | undefined) ??
        (batch.batchId as string | undefined);

      return {
        ...batch,
        components: key ? componentsByBatch[key] || [] : []
      };
    });

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/api/inventory', async (_req, res) => {
  try {
    const items = await readCsv('inventory_items.csv');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/api/inventory/movements', async (_req, res) => {
  try {
    const movements = await readCsv('inventory_movements.csv');
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get('/api/packaging', async (_req, res) => {
  try {
    const recipes = await readCsv('packaging_recipes.csv');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

