import { Injectable, computed, inject } from '@angular/core';
import { take } from 'rxjs';
import { TransfersClient } from '../../../core/api/clients/transfers.client';
import { TransfersStore } from './transfers.store';

@Injectable()
export class TransfersFacade {
  private readonly store = inject(TransfersStore);
  private readonly client = inject(TransfersClient);

  readonly $filter = this.store.transferFilter;
  readonly $transfers = this.store.filteredTransfers;
  readonly $wireAccounts = computed(() => this.store.connectedAccounts()?.wireAccounts);
  readonly $plaidAccounts = computed(() => this.store.connectedAccounts()?.plaidAccounts);
  readonly $chartData = computed(() => this.store.chartPoints().map(point => point.value));
  readonly $chartLabels = computed(() => this.store.chartPoints().map(point => point.label));

  updateTransferFilter(filter: string[]): void {
    this.store.updateTransferFilter(filter);
  }

  initOverview() {
    this.client
      .getOverviewData()
      .pipe(take(1))
      .subscribe(({ accountBalance, connectedAccounts, recentTransfers }) => {
        this.store.setData({
          chartPoints: accountBalance.points,
          connectedAccounts,
          transfers: recentTransfers.transfers,
        });
      });
  }

  toggleDataVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.initOverview();
    } else {
      this.store.resetData();
    }
  }
}
