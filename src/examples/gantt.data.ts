import type {
  AssignmentEntity,
  CalendarEntity,
  DependencyEntity,
  GanttPluginConfig,
  ISODateTimeString,
  ISODateString,
  ResourceEntity,
  TaskEntity,
} from '@revolist/rv-enterprise-trial';

export type GanttProjectExample = {
  config: GanttPluginConfig;
  tasks: TaskEntity[];
  dependencies: DependencyEntity[];
  calendars: CalendarEntity[];
  resources: ResourceEntity[];
  assignments: AssignmentEntity[];
  baselines: [];
};

export function createGanttProject(): GanttProjectExample {
  const projectId = 'trial-project';
  const calendarId = 'standard';
  const updatedAt: ISODateTimeString = '2026-05-08T09:00:00.000Z';

  return {
    config: createGanttConfig(projectId, calendarId, updatedAt),
    tasks: createTasks(projectId, calendarId),
    dependencies: createDependencies(),
    calendars: createCalendars(calendarId),
    resources: createResources(calendarId),
    assignments: createAssignments(),
    baselines: [],
  };
}

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
    allowTaskCreate: true,
    allowTaskCreateByDrag: true,
    scheduling: {
      projectStartDate: '2026-05-04',
      excludeHolidaysFromDuration: true,
      autoDependencyViolationBehavior: 'warn',
      manualDependencyViolationBehavior: 'warn',
    },
    visuals: {
      showDependencies: true,
      showCriticalPath: true,
      showTaskLabels: true,
      shadeNonWorkingTime: true,
      showTodayLine: true,
      projectLineDate: '2026-05-08',
    },
  };
}

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

function createDependencies(): DependencyEntity[] {
  return [
    { id: 'd-brief-prototype', predecessorTaskId: 'brief', successorTaskId: 'prototype', type: 'finish-to-start', lagDays: 0 },
    { id: 'd-prototype-grid', predecessorTaskId: 'prototype', successorTaskId: 'grid', type: 'finish-to-start', lagDays: 1 },
    { id: 'd-grid-gantt', predecessorTaskId: 'grid', successorTaskId: 'gantt', type: 'finish-to-start', lagDays: 0 },
    { id: 'd-gantt-launch', predecessorTaskId: 'gantt', successorTaskId: 'launch', type: 'finish-to-start', lagDays: 1 },
  ];
}

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

function createResources(calendarId: string): ResourceEntity[] {
  return [
    { id: 'design', name: 'Design Team', role: 'Design', calendarId, allocationCapacity: 100, hourlyCost: 115 },
    { id: 'engineering', name: 'Engineering', role: 'Build', calendarId, allocationCapacity: 100, hourlyCost: 140 },
    { id: 'qa', name: 'QA', role: 'Validation', calendarId, allocationCapacity: 100, hourlyCost: 95 },
  ];
}

function createAssignments(): AssignmentEntity[] {
  return [
    { id: 'a-brief-design', taskId: 'brief', resourceId: 'design', allocationUnits: 80, responsibility: 'Workshop and brief' },
    { id: 'a-prototype-design', taskId: 'prototype', resourceId: 'design', allocationUnits: 100, responsibility: 'Prototype design' },
    { id: 'a-grid-eng', taskId: 'grid', resourceId: 'engineering', allocationUnits: 100, responsibility: 'Grid implementation' },
    { id: 'a-gantt-eng', taskId: 'gantt', resourceId: 'engineering', allocationUnits: 100, responsibility: 'Gantt implementation' },
    { id: 'a-launch-qa', taskId: 'launch', resourceId: 'qa', allocationUnits: 60, responsibility: 'Launch validation' },
  ];
}

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
