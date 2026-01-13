import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './shared/components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DonutChartComponent],
  template: `
    <div class="app-container">
      <h1>DevExtreme Donut Chart Demo</h1>
      <app-donut-chart
        [data]="chartData"
        [title]="'Sales Distribution'"
        [size]="{ width: 600, height: 400 }"
      ></app-donut-chart>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 30px;
      color: #333;
    }
  `]
})
export class AppComponent {
  chartData = [
    { category: 'Electronics', value: 35 },
    { category: 'Clothing', value: 25 },
    { category: 'Food', value: 20 },
    { category: 'Books', value: 15 },
    { category: 'Other', value: 5 }
  ];
}
