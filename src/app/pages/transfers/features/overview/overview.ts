import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChartComponent } from '../../../../shared/components/chart/chart';
import { AccountType } from '../../../../shared/components/account-type/account-type';
import { TableFilter } from '../../../../shared/components/table-filter/table-filter';
import { TransfersFacade } from '../../data-access/transfers.facade';
import { TRANSFERS_FILTER_OPTIONS } from '../../../../core/constants/transfers-filter.constants';
import { Table } from '../../../../shared/components/table/table';

@Component({
  selector: 'app-transfers-overview',
  imports: [ChartComponent, AccountType, TableFilter, ReactiveFormsModule, Table],
  templateUrl: './overview.html',
  styles: [
    `
      section {
        margin-bottom: 80px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  readonly filterOptions = TRANSFERS_FILTER_OPTIONS;
  readonly chartColumns = [
    { label: 'Date', value: 'date' },
    { label: 'Type', value: 'type' },
    { label: 'Method', value: 'method' },
    { label: 'Account', value: 'account' },
    { label: 'Amount($)', value: 'amount' },
    { label: 'Status', value: 'status' },
  ];

  private readonly facade = inject(TransfersFacade);

  readonly $filteredTransfers = this.facade.$filteredTransfers;
  readonly $chartData = signal<number[]>([]);
  readonly $chartLabels = signal<string[]>([]);

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
