# DevExtreme Donut Chart Demo

An Angular 19 application featuring a reusable donut chart component built with DevExtreme charts, complete with Storybook documentation.

## Features

- ✅ Angular 19 standalone components
- ✅ Reusable donut chart component using DevExtreme
- ✅ Storybook integration for component documentation
- ✅ Multiple color palettes
- ✅ Configurable chart properties
- ✅ TypeScript support with type definitions

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

### Run the Angular application:
```bash
npm start
```
Navigate to `http://localhost:4200/`

### Run Storybook:
```bash
npm run storybook
```
Navigate to `http://localhost:6006/`

### Build Storybook:
```bash
npm run build-storybook
```

## Component Usage

### Basic Usage

```typescript
import { DonutChartComponent } from './shared/components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DonutChartComponent],
  template: `
    <app-donut-chart
      [data]="chartData"
      [title]="'Sales Distribution'"
      [size]="{ width: 600, height: 400 }"
    ></app-donut-chart>
  `
})
export class ExampleComponent {
  chartData = [
    { category: 'Electronics', value: 35 },
    { category: 'Clothing', value: 25 },
    { category: 'Food', value: 20 }
  ];
}
```

### Component Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `DonutChartData[]` | `[]` | Array of data points |
| `title` | `string` | `''` | Chart title |
| `size` | `DonutChartSize` | `{ width: 500, height: 400 }` | Chart dimensions |
| `palette` | `DonutChartPalette` | `'default'` | Color palette |
| `showLegend` | `boolean` | `true` | Show/hide legend |
| `showLabels` | `boolean` | `true` | Show/hide labels |
| `innerRadius` | `number` | `0.7` | Inner radius (0-1) |
| `startAngle` | `number` | `0` | Start angle in degrees |
| `endAngle` | `number` | `360` | End angle in degrees |
| `animationEnabled` | `boolean` | `true` | Enable animations |
| `exportEnabled` | `boolean` | `false` | Enable export |

### Available Palettes

- `default`
- `fluent-blue-light`
- `fluent-blue-dark`
- `soft`
- `pastel`
- `ocean`
- `violet`
- `carmine`
- `dark-moon`
- `soft-blue`

## Storybook Stories

The component includes multiple Storybook stories demonstrating:
- Default configuration
- Different color palettes
- Various sizes
- With/without legend and labels
- Different inner radius values
- Half-circle variants
- Large datasets

## Project Structure

```
src/
├── app/
│   ├── shared/
│   │   ├── components/
│   │   │   └── donut-chart/
│   │   │       ├── donut-chart.component.ts
│   │   │       ├── donut-chart.component.html
│   │   │       ├── donut-chart.component.css
│   │   │       └── donut-chart.component.stories.ts
│   │   └── models/
│   │       └── chart.models.ts
│   └── app.component.ts
└── main.ts
```

## Technologies

- Angular 19
- DevExtreme Angular
- Storybook 8
- TypeScript 5.5

## License

MIT
