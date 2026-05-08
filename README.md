# RevoGrid Pro Trial Examples

A polished Vite + TypeScript starter for exploring RevoGrid Pro and Enterprise trial features in a small, readable codebase.

The app ships with three professional examples behind one top-level switch:

| Example | What it shows | Good first file |
| --- | --- | --- |
| Tree | Hierarchical rows, row selection, row ordering, advanced filters, and a Pro dropdown status column with badge styling | `src/examples/tree.ts` |
| Pivot | Client-side pivot dimensions, rows, columns, values, subtotals, grand totals, and row grouping | `src/examples/pivot.config.ts` |
| Gantt | Task hierarchy, dependencies, progress, timeline toolbar, resizing, and tooltips | `src/examples/gantt.ts` |

## Quick Start

```bash
npm install
npm run dev
```

Open the Vite URL, usually:

```text
http://127.0.0.1:5173/
```

Use the top switch to move between `Tree`, `Pivot`, and `Gantt`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite dev server |
| `npm run build` | Type-check and build the production bundle |
| `npm run test:e2e` | Run Playwright smoke tests for the trial examples |
| `npm run preview` | Preview the production build locally |

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
    tree.ts                   Tree grid setup and Pro status dropdown
    tree.data.ts              Tree row data
    pivot.ts                  Pivot grid setup and row-grouping toggle
    pivot.config.ts           Pivot dimensions, rows, columns, values, totals
    pivot.data.ts             Pivot row data
    gantt.ts                  Gantt grid, toolbar, plugins, and columns
    gantt.data.ts             Project config, tasks, dependencies, calendar
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
- Editable Pro `ColumnDropdown` status field.
- Status badges rendered consistently in the cell and dropdown menu.

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
- Enterprise Gantt toolbar with search, zoom, tree, and dependency visibility.
- No smart blocking, critical-path warnings, resource planning, or task editor flow.

## E2E Tests

The e2e suite is intentionally simple and beginner-friendly:

```bash
npm run test:e2e
```

It starts the Vite app, opens each example, checks the top switch, verifies grids render, and confirms the Tree status dropdown displays badge-styled options.

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
| Extend smoke coverage | `tests/e2e/pro-trial.spec.ts` |

## Dependencies

- `@revolist/rv-pro-trial`
- `@revolist/rv-enterprise-trial`
- `typescript`
- `vite`
- `@playwright/test`

## Trial Notes

This project uses RevoGrid trial packages. Trial behavior and licensing can differ from the commercial packages, so validate production requirements against your commercial license and package versions before shipping.

## Resources

- RevoGrid documentation: https://rv-grid.com
- Hosted demos: https://demo.rv-grid.com
- Pro trial details: https://pro.rv-grid.com
