/**
 * Local event scheduler data for the Enterprise trial `EventSchedulerPlugin`.
 *
 * The example uses a week view with a small full-week schedule, working hours,
 * blocked availability, and overlap warnings.
 */
import type {
  EventSchedulerAvailabilityEntity,
  EventSchedulerConfig,
  EventSchedulerCreateRangeContext,
  EventSchedulerEventEntity,
  EventSchedulerResourceEntity,
} from '@revolist/rv-enterprise-trial';

const draftEventColors = ['#9333ea', '#dc2626', '#0891b2', '#ca8a04', '#be185d'];

/**
 * Complete data bundle consumed by the Scheduler example.
 */
export type SchedulerExampleData = {
  config: EventSchedulerConfig;
  resources: EventSchedulerResourceEntity[];
  events: EventSchedulerEventEntity[];
  availability: EventSchedulerAvailabilityEntity[];
};

/**
 * Create a compact week schedule suitable for the trial app.
 */
export function createSchedulerData(): SchedulerExampleData {
  return {
    config: createSchedulerConfig(),
    resources: createResources(),
    events: createEvents(),
    availability: createAvailability(),
  };
}

/**
 * Build top-level Event Scheduler configuration.
 */
function createSchedulerConfig(): EventSchedulerConfig {
  return {
    view: 'week',
    weekStartDate: '2026-06-07',
    timeZone: 'Europe/Lisbon',
    locale: 'en-US',
    weekStartsOn: 0,
    visibleDays: [0, 1, 2, 3, 4, 5, 6],
    timeRange: {
      start: '06:00',
      end: '20:00',
    },
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    slotMinutes: 60,
    snapMinutes: 60,
    rowSize: 54,
    timeColumnSize: 88,
    dayColumnSize: 180,
    editable: true,
    allowCreate: true,
    allowMove: true,
    allowResize: true,
    allowDelete: true,
    eventLayout: 'stack',
    conflicts: {
      enabled: true,
      policy: 'mark',
      scope: 'same-resource',
      rules: {
        overlap: 'warning',
        'outside-availability': 'warning',
      },
    },
    selection: {
      mode: 'multiple',
      bulkActions: true,
      clipboard: true,
    },
    eventEditorStatusOptions: ['planned', 'confirmed', 'completed', 'blocked'],
    createEventDraft: createEventDraft,
    statusColorResolver: (event) => event.color,
    eventProperties: ({ event }) => ({
      style: {
        '--event-scheduler-event-color': event.color,
        '--event-scheduler-event-bg': event.color,
        '--event-scheduler-event-border': event.color,
        '--event-scheduler-event-text': '#ffffff',
      },
    }),
    resourceMetaFormatter: (resource) => resource.role,
    tooltipFormatter: ({ event, resource }) => {
      const resourceName = resource?.name ?? 'Unassigned';
      return `${event.title ?? 'Event'} - ${resourceName}`;
    },
    emptyStateText: 'No scheduled events for this week.',
  };
}

/**
 * Build a colored draft for events created from empty week-view slots.
 */
function createEventDraft(context: EventSchedulerCreateRangeContext): EventSchedulerEventEntity {
  return {
    id: `draft-${context.startDateTime}`,
    resourceId: context.resourceId ?? 'maya',
    title: 'New booking',
    startDateTime: context.startDateTime,
    endDateTime: context.endDateTime,
    status: 'planned',
    color: draftEventColors[context.dayIndex % draftEventColors.length],
  };
}

/**
 * Create schedulable owners referenced by week-view events.
 */
function createResources(): EventSchedulerResourceEntity[] {
  return [
    { id: 'maya', name: 'Maya Chen', role: 'Product lead', group: 'People', color: '#7c3aed', capacity: 1 },
    { id: 'noah', name: 'Noah Smith', role: 'API engineer', group: 'People', color: '#ea580c', capacity: 1 },
    { id: 'eva', name: 'Eva Green', role: 'QA lead', group: 'People', color: '#16a34a', capacity: 1 },
  ];
}

/**
 * Create local scheduler events. Two Monday events intentionally overlap
 * so conflict marking is visible without any remote validation.
 */
function createEvents(): EventSchedulerEventEntity[] {
  return [
    event('kickoff', 'maya', 'Customer kickoff', '2026-06-08T09:00:00.000Z', '2026-06-08T10:00:00.000Z', 'confirmed', '#2563eb'),
    event('setup', 'maya', 'Demo setup', '2026-06-08T10:00:00.000Z', '2026-06-08T11:00:00.000Z', 'planned', '#0f766e'),
    event('qa-pass', 'eva', 'QA pass', '2026-06-09T13:00:00.000Z', '2026-06-09T16:00:00.000Z', 'planned', '#16a34a'),
    event('roadmap', 'maya', 'Roadmap review', '2026-06-10T09:30:00.000Z', '2026-06-10T11:00:00.000Z', 'confirmed', '#7c3aed'),
    event('api-sync', 'noah', 'API sync', '2026-06-11T14:00:00.000Z', '2026-06-11T15:30:00.000Z', 'completed', '#ea580c'),
  ];
}

/**
 * Create week-level blocked periods and breaks rendered by the scheduler.
 */
function createAvailability(): EventSchedulerAvailabilityEntity[] {
  return [
    {
      id: 'planning-lock',
      startDateTime: '2026-06-09T12:00:00.000Z',
      endDateTime: '2026-06-09T13:00:00.000Z',
      kind: 'blocked',
      title: 'Planning lock',
      reason: 'No customer bookings',
    },
    {
      id: 'team-break',
      startDateTime: '2026-06-10T12:00:00.000Z',
      endDateTime: '2026-06-10T13:00:00.000Z',
      kind: 'break',
      title: 'Team lunch break',
    },
  ];
}

/**
 * Convenience factory for strongly typed scheduler events.
 */
function event(
  id: string,
  resourceId: string,
  title: string,
  startDateTime: string,
  endDateTime: string,
  status: EventSchedulerEventEntity['status'],
  color: string,
): EventSchedulerEventEntity {
  return {
    id,
    resourceId,
    title,
    startDateTime,
    endDateTime,
    status,
    color,
  };
}
