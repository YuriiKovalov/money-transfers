import {
  ChangeDetectionStrategy,
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
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
      }

      .chart-container {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type,
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: '#1d40be', // var(--color-primary-blue)
            borderWidth: 1,
            backgroundColor: '#DDE1FF', // var(--color-primary-light)
            fill: true,
            pointBackgroundColor: '#1c40be', // var(--color-primary-blue)
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
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
