# WineryOperations Data Directory

This directory contains CSV files with winery operations data.

## Required Files

Place the following CSV files in this directory:

1. **tanks.csv** - Tank information
   - Columns: `tank_id`, `display_name`, `capacity_liters`, `material`, `features`, `location`, `status`, `notes`

2. **batches.csv** - Batch information
   - Columns: `batch_id`, `name`, `vintage`, `is_blend`, `current_tank_id`, `current_volume_liters`, `status`, `origin`, `notes`

3. **batch_components.csv** - Batch component relationships
   - Columns: `batch_id`, `variety_id`, `percentage`, `volume_liters`, `notes`

4. **inventory_items.csv** - Inventory items
   - Columns: `inventory_id`, `item_type`, `reference_id`, `description`, `lot_number`, `quantity`, `unit`, `location`, `status`, `notes`

5. **inventory_movements.csv** - Inventory movements
   - Columns: `movement_id`, `operation_id`, `inventory_id`, `direction`, `quantity`, `unit`, `reason`, `timestamp`, `notes`

6. **packaging_recipes.csv** - Packaging recipes
   - Columns: `package_id`, `product_name`, `component_inventory_id`, `component_quantity`, `component_unit`, `notes`

## CSV Format

- First row should contain column headers
- Use UTF-8 encoding
- Commas as delimiters
- Empty lines are skipped

## Example Structure

```
backend/
  WineryOperations/
    tanks.csv
    batches.csv
    batch_components.csv
    inventory_items.csv
    inventory_movements.csv
    packaging_recipes.csv
```

## Notes

- Files are read at runtime
- Changes to CSV files require server restart (in development)
- For production, ensure files are included in deployment or use external storage

