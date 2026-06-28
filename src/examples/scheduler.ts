/**
 * Event Scheduler example using the Enterprise trial `EventSchedulerPlugin`.
 *
 * Demonstrates a local week scheduler:
 * scheduled events, availability blocks, conflict marking, and callback-driven
 * state updates without remote persistence.
 */
import {
  EventSchedulerPlugin,
  type EventSchedulerEventChangedDetail,
  type EventSchedulerEventDeletedDetail,
} from '@revolist/rv-enterprise-trial';
import { createGrid } from '../shared/grid';
import type { MountCleanup } from '../shared/types';
import { createSchedulerData } from './scheduler.data';

/**
 * Mount the Scheduler example into a host element.
 *
 * @param parent - Example panel container supplied by the app shell.
 * @param title - Heading rendered above the grid.
 * @param description - Short explanatory copy rendered above the grid.
 * @returns Cleanup function that removes the grid.
 */
export function mountSchedulerExample(parent: HTMLElement, _title: string, _description: string): MountCleanup {
  const host = document.createElement('div');
  const grid = createGrid();
  const scheduler = createSchedulerData();
  let events = scheduler.events;

  host.className = 'grid-host';

  const setEvents = (nextEvents: readonly typeof scheduler.events[number][]) => {
    events = [...nextEvents];
    Object.assign(grid, { eventSchedulerEvents: events });
  };

  const syncEvents = (detail: EventSchedulerEventChangedDetail) => {
    setEvents(detail.events);
  };

  grid.readonly = false;
  grid.plugins = [EventSchedulerPlugin] as never;
  Object.assign(grid, {
    eventScheduler: {
      ...scheduler.config,
      onEventCreate: syncEvents,
      onEventMove: syncEvents,
      onEventResize: syncEvents,
      onEventUpdate: syncEvents,
      onEventDelete: (detail: EventSchedulerEventDeletedDetail) => {
        setEvents(detail.events);
      },
    },
    eventSchedulerEvents: events,
    eventSchedulerResources: scheduler.resources,
    eventSchedulerAvailability: scheduler.availability,
  });

  host.appendChild(grid);
  parent.appendChild(host);

  return () => {
    grid.remove();
    host.remove();
  };
}
