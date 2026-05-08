import type { ColumnRegular } from '@revolist/revogrid';
import { HistoryPlugin, TooltipPlugin, TreeDataPlugin } from '@revolist/rv-pro-trial';
import {
  GanttPanelResizePlugin,
  GanttPlugin,
  GanttTaskEditorDialogPlugin,
  defineGanttToolbar,
} from '@revolist/rv-enterprise-trial';
import { createGrid, percentType } from '../shared/grid';
import { createPanelScaffold } from '../shared/ui';
import type { MountCleanup } from '../shared/types';
import { createGanttProject } from './gantt.data';

export function mountGanttExample(parent: HTMLElement, title: string, description: string): MountCleanup {
  const { actions, host } = createPanelScaffold(parent, title, description);
  const pill = document.createElement('span');
  const grid = createGrid();
  const project = createGanttProject();

  pill.className = 'status-pill';
  pill.textContent = 'Editable trial project';
  actions.appendChild(pill);

  grid.source = project.tasks;
  grid.columns = createGanttColumns();
  grid.columnTypes = {
    percent: percentType,
  };
  grid.plugins = [
    HistoryPlugin,
    TreeDataPlugin,
    GanttPanelResizePlugin,
    GanttTaskEditorDialogPlugin,
    TooltipPlugin,
    GanttPlugin,
  ] as never;
  Object.assign(grid, {
    gantt: project.config,
    ganttDependencies: project.dependencies,
    ganttCalendars: project.calendars,
    ganttResources: project.resources,
    ganttAssignments: project.assignments,
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
      showCriticalPath: true,
      showBaseline: true,
    },
    controls: {
      export: false,
      baseline: true,
    },
  });

  return () => {
    toolbarHost.replaceChildren();
    grid.remove();
  };
}

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
