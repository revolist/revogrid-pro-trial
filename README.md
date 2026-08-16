# RevoGrid Pro Trial Examples

A polished Vite + TypeScript starter for exploring the split RevoGrid trial packages in a small, readable codebase.

The app ships with four professional examples behind one top-level switch:

| Example | What it shows | Good first file |
| --- | --- | --- |
| Tree | Hierarchical rows, row selection, row ordering, advanced filters, and Pro dropdown owner/status columns with polished styling | `src/examples/tree.ts` |
| Pivot | Client-side pivot dimensions, rows, columns, values, subtotals, grand totals, and row grouping | `src/examples/pivot.config.ts` |
| Gantt | Task hierarchy, dependencies, progress, timeline toolbar, resizing, and tooltips | `src/examples/gantt.ts` |
| Scheduler | Full-week event scheduling with bookings, working hours, availability, conflict markers, and local callbacks | `src/examples/scheduler.ts` |

## Quick Start

Follow the [RevoGrid Pro trial installation guide](https://pro.rv-grid.com/guides/installation-npm-trial/)
for the current public registry setup, package names, CSS imports, and clean
installation steps.

Prerequisites:

- Node.js 22.12 through 26.x. Node.js 24 LTS is used by release verification.
- pnpm 10.5.2 or newer in the pnpm 10 line.

If pnpm is not installed, enable the version declared by this repository:

```bash
corepack enable
corepack install
```

```bash
pnpm install
pnpm dev
```

Open the Vite URL, usually:

```text
http://127.0.0.1:5173/
```

Use the top switch to move between `Tree`, `Pivot`, `Gantt`, and `Scheduler`.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local Vite dev server |
| `pnpm build` | Type-check and build the production bundle |
| `pnpm test:e2e:install` | Install the Chromium browser used by the smoke tests |
| `pnpm test:e2e` | Run Playwright smoke tests for the trial examples |
| `pnpm preview` | Preview the production build locally |

## Project Layout

```text
src/
  main.ts                     App shell, top switch, URL hash, and cleanup
  styles.css                  Shared professional UI styling
  shared/
    grid.ts                   Reusable RevoGrid defaults and column types
    ui.ts                     Plain DOM helpers for panels, buttons, toggles
    types.ts                  Shared example contracts
  examples/
    index.ts                  Example registry used by the top switch
    tree.ts                   Tree grid setup and Pro owner/status dropdowns
    tree.data.ts              Tree row data
    pivot.ts                  Pivot grid setup and row-grouping toggle
    pivot.config.ts           Pivot dimensions, rows, columns, values, totals
    pivot.data.ts             Pivot row data
    gantt.ts                  Gantt grid, toolbar, plugins, and columns
    gantt.data.ts             Project config, tasks, dependencies, calendar
    scheduler.ts              Event Scheduler grid, plugin, and callbacks
    scheduler.data.ts         Scheduler week config, owners, events, availability
tests/
  e2e/pro-trial.spec.ts       Simple Playwright checks for all examples
docs/
  features/pro-trial-examples.md
```

## Example Highlights

For broader hosted examples and visual references, compare this local starter with:

```text
https://demo.rv-grid.com
```

### Tree

The Tree example is the best starting point for new users. It keeps the data flat with `id` and `parentId`, then lets `TreeDataPlugin` build the hierarchy.

Professional touches included:
- Expand and collapse toolbar actions.
- Row selection and row ordering.
- Advanced selection filters.
- Editable Pro `ColumnDropdown` owner and status fields.
- User chips and status badges rendered consistently in cells and dropdown menus.

### Pivot

The Pivot example separates configuration from runtime mounting:
- `pivot.config.ts` explains the pivot model.
- `pivot.data.ts` keeps the dataset easy to inspect.
- `pivot.ts` shows the minimum plugin setup and row-grouping toggle.

### Gantt

The Gantt example is intentionally simple:
- Tasks and parent-child relationships.
- Finish-to-start dependencies.
- Working calendar.
- Progress percentages.
- Gantt toolbar with search, zoom, tree, and dependency visibility.
- No smart blocking, critical-path warnings, resource planning, or task editor flow.

### Scheduler

The Scheduler example demonstrates local Event Scheduler usage:
- Full-week view starting on Sunday.
- Scheduled events across day columns and hourly slots.
- Working hours, blocked availability, and breaks.
- Overlap conflict marking.
- Local create, move, resize, update, delete, and selection callbacks.
- No remote persistence or optimistic rollback flow.

## E2E Tests

The e2e suite is intentionally simple and beginner-friendly:

```bash
pnpm test:e2e:install # once on a new machine
pnpm test:e2e
```

It starts an isolated Vite server on `127.0.0.1:41738`, opens each example,
checks the top switch, verifies grids render, and confirms the Tree owner/status
dropdowns display styled menu options. The fixed port is strict and Playwright
never reuses an existing server, so an unrelated local app cannot produce a
false-positive result.

## Customization Guide

| Goal | Edit |
| --- | --- |
| Add a new example tab | `src/examples/index.ts` |
| Change base grid defaults | `src/shared/grid.ts` |
| Change the app look and feel | `src/styles.css` |
| Add Tree rows | `src/examples/tree.data.ts` |
| Change Tree columns or dropdown styling | `src/examples/tree.ts` and `src/styles.css` |
| Change Pivot fields or aggregations | `src/examples/pivot.config.ts` |
| Change Gantt project data | `src/examples/gantt.data.ts` |
| Change Scheduler owners or bookings | `src/examples/scheduler.data.ts` |
| Extend smoke coverage | `tests/e2e/pro-trial.spec.ts` |

## Dependencies

- `@revolist/revogrid-pro` → `@revolist/rv-pro-trial@2.6.3`
- `@revolist/pivot` → `@revolist/pivot-trial@2.6.3`
- `@revolist/gantt` → `@revolist/gantt-trial@2.6.3`
- `@revolist/scheduler` → `@revolist/scheduler-trial@2.6.3`
- `@revolist/revogrid@4.25.2`
- `typescript`
- `vite`
- `@playwright/test`

## Trial Notes

This project installs from the public trial registry configured in `.npmrc`. No authentication token, npm login, licence key, form submission, or approval email is required for installation.

The main Pro trial package exposes the same Pro plugin modules as the full Pro
package. Pivot, Gantt, Scheduler, and Kanban use separate trial packages. This
starter demonstrates Tree, Pivot, Gantt, and Scheduler; Kanban is available but
is not mounted in this starter. Collaborative Editing is also distributed as a
separate package, `@revolist/revogrid-collaborative-editing-trial`, and is not
mounted in this starter.

See the [trial package and feature inventory](https://pro.rv-grid.com/legal/trial/)
before assuming that a separately distributed package is part of the public
trial.

## Resources

- Trial installation guide: https://pro.rv-grid.com/guides/installation-npm-trial/
- RevoGrid documentation: https://rv-grid.com
- Hosted demos: https://demo.rv-grid.com
- Pro trial details: https://pro.rv-grid.com
