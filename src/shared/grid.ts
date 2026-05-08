/**
 * Shared RevoGrid setup helpers.
 *
 * These helpers keep the examples focused on their feature-specific plugins,
 * data, and columns instead of repeating basic grid setup in every file.
 */
import type { ColumnType } from '@revolist/revogrid';

/**
 * Column type that formats numeric values as whole-dollar USD amounts.
 */
export const currencyType: ColumnType = {
  cellTemplate: (_h, { value }) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value ?? 0)),
};

/**
 * Column type that formats numeric values as percentages.
 */
export const percentType: ColumnType = {
  cellTemplate: (_h, { value }) => `${Number(value ?? 0)}%`,
};

/**
 * Create a RevoGrid element with sensible defaults for all trial examples.
 */
export function createGrid() {
  const grid = document.createElement('revo-grid');
  grid.hideAttribution = true;
  grid.range = true;
  grid.resize = true;
  grid.filter = true;
  grid.theme = 'material';
  return grid;
}
