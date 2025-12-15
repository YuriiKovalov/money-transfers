import { NavigationItem } from '../models/navigation-item.interface';
import { ROUTES } from './routes.constants';

export const SIDEBAR_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: ROUTES.DASHBOARD },
  { label: 'Positions', icon: 'positions', route: ROUTES.POSITIONS },
  { label: 'Analytics', icon: 'analytics', route: ROUTES.ANALYTICS },
  { label: 'Transfers', icon: 'convert-card', route: ROUTES.TRANSFERS },
  { label: 'Reports', icon: 'reports', route: ROUTES.REPORTS },
  { label: 'Transactions', icon: 'transactions', route: ROUTES.TRANSACTIONS },
  { label: 'Platform', icon: 'platform', route: ROUTES.PLATFORM },
  { label: 'Referrals', icon: 'referrals', route: ROUTES.REFERRALS },
  { label: 'Support', icon: 'support', route: ROUTES.SUPPORT, alignBottom: true },
  { label: 'Disclosures', icon: 'book-square', route: ROUTES.DISCLOSURES, alignBottom: true },
];
