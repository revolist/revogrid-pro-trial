import { defineCustomElements } from '@revolist/revogrid/loader';
defineCustomElements();
import '@revolist/rv-pro-trial/dist/revogrid-pro.css';
import {
  PivotPlugin,
  type PivotConfig,
  commonAggregators,
} from '@revolist/rv-pro-trial';

const grid = document.createElement('revo-grid');
grid.hideAttribution = true;
grid.theme = 'compact';
grid.source = [
  { name: 'John Doe', age: 25, dateOfBirth: '1998-01-15' },
  { name: 'Juan Rodriguez', age: 25, dateOfBirth: '1998-01-15' },
  { name: 'Jane Smith', age: 30, dateOfBirth: '1993-03-22' },
];

grid.plugins = [PivotPlugin];

// In Pivot columns are generated from the pivot config
const pivot: PivotConfig = {
  dimensions: [
    {
      prop: 'age',
    },
    {
      name: 'Date of Birth',
      prop: 'dateOfBirth',
      aggregators: {
        count: commonAggregators.count,
      },
    },
  ],
  rows: ['age'],
  values: [
    {
      prop: 'dateOfBirth',
      aggregator: 'count',
    },
  ],
  hasConfigurator: true,
};

grid.additionalData = {
  pivot,
};
document.getElementById('app')?.appendChild(grid);
