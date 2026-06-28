/**
 * Shared public types used by the example shell and each example module.
 */

/**
 * Stable id for every top-level trial example.
 */
export type ExampleId = 'tree' | 'pivot' | 'gantt' | 'scheduler';

/**
 * Cleanup callback returned by every example after it mounts.
 */
export type MountCleanup = () => void;

/**
 * Metadata and mount contract for a single example tab.
 */
export type ExampleDefinition = {
  /** URL hash and internal identifier. */
  id: ExampleId;
  /** Short label shown in the top switch. */
  label: string;
  /** Heading rendered above the grid. */
  title: string;
  /** One-sentence beginner description shown under the heading. */
  description: string;
  /**
   * Mount the example into the provided host.
   *
   * @returns Cleanup function that removes listeners and mounted elements.
   */
  mount: (parent: HTMLElement, title: string, description: string) => MountCleanup;
};
