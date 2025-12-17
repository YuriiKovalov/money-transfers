import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {
  AccountBalancePoint,
  ConnectedAccountsResponse,
  Transfer,
} from '../../../core/api/models/transfers.models';
import { computed } from '@angular/core';
import { TRANSFERS_FILTER_OPTIONS } from '../constants/transfers-filter.constants';
import { TransferFilter } from '../models/filter.type';

type TransfersState = {
  chartPoints: AccountBalancePoint[];
  connectedAccounts: ConnectedAccountsResponse | null;
  transfers: Transfer[];
  transferFilter: TransferFilter;
};

const initialState: TransfersState = {
  chartPoints: [],
  connectedAccounts: null,
  transfers: [],
  transferFilter: TRANSFERS_FILTER_OPTIONS[0],
};

export const TransfersStore = signalStore(
  withState<TransfersState>(initialState),
  withMethods(store => ({
    updateTransferFilter(filter: TransferFilter): void {
      patchState(store, { transferFilter: filter });
    },
    setData(payload: {
      chartPoints: AccountBalancePoint[];
      connectedAccounts: ConnectedAccountsResponse;
      transfers: Transfer[];
    }): void {
      patchState(store, {
        chartPoints: payload.chartPoints,
        connectedAccounts: payload.connectedAccounts,
        transfers: payload.transfers,
      });
    },
    resetData(): void {
      patchState(store, initialState);
    },
  })),
  withComputed(store => ({
    filteredTransfers: computed(() =>
      store.transfers().filter(transfer => {
        if (store.transferFilter() === 'All') {
          return true;
        }

        return transfer.method === store.transferFilter();
      })
    ),
  }))
);
