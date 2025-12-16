import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import {
  AccountBalancePoint,
  ConnectedAccountsResponse,
  Transfer,
} from '../../../core/api/models/transfers.models';
import { computed } from '@angular/core';
import { TRANSFERS_FILTER_OPTIONS } from '../../../core/constants/transfers-filter.constants';

type TransfersState = {
  loading: boolean;
  chartPoints: AccountBalancePoint[];
  connectedAccounts: ConnectedAccountsResponse | null;
  transfers: Transfer[];
  transferFilter: string[];
};

const initialState: TransfersState = {
  loading: false,
  chartPoints: [],
  connectedAccounts: null,
  transfers: [],
  transferFilter: TRANSFERS_FILTER_OPTIONS,
};

export const TransfersStore = signalStore(
  withState<TransfersState>(initialState),
  withMethods(store => ({
    updateLoading(loading: boolean): void {
      patchState(store, { loading });
    },
    updateTransferFilter(filter: string[]): void {
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
      store.transfers().filter(transfer => store.transferFilter().includes(transfer.method))
    ),
  }))
);
