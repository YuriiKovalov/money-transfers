import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  imports: [],
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
        position: relative;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class ChartComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  $data = input.required<number[]>({ alias: 'data' });
  $labels = input.required<string[]>({ alias: 'labels' });
  $type = input<ChartType>('line', { alias: 'type' });
  $title = input<string>('Account Balance', { alias: 'title' });

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      // Only create chart in browser environment
      if (!this.isBrowser) {
        return;
      }

      const canvas = this.chartCanvas()?.nativeElement;
      const data = this.$data();
      const labels = this.$labels();
      const type = this.$type();

      if (canvas && data && labels) {
        this.createChart(canvas, data, labels, type);
      }
    });
  }

  private createChart(
    canvas: HTMLCanvasElement,
    data: number[],
    labels: string[],
    type: ChartType
  ): void {
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type,
      data: {
        labels,
        datasets: [
          {
            label: this.$title(),
            data,
            borderColor: '#1c40be',
            backgroundColor: 'rgba(29, 64, 190, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#1c40be',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            cornerRadius: 8,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              maxTicksLimit: 7,
              callback: function (value) {
                const numValue = typeof value === 'number' ? value : Number(value);
                if (numValue === 0) {
                  return '0';
                }
                return numValue / 1000 + 'K';
              },
            },
          },
          x: {
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
