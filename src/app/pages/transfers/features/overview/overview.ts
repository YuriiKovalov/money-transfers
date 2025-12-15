import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChartComponent } from '../../../../shared/components/chart/chart';
import { AccountType } from '../../../../shared/components/account-type/account-type';
import { TableFilter } from '../../../../shared/components/table-filter/table-filter';
import { TransfersFacade } from '../../data-access/transfers.facade';
import { TRANSFERS_FILTER_OPTIONS } from '../../../../core/constants/transfers-filter.constants';

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

  readonly filterOptions = TRANSFERS_FILTER_OPTIONS;

  $chartData = signal<number[]>([]);
  $chartLabels = signal<string[]>([]);

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
