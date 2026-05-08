# RevoGrid Trial Project

A TypeScript project built with Vite, showcasing the capabilities of RevoGrid Pro trial version.

## About RevoGrid Pro

This project demonstrates the features and functionality of RevoGrid Pro, a high-performance data grid component. The trial version includes:
- Advanced data grid capabilities
- High-performance rendering
- Rich set of features for data manipulation
- Professional-grade components

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the examples:
```bash
npm run dev
```

3. Open the local Vite URL and use the top switch:
- `Tree` starts with the simplest hierarchy example.
- `Pivot` shows grouped analytical totals.
- `Gantt` shows the full project timeline example.

## Example Map

- `src/main.ts` - App shell, top switch, URL hash, and cleanup.
- `src/shared/grid.ts` - Reusable grid defaults and column types.
- `src/shared/ui.ts` - Small DOM helpers for panels, buttons, and toggles.
- `src/examples/tree.ts` - Tree grid setup.
- `src/examples/tree.data.ts` - Tree rows.
- `src/examples/pivot.ts` - Pivot grid setup.
- `src/examples/pivot.config.ts` - Pivot dimensions, rows, columns, values, and totals.
- `src/examples/pivot.data.ts` - Pivot rows.
- `src/examples/gantt.ts` - Gantt grid and toolbar setup.
- `src/examples/gantt.data.ts` - Gantt project, tasks, dependencies, calendars, resources, and assignments.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

- `src/` - Source files
- `public/` - Static assets
- `dist/` - Production build output
- `index.html` - Entry HTML file

## Technologies Used

- TypeScript
- Vite
- @revolist/rv-pro-trial - RevoGrid Pro trial version for advanced data grid functionality

## Trial Version Limitations

Please note that this project uses the trial version of RevoGrid Pro, which may have certain limitations compared to the full commercial version. For production use, please consider purchasing a commercial license.

## License

ISC 

## Additional Resources

- [RevoGrid Pro Documentation](https://rv-grid.com)
- [Trial Version Details](https://pro.rv-grid.com)
