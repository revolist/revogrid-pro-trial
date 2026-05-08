import type { PivotConfig } from '@revolist/rv-enterprise-trial';

export const pivotConfig: PivotConfig = {
  dimensions: [
    { prop: 'region', name: 'Region', order: 'asc' },
    { prop: 'category', name: 'Category', order: 'asc' },
    { prop: 'quarter', name: 'Quarter', order: 'asc' },
    { prop: 'revenue', name: 'Revenue' },
    { prop: 'orders', name: 'Orders' },
    { prop: 'margin', name: 'Margin' },
  ],
  rows: ['region', 'category'],
  columns: ['quarter'],
  values: [
    { prop: 'revenue', aggregator: 'sum', name: 'Revenue' },
    { prop: 'orders', aggregator: 'sum', name: 'Orders' },
    { prop: 'margin', aggregator: 'avg', name: 'Avg margin' },
  ],
  totals: {
    grandTotal: true,
    subtotals: true,
  },
  hasConfigurator: true,
};
