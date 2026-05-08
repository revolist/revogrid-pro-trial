import type { ColumnType } from '@revolist/revogrid';

export const currencyType: ColumnType = {
  cellTemplate: (_h, { value }) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value ?? 0)),
};

export const percentType: ColumnType = {
  cellTemplate: (_h, { value }) => `${Number(value ?? 0)}%`,
};

export function createGrid() {
  const grid = document.createElement('revo-grid');
  grid.hideAttribution = true;
  grid.range = true;
  grid.resize = true;
  grid.filter = true;
  grid.theme = 'material';
  return grid;
}
