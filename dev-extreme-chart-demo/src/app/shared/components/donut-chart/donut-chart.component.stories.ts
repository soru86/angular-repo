import type { Meta, StoryObj } from '@storybook/angular';
import { DonutChartComponent } from './donut-chart.component';
import { DonutChartData, DonutChartPalette } from '../../models/chart.models';

const meta: Meta<DonutChartComponent> = {
  title: 'Shared/DonutChart',
  component: DonutChartComponent,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of data points for the chart',
    },
    title: {
      control: 'text',
      description: 'Title displayed above the chart',
    },
    size: {
      control: 'object',
      description: 'Width and height of the chart',
    },
    palette: {
      control: 'select',
      options: [
        'default',
        'fluent-blue-light',
        'fluent-blue-dark',
        'soft',
        'pastel',
        'ocean',
        'violet',
        'carmine',
        'dark-moon',
        'soft-blue',
      ],
      description: 'Color palette for the chart',
    },
    showLegend: {
      control: 'boolean',
      description: 'Show or hide the legend',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show or hide labels on chart segments',
    },
    innerRadius: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Inner radius of the donut (0-1)',
    },
    startAngle: {
      control: { type: 'number', min: 0, max: 360 },
      description: 'Starting angle in degrees',
    },
    endAngle: {
      control: { type: 'number', min: 0, max: 360 },
      description: 'Ending angle in degrees',
    },
    animationEnabled: {
      control: 'boolean',
      description: 'Enable or disable animations',
    },
    exportEnabled: {
      control: 'boolean',
      description: 'Enable or disable export functionality',
    },
  },
};

export default meta;
type Story = StoryObj<DonutChartComponent>;

const defaultData: DonutChartData[] = [
  { category: 'Electronics', value: 35 },
  { category: 'Clothing', value: 25 },
  { category: 'Food', value: 20 },
  { category: 'Books', value: 15 },
  { category: 'Other', value: 5 },
];

export const Default: Story = {
  args: {
    data: defaultData,
    title: 'Sales Distribution',
    size: { width: 600, height: 400 },
    palette: 'default',
    showLegend: true,
    showLabels: true,
    innerRadius: 0.7,
    startAngle: 0,
    endAngle: 360,
    animationEnabled: true,
    exportEnabled: false,
  },
};

export const FluentBlueLight: Story = {
  args: {
    ...Default.args,
    palette: 'fluent-blue-light',
    title: 'Fluent Blue Light Theme',
  },
};

export const WithoutLegend: Story = {
  args: {
    ...Default.args,
    showLegend: false,
    title: 'Chart Without Legend',
  },
};

export const WithoutLabels: Story = {
  args: {
    ...Default.args,
    showLabels: false,
    title: 'Chart Without Labels',
  },
};

export const ThinDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 0.9,
    title: 'Thin Donut Chart',
  },
};

export const ThickDonut: Story = {
  args: {
    ...Default.args,
    innerRadius: 0.3,
    title: 'Thick Donut Chart',
  },
};

export const HalfCircle: Story = {
  args: {
    ...Default.args,
    startAngle: 0,
    endAngle: 180,
    title: 'Half Circle Donut',
  },
};

export const CustomPalette: Story = {
  args: {
    ...Default.args,
    palette: 'ocean',
    title: 'Ocean Palette',
  },
};

export const LargeDataset: Story = {
  args: {
    ...Default.args,
    data: [
      { category: 'Q1', value: 15 },
      { category: 'Q2', value: 20 },
      { category: 'Q3', value: 25 },
      { category: 'Q4', value: 18 },
      { category: 'Q5', value: 12 },
      { category: 'Q6', value: 10 },
    ],
    title: 'Quarterly Sales',
    size: { width: 800, height: 500 },
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: { width: 300, height: 300 },
    title: 'Small Chart',
  },
};

export const NoAnimation: Story = {
  args: {
    ...Default.args,
    animationEnabled: false,
    title: 'No Animation',
  },
};

export const PastelColors: Story = {
  args: {
    ...Default.args,
    palette: 'pastel',
    title: 'Pastel Color Palette',
  },
};

export const SalesData: Story = {
  args: {
    data: [
      { category: 'Mobile Phones', value: 42 },
      { category: 'Laptops', value: 28 },
      { category: 'Tablets', value: 18 },
      { category: 'Accessories', value: 12 },
    ],
    title: 'Product Sales',
    palette: 'violet',
    size: { width: 600, height: 400 },
    showLegend: true,
    showLabels: true,
  },
};
