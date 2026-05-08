/**
 * Tree example using RevoGrid Pro tree, ordering, filtering, row selection, and
 * dropdown column features.
 *
 * First-time users should start here: the setup shows one grid, one dataset,
 * one set of columns, and a small toolbar.
 */
import type { ColumnRegular } from '@revolist/revogrid';
import {
  AdvanceFilterPlugin,
  ColumnDropdown,
  type DropdownOption,
  RowOddPlugin,
  RowOrderPlugin,
  RowSelectPlugin,
  TreeDataPlugin,
  TREE_COLLAPSE_ALL_EVENT,
  TREE_EXPAND_ALL_EVENT,
} from '@revolist/rv-pro-trial';
import { createGrid, currencyType } from '../shared/grid';
import { createActionButton, createPanelScaffold } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { createTreeRows } from './tree.data';

type TreeStatus = 'Planned' | 'Active' | 'Review' | 'Blocked';
type TreeOwner =
  | 'Maya Chen'
  | 'Noah Smith'
  | 'Eva Green'
  | 'Liam Brown'
  | 'Olivia Lee'
  | 'Mia Wilson'
  | 'Ethan Davis'
  | 'Ava Martin'
  | 'James Clark'
  | 'Sofia Hall';

type OwnerOption = DropdownOption<TreeOwner> & {
  initials: string;
  role: string;
  tone: string;
};

/**
 * Dropdown choices for the editable Owner column.
 *
 * The extra display metadata is optional, but it makes the example useful for
 * product screens where users need to recognize a person quickly.
 */
const ownerOptions: OwnerOption[] = [
  { value: 'Maya Chen', label: 'Maya Chen', initials: 'MC', role: 'Product Lead', tone: 'blue' },
  { value: 'Noah Smith', label: 'Noah Smith', initials: 'NS', role: 'API Engineer', tone: 'green' },
  { value: 'Eva Green', label: 'Eva Green', initials: 'EG', role: 'Grid Engineer', tone: 'violet' },
  { value: 'Liam Brown', label: 'Liam Brown', initials: 'LB', role: 'QA Lead', tone: 'amber' },
  { value: 'Olivia Lee', label: 'Olivia Lee', initials: 'OL', role: 'Analytics Lead', tone: 'rose' },
  { value: 'Mia Wilson', label: 'Mia Wilson', initials: 'MW', role: 'Data Analyst', tone: 'blue' },
  { value: 'Ethan Davis', label: 'Ethan Davis', initials: 'ED', role: 'Export Owner', tone: 'green' },
  { value: 'Ava Martin', label: 'Ava Martin', initials: 'AM', role: 'Operations', tone: 'violet' },
  { value: 'James Clark', label: 'James Clark', initials: 'JC', role: 'Enablement', tone: 'amber' },
  { value: 'Sofia Hall', label: 'Sofia Hall', initials: 'SH', role: 'Runbook Owner', tone: 'rose' },
];

/**
 * Dropdown choices for the editable Status column.
 *
 * The `tone` value maps directly to CSS classes in `src/styles.css`.
 */
const statusOptions: Array<DropdownOption<TreeStatus> & { tone: string }> = [
  { value: 'Planned', label: 'Planned', tone: 'planned' },
  { value: 'Active', label: 'Active', tone: 'active' },
  { value: 'Review', label: 'Review', tone: 'review' },
  { value: 'Blocked', label: 'Blocked', tone: 'blocked' },
];

/**
 * Mount the Tree example into a host element.
 *
 * @param parent - Example panel container supplied by the app shell.
 * @param title - Heading rendered above the grid.
 * @param description - Short explanatory copy rendered above the grid.
 * @returns Cleanup function that removes listeners and the grid.
 */
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
    dropdown: ColumnDropdown,
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

/**
 * Build the Tree grid columns.
 *
 * Owner and Status use the Pro `ColumnDropdown` type with custom renderers so
 * selected cells and dropdown options share the same production styling.
 */
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
      size: 210,
      columnType: 'dropdown',
      dropdown: {
        source: ownerOptions,
        placeholder: 'Select owner',
        config: {
          ariaLabel: 'Owner',
          popupClassName: 'owner-dropdown-menu',
        },
        renderSelectedValue: (h, selectedOptions, children) => {
          const selected = selectedOptions[0] as OwnerOption | undefined;
          return h('div', { class: 'owner-dropdown-value' }, [
            selected ? renderOwnerChip(h, selected, 'compact') : h('span', { class: 'owner-placeholder' }, 'Select owner'),
            children,
          ]);
        },
        renderOption: (h, option) => {
          return h('div', { class: 'owner-dropdown-option' }, renderOwnerChip(h, option as OwnerOption, 'menu'));
        },
      },
      sortable: true,
      filter: ['selection'],
    },
    {
      name: 'Status',
      prop: 'status',
      size: 150,
      columnType: 'dropdown',
      dropdown: {
        source: statusOptions,
        placeholder: 'Select status',
        config: {
          ariaLabel: 'Status',
          popupClassName: 'status-dropdown-menu',
        },
        renderSelectedValue: (h, selectedOptions, children) => {
          const selected = selectedOptions[0] as (typeof statusOptions)[number] | undefined;
          return h('div', { class: 'status-dropdown-value' }, [
            selected ? renderStatusBadge(h, selected) : h('span', { class: 'status-placeholder' }, 'Select status'),
            children,
          ]);
        },
        renderOption: (h, option) => {
          return h('div', { class: 'status-dropdown-option' }, renderStatusBadge(h, option as (typeof statusOptions)[number]));
        },
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

type CellRenderFunction = (tag: string, props: Record<string, unknown>, children?: unknown) => unknown;

/**
 * Render a user chip for the Owner cell or dropdown option.
 *
 * @param h - RevoGrid render helper passed by the dropdown column type.
 * @param option - Selected or candidate owner option.
 * @param mode - Compact cells hide the role; menu options include it.
 */
function renderOwnerChip(h: CellRenderFunction, option: OwnerOption, mode: 'compact' | 'menu') {
  return h('span', { class: `owner-chip owner-chip--${option.tone}` }, [
    h('span', { class: 'owner-avatar' }, option.initials),
    h('span', { class: 'owner-copy' }, [
      h('span', { class: 'owner-name' }, option.label),
      mode === 'menu' ? h('span', { class: 'owner-role' }, option.role) : null,
    ]),
  ]);
}

/**
 * Render a status badge for a cell or dropdown option.
 *
 * @param h - RevoGrid render helper passed by the dropdown column type.
 * @param option - Selected or candidate status option.
 */
function renderStatusBadge(h: CellRenderFunction, option: (typeof statusOptions)[number]) {
  return h('span', { class: `status-badge status-badge--${option.tone}` }, option.label);
}
