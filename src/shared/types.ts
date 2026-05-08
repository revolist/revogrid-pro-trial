export type ExampleId = 'tree' | 'pivot' | 'gantt';

export type MountCleanup = () => void;

export type ExampleDefinition = {
  id: ExampleId;
  label: string;
  title: string;
  description: string;
  mount: (parent: HTMLElement, title: string, description: string) => MountCleanup;
};
