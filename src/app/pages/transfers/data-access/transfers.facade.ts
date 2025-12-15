import { Injectable, computed, inject } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { TransfersClient } from '../../../core/api/clients/transfers.client';
import { TransfersStore } from './transfers.store';

@Injectable()
export class TransfersFacade {
  private readonly store = inject(TransfersStore);
  private readonly client = inject(TransfersClient);

  readonly $loading = this.store.loading;
  readonly $chartPoints = this.store.chartPoints;
  readonly $connectedAccounts = this.store.connectedAccounts;
  readonly $wireAccounts = computed(() => this.store.connectedAccounts()?.wireAccounts ?? []);
  readonly $plaidAccounts = computed(() => this.store.connectedAccounts()?.plaidAccounts ?? []);
  readonly $filteredTransfers = this.store.filteredTransfers;
  readonly $transferFilter = this.store.transferFilter;

  updateTransferFilter(filter: string[]): void {
    this.store.updateTransferFilter(filter);
  }

  initOverview() {
    forkJoin({
      accountBalance: this.client.getAccountBalance(),
      connectedAccounts: this.client.getConnectedAccounts(),
      recentTransfers: this.client.getRecentTransfers(),
    })
      .pipe(take(1))
      .subscribe(responses => {
        const { accountBalance, connectedAccounts, recentTransfers } = responses;
        this.store.updateOverview({
          chartPoints: accountBalance.points,
          connectedAccounts,
          transfers: recentTransfers.transfers,
        });
      });
  }
}
