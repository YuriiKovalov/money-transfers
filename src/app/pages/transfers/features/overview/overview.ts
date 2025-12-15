import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ChartComponent } from '../../../../shared/components/chart/chart';
import { IconDirective } from '../../../../shared/directives/icon.directive';

interface PeriodOption {
  label: string;
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-transfers-overview',
  imports: [ChartComponent, IconDirective],
  templateUrl: './overview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  readonly periodOptions: PeriodOption[] = [
    {
      label: 'Last 30 days',
      labels: ['W1', 'W2', 'W3', 'W4'],
      data: [],
    },
    {
      label: 'Last 60 days',
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      data: [],
    },
    {
      label: 'Last 90 days',
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
      data: [],
    },
  ];

  readonly selectedPeriod = signal<PeriodOption>(this.periodOptions[2]);

  readonly chartLabels = computed(() => this.selectedPeriod().labels);
  readonly chartData = computed(() => this.selectedPeriod().data);

  onPeriodChange(): void {
    const currentIndex = this.periodOptions.findIndex(p => p.label === this.selectedPeriod().label);
    const nextIndex = (currentIndex + 1) % this.periodOptions.length;
    this.selectedPeriod.set(this.periodOptions[nextIndex]);
  }
}
