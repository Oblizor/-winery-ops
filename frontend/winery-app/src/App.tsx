import { useEffect, useState } from 'react';
import './App.css';
import { api } from './api';
import type { Batch, InventoryItem, Tank } from './api';

type View = 'dashboard' | 'tanks' | 'batches' | 'inventory';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const [tanks, setTanks] = useState<Tank[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    async function loadAll() {
      try {
        const [health, tanksData, batchesData, inventoryData] =
          await Promise.all([
            api.health(),
            api.getTanks(),
            api.getBatches(),
            api.getInventory()
          ]);
        setStatusMessage(`Connected to data directory: ${health.dataDir}`);
        setTanks(tanksData);
        setBatches(batchesData);
        setInventory(inventoryData);
      } catch (error) {
        setStatusMessage(
          `Unable to reach backend: ${(error as Error).message}`
        );
      }
    }
    loadAll();
  }, []);

  return (
    <div className="app-shell">
      <header>
        <h1>Crama Darie · Winery Operations</h1>
        <p className="status">{statusMessage}</p>
        <nav>
          <button
            className={view === 'dashboard' ? 'active' : ''}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={view === 'tanks' ? 'active' : ''}
            onClick={() => setView('tanks')}
          >
            Tanks
          </button>
          <button
            className={view === 'batches' ? 'active' : ''}
            onClick={() => setView('batches')}
          >
            Batches
          </button>
          <button
            className={view === 'inventory' ? 'active' : ''}
            onClick={() => setView('inventory')}
          >
            Inventory
          </button>
        </nav>
      </header>

      <main>
        {view === 'dashboard' && (
          <section className="grid">
            <article className="card">
              <h3>Total Tanks</h3>
              <p className="value">{tanks.length}</p>
            </article>
            <article className="card">
              <h3>Active Batches</h3>
              <p className="value">
                {batches.filter(batch => batch.status !== 'archived').length}
              </p>
            </article>
            <article className="card">
              <h3>Inventory Items</h3>
              <p className="value">{inventory.length}</p>
            </article>
          </section>
        )}

        {view === 'tanks' && (
          <section>
            <h2>Tanks</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Capacity (L)</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Features</th>
                </tr>
              </thead>
              <tbody>
                {tanks.map(tank => (
                  <tr key={tank.tank_id}>
                    <td>{tank.display_name}</td>
                    <td>{tank.capacity_liters}</td>
                    <td>{tank.location}</td>
                    <td>{tank.status}</td>
                    <td>{tank.features || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === 'batches' && (
          <section>
            <h2>Batches &amp; Blends</h2>
            {batches.map(batch => (
              <article className="card" key={batch.batch_id}>
                <h3>
                  {batch.name} ({batch.vintage})
                </h3>
                <p>
                  Tank: <strong>{batch.current_tank_id}</strong> · Volume:{' '}
                  {batch.current_volume_liters} L · Status: {batch.status}
                </p>
                {batch.components && batch.components.length > 0 && (
                  <ul>
                    {batch.components.map(component => (
                      <li key={`${batch.batch_id}-${component.variety_id}`}>
                        Variety {component.variety_id} —{' '}
                        {component.percentage
                          ? `${component.percentage}%`
                          : `${component.volume_liters} L`}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        )}

        {view === 'inventory' && (
          <section>
            <h2>Inventory</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Lot</th>
                  <th>Qty</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.inventory_id}>
                    <td>{item.description}</td>
                    <td>{item.lot_number}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
