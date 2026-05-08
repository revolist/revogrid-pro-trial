/**
 * Gantt example using the Enterprise trial `GanttPlugin`.
 *
 * Demonstrates a basic project timeline:
 * task rows, dependencies, tree expansion, timeline resizing, tooltips, and a
 * compact toolbar. Advanced scheduling, blocking, resource planning, and task
 * editor flows are intentionally left out.
 */
import type { ColumnRegular } from '@revolist/revogrid';
import { TooltipPlugin, TreeDataPlugin } from '@revolist/rv-pro-trial';
import { GanttPanelResizePlugin, GanttPlugin, defineGanttToolbar } from '@revolist/rv-enterprise-trial';
import { createGrid, percentType } from '../shared/grid';
import { createPanelScaffold } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { createGanttProject } from './gantt.data';

/**
 * Mount the Gantt example into a host element.
 *
 * @param parent - Example panel container supplied by the app shell.
 * @param title - Heading rendered above the grid.
 * @param description - Short explanatory copy rendered above the grid.
 * @returns Cleanup function that removes the toolbar and grid.
 */
export function mountGanttExample(parent: HTMLElement, title: string, description: string): MountCleanup {
  const { actions, host } = createPanelScaffold(parent, title, description);
  const pill = document.createElement('span');
  const grid = createGrid();
  const project = createGanttProject();

  pill.className = 'status-pill';
  pill.textContent = 'Basic timeline';
  actions.appendChild(pill);

  grid.source = project.tasks;
  grid.columns = createGanttColumns();
  grid.columnTypes = {
    percent: percentType,
  };
  grid.plugins = [TreeDataPlugin, GanttPanelResizePlugin, TooltipPlugin, GanttPlugin] as never;
  Object.assign(grid, {
    gantt: project.config,
    ganttDependencies: project.dependencies,
    ganttCalendars: project.calendars,
    ganttBaselines: project.baselines,
    tree: {
      expandedRowIds: new Set(['discovery', 'delivery']),
    },
  });

  const layout = document.createElement('div');
  layout.className = 'gantt-layout';

  const toolbarHost = document.createElement('div');
  toolbarHost.className = 'gantt-toolbar-host';

  const gridHost = document.createElement('div');
  gridHost.className = 'grid-host';
  gridHost.appendChild(grid);

  layout.append(toolbarHost, gridHost);
  host.replaceChildren(layout);

  defineGanttToolbar(toolbarHost, {
    grid,
    columns: [
      { prop: 'wbs', label: 'WBS' },
      { prop: 'status', label: 'Status' },
      { prop: 'startDate', label: 'Start' },
      { prop: 'endDate', label: 'Finish' },
      { prop: 'percentDone', label: 'Done' },
    ],
    visuals: {
      showDependencies: true,
      showCriticalPath: false,
      showBaseline: false,
    },
    controls: {
      addTask: false,
      indent: false,
      outdent: false,
      export: false,
      baseline: false,
      criticalPath: false,
    },
  });

  return () => {
    toolbarHost.replaceChildren();
    grid.remove();
  };
}

/**
 * Build task-table columns shown to the left of the timeline.
 */
function createGanttColumns(): ColumnRegular[] {
  return [
    { prop: 'wbs', name: 'WBS', size: 90 },
    { prop: 'name', name: 'Task', size: 220, tree: true },
    { prop: 'status', name: 'Status', size: 130 },
    { prop: 'startDate', name: 'Start', size: 130 },
    { prop: 'endDate', name: 'Finish', size: 130 },
    { prop: 'percentDone', name: 'Done', size: 110, columnType: 'percent' },
  ];
}
