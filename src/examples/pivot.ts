import { PivotPlugin, type PivotConfig } from '@revolist/rv-enterprise-trial';
import { createGrid, currencyType, percentType } from '../shared/grid';
import { createPanelScaffold, createToggle } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { pivotConfig } from './pivot.config';
import { createPivotRows } from './pivot.data';

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
