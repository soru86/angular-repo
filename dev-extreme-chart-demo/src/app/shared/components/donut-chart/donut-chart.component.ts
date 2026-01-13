import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxPieChartModule } from 'devextreme-angular';
import { DonutChartData, DonutChartSize, DonutChartPalette } from '../../models/chart.models';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, DxPieChartModule],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit, OnChanges {
  @Input() data: DonutChartData[] = [];
  @Input() title: string = '';
  @Input() size: DonutChartSize = { width: 500, height: 400 };
  @Input() palette: DonutChartPalette = 'default';
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() innerRadius: number = 0.7;
  @Input() startAngle: number = 0;
  @Input() endAngle: number = 360;
  @Input() animationEnabled: boolean = true;
  @Input() exportEnabled: boolean = false;

  chartData: DonutChartData[] = [];
  chartPalette: string[] = [];

  ngOnInit(): void {
    this.updateChartData();
    this.updatePalette();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChartData();
    }
    if (changes['palette']) {
      this.updatePalette();
    }
  }

  private updateChartData(): void {
    this.chartData = this.data || [];
  }

  private updatePalette(): void {
    const palettes: Record<DonutChartPalette, string[]> = {
      default: ['#1db2f5', '#97c95c', '#ffc733', '#ff7c7c', '#9c9c9c', '#ffa85c', '#c46e4f', '#9e9e9e'],
      'fluent-blue-light': ['#1db2f5', '#97c95c', '#ffc733', '#ff7c7c', '#9c9c9c', '#ffa85c', '#c46e4f', '#9e9e9e'],
      'fluent-blue-dark': ['#1db2f5', '#97c95c', '#ffc733', '#ff7c7c', '#9c9c9c', '#ffa85c', '#c46e4f', '#9e9e9e'],
      soft: ['#9c9c9c', '#97c95c', '#ffc733', '#ff7c7c', '#1db2f5', '#ffa85c', '#c46e4f', '#9e9e9e'],
      pastel: ['#b3d9ff', '#c5e1a5', '#ffe082', '#ffccbc', '#e1bee7', '#f8bbd0', '#b2ebf2', '#c5cae9'],
      ocean: ['#0078d4', '#00bcf2', '#00a4ef', '#0086c0', '#005a9e', '#004578', '#003d6b', '#002d50'],
      violet: ['#8764b8', '#a082de', '#b4a0ff', '#c5b3ff', '#d6c6ff', '#e6d9ff', '#f0ebff', '#f5f2ff'],
      'carmine': ['#c41e3a', '#e74c3c', '#ec7063', '#f1948a', '#f5b7b1', '#fadbd8', '#fdebd0', '#fef5e7'],
      'dark-moon': ['#1e1e1e', '#2d2d2d', '#3d3d3d', '#4d4d4d', '#5d5d5d', '#6d6d6d', '#7d7d7d', '#8d8d8d'],
      'soft-blue': ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2']
    };

    this.chartPalette = palettes[this.palette] || palettes.default;
  }

  customizeTooltip(arg: any): any {
    return {
      text: `${arg.argumentText}: ${arg.valueText} (${arg.percentText})`
    };
  }

  customizeLabel(arg: any): string {
    return `${arg.argumentText}: ${arg.percentText}`;
  }
}
