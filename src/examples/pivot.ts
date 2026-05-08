/**
 * Pivot example using the Enterprise trial `PivotPlugin`.
 *
 * Shows a compact analytics workflow with dimensions, rows, columns, values,
 * totals, and an optional row-grouping toggle.
 */
import { PivotPlugin, type PivotConfig } from '@revolist/rv-enterprise-trial';
import { createGrid, currencyType, percentType } from '../shared/grid';
import { createPanelScaffold, createToggle } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { pivotConfig } from './pivot.config';
import { createPivotRows } from './pivot.data';

/**
 * Mount the Pivot example into a host element.
 *
 * @param parent - Example panel container supplied by the app shell.
 * @param title - Heading rendered above the grid.
 * @param description - Short explanatory copy rendered above the grid.
 * @returns Cleanup function that removes listeners and the grid.
 */
export function mountPivotExample(parent: HTMLElement, title: string, description: string): MountCleanup {
  const { actions, host } = createPanelScaffold(parent, title, description);
  const { label, input } = createToggle('Row grouping');
  const grid = createGrid();

  actions.appendChild(label);

  grid.source = createPivotRows();
  grid.readonly = true;
  grid.colSize = 170;
  grid.columnTypes = {
    currency: currencyType,
    percent: percentType,
  };
  grid.plugins = [PivotPlugin] as never;
  Object.assign(grid, { pivot: pivotConfig });

  const updatePivot = () => {
    Object.assign(grid, { pivot: createPivotConfig(input.checked) });
  };

  input.addEventListener('change', updatePivot);
  host.appendChild(grid);

  return () => {
    input.removeEventListener('change', updatePivot);
    grid.remove();
  };
}

/**
 * Derive the active pivot config from the row-grouping toggle.
 */
function createPivotConfig(rowGrouping: boolean): PivotConfig {
  return {
    ...pivotConfig,
    collapsed: rowGrouping,
    expanded: rowGrouping
      ? {
          North: true,
          South: true,
          West: true,
        }
      : undefined,
  };
}
