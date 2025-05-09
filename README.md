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

1. Import the required dependencies in your main.ts:
```typescript
import '@revolist/rv-pro-trial/dist/revogrid-pro.css';
import { PivotPlugin, type PivotConfig, commonAggregators } from '@revolist/rv-pro-trial';
```

2. Initialize the grid component (based on your framework or VanillaJS)

3. Configure the grid with your data and settings:
```typescript
grid.theme = 'compact';
grid.source = [
  { name: 'John Doe', age: 25, dateOfBirth: '1998-01-15' },
  // Add your data here
];
```

4. Add plugins and additional features:
```typescript
grid.plugins = [PivotPlugin];
// Configure pivot if needed
const pivot: PivotConfig = {
  dimensions: [
    { prop: 'age' },
    { name: 'Date of Birth', prop: 'dateOfBirth' }
  ],
  rows: ['age'],
  values: [
    { prop: 'dateOfBirth', aggregator: 'count' }
  ],
  hasConfigurator: true
};
grid.additionalData = { pivot };
```

5. Mount the grid to your application:
```typescript
document.getElementById('app')?.appendChild(grid);
```

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