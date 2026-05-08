/**
 * Project snapshot data for the Gantt example.
 *
 * The example keeps the model intentionally small: project configuration,
 * task rows, dependencies, a working calendar, and an empty baseline list.
 * Resource planning and smart scheduling policies are omitted on purpose.
 */
import type {
  CalendarEntity,
  DependencyEntity,
  GanttPluginConfig,
  ISODateTimeString,
  ISODateString,
  TaskEntity,
} from '@revolist/rv-enterprise-trial';

/**
 * Complete data bundle consumed by the Gantt example.
 */
export type GanttProjectExample = {
  config: GanttPluginConfig;
  tasks: TaskEntity[];
  dependencies: DependencyEntity[];
  calendars: CalendarEntity[];
  baselines: [];
};

/**
 * Create a small project plan suitable for the trial Gantt example.
 */
export function createGanttProject(): GanttProjectExample {
  const projectId = 'trial-project';
  const calendarId = 'standard';
  const updatedAt: ISODateTimeString = '2026-05-08T09:00:00.000Z';

  return {
    config: createGanttConfig(projectId, calendarId, updatedAt),
    tasks: createTasks(projectId, calendarId),
    dependencies: createDependencies(),
    calendars: createCalendars(calendarId),
    baselines: [],
  };
}

/**
 * Build top-level Gantt plugin configuration.
 */
function createGanttConfig(projectId: string, calendarId: string, updatedAt: ISODateTimeString): GanttPluginConfig {
  return {
    id: projectId,
    name: 'Trial implementation plan',
    version: '1.0.0',
    currency: 'USD',
    timeZone: 'Europe/Lisbon',
    primaryCalendarId: calendarId,
    updatedAt,
    zoomPreset: 'day-week',
    allowTaskCreate: false,
    allowTaskCreateByDrag: false,
    visuals: {
      showDependencies: true,
      showCriticalPath: false,
      showTaskLabels: true,
      shadeNonWorkingTime: true,
      showTodayLine: true,
      projectLineDate: '2026-05-08',
    },
  };
}

/**
 * Create hierarchical task rows for the project.
 */
function createTasks(projectId: string, calendarId: string): TaskEntity[] {
  return [
    task(projectId, calendarId, 'discovery', null, '1', 'Discovery', 'summary', 'in-progress', '2026-05-04', '2026-05-15', 12, 35),
    task(projectId, calendarId, 'brief', 'discovery', '1.1', 'Stakeholder brief', 'task', 'done', '2026-05-04', '2026-05-06', 3, 100),
    task(projectId, calendarId, 'prototype', 'discovery', '1.2', 'Prototype review', 'task', 'in-progress', '2026-05-07', '2026-05-15', 9, 45),
    task(projectId, calendarId, 'delivery', null, '2', 'Delivery', 'summary', 'not-started', '2026-05-18', '2026-06-12', 26, 0),
    task(projectId, calendarId, 'grid', 'delivery', '2.1', 'Grid integration', 'task', 'not-started', '2026-05-18', '2026-05-29', 12, 0),
    task(projectId, calendarId, 'gantt', 'delivery', '2.2', 'Gantt rollout', 'task', 'not-started', '2026-06-01', '2026-06-10', 10, 0),
    task(projectId, calendarId, 'launch', null, '3', 'Launch milestone', 'milestone', 'not-started', '2026-06-12', '2026-06-12', 1, 0),
  ];
}

/**
 * Create finish-to-start dependencies between task rows.
 */
function createDependencies(): DependencyEntity[] {
  return [
    { id: 'd-brief-prototype', predecessorTaskId: 'brief', successorTaskId: 'prototype', type: 'finish-to-start', lagDays: 0 },
    { id: 'd-prototype-grid', predecessorTaskId: 'prototype', successorTaskId: 'grid', type: 'finish-to-start', lagDays: 1 },
    { id: 'd-grid-gantt', predecessorTaskId: 'grid', successorTaskId: 'gantt', type: 'finish-to-start', lagDays: 0 },
    { id: 'd-gantt-launch', predecessorTaskId: 'gantt', successorTaskId: 'launch', type: 'finish-to-start', lagDays: 1 },
  ];
}

/**
 * Create the standard working calendar used by tasks.
 */
function createCalendars(calendarId: string): CalendarEntity[] {
  return [
    {
      id: calendarId,
      name: 'Standard',
      timeZone: 'Europe/Lisbon',
      workingDays: [1, 2, 3, 4, 5],
      holidays: ['2026-05-25'],
      hoursPerDay: 8,
    },
  ];
}

/**
 * Convenience factory for strongly typed Gantt task records.
 */
function task(
  projectId: string,
  calendarId: string,
  id: string,
  parentId: string | null,
  wbsCode: string,
  name: string,
  type: TaskEntity['type'],
  status: TaskEntity['status'],
  startDate: ISODateString,
  endDate: ISODateString,
  durationDays: number,
  progressPercent: number,
): TaskEntity {
  return {
    id,
    projectId,
    parentId,
    wbsCode,
    name,
    type,
    status,
    startDate,
    endDate,
    durationDays,
    progressPercent,
    calendarId,
    isCritical: false,
    tags: [],
  };
}
