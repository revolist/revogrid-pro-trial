import type { ExampleDefinition } from '../shared/types';
import { mountGanttExample } from './gantt';
import { mountPivotExample } from './pivot';
import { mountTreeExample } from './tree';

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
    description: 'A small project plan with tasks, dependencies, resources, and timeline controls.',
    mount: mountGanttExample,
  },
];
