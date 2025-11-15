"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const csv_parse_1 = require("csv-parse");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
const DATA_DIR = process.env.WINERY_DATA_DIR ||
    node_path_1.default.resolve(__dirname, '..', '..', 'WineryOperations');
async function readCsv(fileName) {
    const fullPath = node_path_1.default.resolve(DATA_DIR, fileName);
    if (!node_fs_1.default.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath}`);
    }
    return new Promise((resolve, reject) => {
        const rows = [];
        const parser = (0, csv_parse_1.parse)({
            columns: true,
            trim: true,
            skip_empty_lines: true
        });
        node_fs_1.default.createReadStream(fullPath, { encoding: 'utf-8' })
            .on('error', reject)
            .pipe(parser)
            .on('data', (record) => rows.push(record))
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/batches', async (_req, res) => {
    try {
        const [batches, components] = await Promise.all([
            readCsv('batches.csv'),
            readCsv('batch_components.csv').catch(() => [])
        ]);
        const componentsByBatch = components.reduce((acc, component) => {
            const batchId = component['batch_id'] ??
                component['batchId'] ??
                component.batch_id ??
                component.batchId;
            if (!batchId) {
                return acc;
            }
            const key = batchId.toString();
            acc[key] = acc[key] || [];
            acc[key].push(component);
            return acc;
        }, {});
        const enriched = batches.map(batch => {
            const key = batch['batch_id'] ??
                batch['batchId'] ??
                batch.batch_id ??
                batch.batchId;
            return {
                ...batch,
                components: key ? componentsByBatch[key] || [] : []
            };
        });
        res.json(enriched);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/inventory', async (_req, res) => {
    try {
        const items = await readCsv('inventory_items.csv');
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/inventory/movements', async (_req, res) => {
    try {
        const movements = await readCsv('inventory_movements.csv');
        res.json(movements);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/packaging', async (_req, res) => {
    try {
        const recipes = await readCsv('packaging_recipes.csv');
        res.json(recipes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map