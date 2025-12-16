import { Injectable } from '@angular/core';
import { delay, forkJoin, of } from 'rxjs';
import {
  AccountBalanceResponse,
  ConnectedAccountsResponse,
  RecentTransfersResponse,
} from '../models/transfers.models';
import accountBalanceMock from '../mocks/account-balance.mock.json';
import connectedAccountsMock from '../mocks/connected-accounts.mock.json';
import recentTransfersMock from '../mocks/recent-transfers.mock.json';

@Injectable({
  providedIn: 'root',
})
export class TransfersClient {
  private getAccountBalance() {
    const response = accountBalanceMock as AccountBalanceResponse;
    return of(response).pipe(delay(300));
  }

  private getConnectedAccounts() {
    const response = connectedAccountsMock as ConnectedAccountsResponse;
    return of(response).pipe(delay(300));
  }

  private getRecentTransfers() {
    const response = recentTransfersMock as RecentTransfersResponse;
    return of(response).pipe(delay(300));
  }

  getOverviewData() {
    return forkJoin({
      accountBalance: this.getAccountBalance(),
      connectedAccounts: this.getConnectedAccounts(),
      recentTransfers: this.getRecentTransfers(),
    });
  }
}
