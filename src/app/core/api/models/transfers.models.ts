export type TransferMethod = 'Wire' | 'ACH';

export type TransferType = 'Deposit' | 'Withdrawal';

export type TransferStatus = 'Pending' | 'Completed' | 'Rejected';

export interface Transfer {
  date: string;
  time: string;
  type: TransferType;
  method: TransferMethod;
  account: string;
  amount: number;
  status: TransferStatus;
}

export interface ConnectedAccount {
  bankName: string;
  maskedAccount: string;
}

export interface AccountBalancePoint {
  label: string;
  value: number;
}

export interface AccountBalanceResponse {
  points: AccountBalancePoint[];
}

export interface ConnectedAccountsResponse {
  wireAccounts: ConnectedAccount[];
  plaidAccounts: ConnectedAccount[];
}

export interface RecentTransfersResponse {
  transfers: Transfer[];
}
