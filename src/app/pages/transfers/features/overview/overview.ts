import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ChartComponent } from '../../../../shared/components/chart/chart';
import { AccountType } from '../../../../shared/components/account-type/account-type';
import { TableFilter } from '../../../../shared/components/table-filter/table-filter';
import { TransfersFacade } from '../../data-access/transfers.facade';
import { TRANSFERS_FILTER_OPTIONS } from '../../../../core/constants/transfers-filter.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface PeriodOption {
  label: string;
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-transfers-overview',
  imports: [ChartComponent, AccountType, TableFilter, ReactiveFormsModule],
  templateUrl: './overview.html',
  styles: [
    `
      section:not(:last-child) {
        margin-bottom: 80px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  private readonly facade = inject(TransfersFacade);

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

  readonly filterOptions = TRANSFERS_FILTER_OPTIONS;

  readonly selectedPeriod = signal<PeriodOption>(this.periodOptions[2]);

  readonly chartLabels = computed(() => this.selectedPeriod().labels);
  readonly chartData = computed(() => this.selectedPeriod().data);

  readonly transfersFilterControl = new FormControl<string[]>(this.facade.$transferFilter());

  constructor() {
    this.listenTableFilterChange();
  }

  private listenTableFilterChange(): void {
    this.transfersFilterControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      if (!value) return;
      this.facade.updateTransferFilter(value);
    });
  }
}
