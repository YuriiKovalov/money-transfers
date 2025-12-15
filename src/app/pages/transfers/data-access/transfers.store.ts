import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  AccountBalancePoint,
  ConnectedAccountsResponse,
  Transfer,
} from '../../../core/api/models/transfers.models';

type TransfersState = {
  loading: boolean;
  chartPoints: AccountBalancePoint[];
  connectedAccounts: ConnectedAccountsResponse | null;
  transfers: Transfer[];
};

const initialState: TransfersState = {
  loading: false,
  chartPoints: [],
  connectedAccounts: null,
  transfers: [],
};

export const TransfersStore = signalStore(
  withState<TransfersState>(initialState),
  withMethods(store => ({
    updateLoading(loading: boolean): void {
      patchState(store, { loading });
    },
    updateOverview(payload: {
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
  }))
);
