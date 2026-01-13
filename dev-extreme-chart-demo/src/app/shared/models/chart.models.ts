export interface DonutChartData {
  category: string;
  value: number;
}

export interface DonutChartSize {
  width: number;
  height: number;
}

export type DonutChartPalette =
  | 'default'
  | 'fluent-blue-light'
  | 'fluent-blue-dark'
  | 'soft'
  | 'pastel'
  | 'ocean'
  | 'violet'
  | 'carmine'
  | 'dark-moon'
  | 'soft-blue';
