import { ColumnModel } from '../../../shared/features/table/models/column.model';
import { Transfer } from '../../../core/api/models/transfers.models';

export const TRANSFERS_TABLE_COLUMNS: ColumnModel<keyof Transfer & string>[] = [
  { label: 'Date', value: 'date' },
  { label: 'Type', value: 'type' },
  { label: 'Method', value: 'method' },
  { label: 'Account', value: 'account', type: 'mask' },
  { label: 'Amount ($)', value: 'amount' },
  { label: 'Status', value: 'status', type: 'chip' },
];
