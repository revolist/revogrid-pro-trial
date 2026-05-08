import type { ColumnRegular } from '@revolist/revogrid';
import {
  AdvanceFilterPlugin,
  RowOddPlugin,
  RowOrderPlugin,
  RowSelectPlugin,
  TreeDataPlugin,
  TREE_COLLAPSE_ALL_EVENT,
  TREE_EXPAND_ALL_EVENT,
  badgeRenderer,
} from '@revolist/rv-pro-trial';
import { createGrid, currencyType } from '../shared/grid';
import { createActionButton, createPanelScaffold } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { createTreeRows } from './tree.data';

export function mountTreeExample(parent: HTMLElement, title: string, description: string): MountCleanup {
  const { actions, host } = createPanelScaffold(parent, title, description);
  const expandButton = createActionButton('Expand all');
  const collapseButton = createActionButton('Collapse all');
  const grid = createGrid();
  const rows = createTreeRows();

  actions.append(expandButton, collapseButton);

  grid.source = rows;
  grid.columns = createTreeColumns();
  grid.columnTypes = {
    currency: currencyType,
  };
  grid.plugins = [TreeDataPlugin, RowOrderPlugin, AdvanceFilterPlugin, RowSelectPlugin, RowOddPlugin];
  Object.assign(grid, {
    tree: {
      expandedRowIds: new Set(['platform', 'analytics']),
    },
  });

  const expandAll = () => grid.dispatchEvent(new CustomEvent(TREE_EXPAND_ALL_EVENT));
  const collapseAll = () => grid.dispatchEvent(new CustomEvent(TREE_COLLAPSE_ALL_EVENT));

  expandButton.addEventListener('click', expandAll);
  collapseButton.addEventListener('click', collapseAll);
  host.appendChild(grid);

  return () => {
    expandButton.removeEventListener('click', expandAll);
    collapseButton.removeEventListener('click', collapseAll);
    grid.remove();
  };
}

function createTreeColumns(): ColumnRegular[] {
  return [
    {
      name: 'Workstream',
      prop: 'name',
      size: 300,
      tree: true,
      rowSelect: true,
      rowDrag: true,
      sortable: true,
      filter: ['selection'],
      cellProperties: ({ model }) => ({
        class: {
          'tree-child-row': Boolean(model.parentId),
        },
      }),
    },
    {
      name: 'Owner',
      prop: 'owner',
      size: 160,
      sortable: true,
      filter: ['selection'],
    },
    {
      name: 'Status',
      prop: 'status',
      size: 150,
      cellTemplate: badgeRenderer,
      rectangular: true,
      badgeStyles: {
        Planned: { backgroundColor: '#e0f2fe', color: '#075985' },
        Active: { backgroundColor: '#dcfce7', color: '#166534' },
        Review: { backgroundColor: '#fef3c7', color: '#92400e' },
        Blocked: { backgroundColor: '#fee2e2', color: '#991b1b' },
      },
      filter: ['selection'],
    },
    {
      name: 'Budget',
      prop: 'budget',
      size: 130,
      columnType: 'currency',
      sortable: true,
    },
  ];
}
