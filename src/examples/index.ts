/**
 * Public registry of examples shown by the top switch.
 *
 * Add a new example by importing its mount function and appending one
 * `ExampleDefinition` entry here.
 */
import type { ExampleDefinition } from '../shared/types';
import { mountGanttExample } from './gantt';
import { mountPivotExample } from './pivot';
import { mountSchedulerExample } from './scheduler';
import { mountTreeExample } from './tree';

/**
 * Ordered list of examples rendered in the app header.
 */
export const examples: ExampleDefinition[] = [
  {
    id: 'tree',
    label: 'Tree',
    title: 'Tree view',
    description: 'Start here: parent rows open into child rows, with simple expand and collapse controls.',
    mount: mountTreeExample,
  },
  {
    id: 'pivot',
    label: 'Pivot',
    title: 'Pivot analysis',
    description: 'A compact sales dataset grouped by region, category, quarter, and totals.',
    mount: mountPivotExample,
  },
  {
    id: 'gantt',
    label: 'Gantt',
    title: 'Gantt planner',
    description: 'A simple project plan with task hierarchy, dependencies, progress, and timeline controls.',
    mount: mountGanttExample,
  },
  {
    id: 'scheduler',
    label: 'Scheduler',
    title: 'Event scheduler',
    description: 'A local full-week view with bookings, working hours, availability, and conflict markers.',
    mount: mountSchedulerExample,
  },
];
