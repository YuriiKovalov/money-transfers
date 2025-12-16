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
import { Chart, ChartType } from 'chart.js/auto';
import { buildChartConfig } from './chart.util';

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

  $chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');
  $data = input.required<number[]>({ alias: 'data' });
  $labels = input.required<string[]>({ alias: 'labels' });
  $type = input<ChartType>('line', { alias: 'type' });

  private chart: Chart | null = null;

  constructor() {
    effect(() => {
      if (!this.isBrowser) {
        return;
      }

      const canvas = this.$chartCanvas()?.nativeElement;
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

    const config = buildChartConfig(data, labels, type);

    this.chart = new Chart(canvas, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
