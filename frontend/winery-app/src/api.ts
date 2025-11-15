const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export interface Tank {
  tank_id: string;
  display_name: string;
  capacity_liters: string;
  material: string;
  features: string;
  location: string;
  status: string;
  notes: string;
}

export interface BatchComponent {
  batch_id: string;
  variety_id: string;
  percentage?: string;
  volume_liters?: string;
  notes?: string;
}

export interface Batch {
  batch_id: string;
  name: string;
  vintage: string;
  is_blend: string;
  current_tank_id: string;
  current_volume_liters: string;
  status: string;
  origin: string;
  notes: string;
  components?: BatchComponent[];
}

export interface InventoryItem {
  inventory_id: string;
  item_type: string;
  reference_id: string;
  description: string;
  lot_number: string;
  quantity: string;
  unit: string;
  location: string;
  status: string;
  notes: string;
}

export interface InventoryMovement {
  movement_id: string;
  operation_id: string;
  inventory_id: string;
  direction: 'IN' | 'OUT' | string;
  quantity: string;
  unit: string;
  reason: string;
  timestamp: string;
  notes: string;
}

export interface PackagingRecipe {
  package_id: string;
  product_name: string;
  component_inventory_id: string;
  component_quantity: string;
  component_unit: string;
  notes: string;
}

export const api = {
  getTanks: () => fetchJson<Tank[]>('/api/tanks'),
  getBatches: () => fetchJson<Batch[]>('/api/batches'),
  getInventory: () => fetchJson<InventoryItem[]>('/api/inventory'),
  getInventoryMovements: () =>
    fetchJson<InventoryMovement[]>('/api/inventory/movements'),
  getPackagingRecipes: () =>
    fetchJson<PackagingRecipe[]>('/api/packaging'),
  health: () => fetchJson<{ status: string; dataDir: string }>('/api/health')
};

