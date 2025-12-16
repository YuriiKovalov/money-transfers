import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChartComponent } from '../../../../shared/features/chart/chart';
import { AccountType } from '../../../../shared/components/account-type/account-type';
import { TableFilter } from '../../../../shared/features/table/components/table-filter/table-filter';
import { TransfersFacade } from '../../services/transfers.facade';
import { TRANSFERS_FILTER_OPTIONS } from '../../constants/transfers-filter.constants';
import { Table } from '../../../../shared/features/table/components/table/table';
import { TableCards } from '../../../../shared/features/table/components/table-cards/table-cards';
import { AccountItem } from '../../../../shared/components/account-item/account-item';
import { TRANSFERS_TABLE_COLUMNS } from '../../constants/transfers-table-columns.constants';

@Component({
  selector: 'app-transfers-overview',
  imports: [
    ChartComponent,
    AccountType,
    TableFilter,
    ReactiveFormsModule,
    Table,
    TableCards,
    AccountItem,
  ],
  templateUrl: './overview.html',
  styles: [
    `
      section {
        margin-bottom: 80px;
      }

      .chart-wrapper {
        height: 376px;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  readonly filterOptions = TRANSFERS_FILTER_OPTIONS;
  readonly columns = TRANSFERS_TABLE_COLUMNS;

  private readonly facade = inject(TransfersFacade);

  readonly $filteredTransfers = this.facade.$transfers;
  readonly $chartData = this.facade.$chartData;
  readonly $chartLabels = this.facade.$chartLabels;
  readonly $wireAccounts = this.facade.$wireAccounts;
  readonly $plaidAccounts = this.facade.$plaidAccounts;

  readonly transfersFilterControl = new FormControl<string[]>(this.facade.$filter());

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
