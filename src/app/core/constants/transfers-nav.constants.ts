import { TRANSFERS_ROUTES } from './routes.constants';
import { NavigationItem } from '../models/navigation-item.interface';

export const TRANSFERS_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Overview', route: TRANSFERS_ROUTES.OVERVIEW },
  { label: 'Deposit', route: TRANSFERS_ROUTES.DEPOSIT },
  { label: 'Withdraw', route: TRANSFERS_ROUTES.WITHDRAW },
  { label: 'History', route: TRANSFERS_ROUTES.HISTORY },
] as const;
