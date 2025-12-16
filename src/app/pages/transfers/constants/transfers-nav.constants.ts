import { NavigationItem } from '../../../core/models/navigation-item.interface';
import { TRANSFERS_ROUTES } from './transfers-routes.constants';

export const TRANSFERS_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Overview', route: TRANSFERS_ROUTES.OVERVIEW },
  { label: 'Deposit', route: TRANSFERS_ROUTES.DEPOSIT },
  { label: 'Withdraw', route: TRANSFERS_ROUTES.WITHDRAW },
  { label: 'History', route: TRANSFERS_ROUTES.HISTORY },
] as const;
