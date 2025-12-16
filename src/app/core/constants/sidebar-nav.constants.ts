import { NavigationItem } from '../models/navigation-item.interface';
import { ROOT_ROUTES } from './root-routes.constants';

export const SIDEBAR_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: ROOT_ROUTES.DASHBOARD },
  { label: 'Positions', icon: 'positions', route: ROOT_ROUTES.POSITIONS },
  { label: 'Analytics', icon: 'analytics', route: ROOT_ROUTES.ANALYTICS },
  { label: 'Transfers', icon: 'convert-card', route: ROOT_ROUTES.TRANSFERS },
  { label: 'Reports', icon: 'reports', route: ROOT_ROUTES.REPORTS },
  { label: 'Transactions', icon: 'transactions', route: ROOT_ROUTES.TRANSACTIONS },
  { label: 'Platform', icon: 'platform', route: ROOT_ROUTES.PLATFORM },
  { label: 'Referrals', icon: 'referrals', route: ROOT_ROUTES.REFERRALS },
  { label: 'Support', icon: 'support', route: ROOT_ROUTES.SUPPORT, alignBottom: true },
  { label: 'Disclosures', icon: 'book-square', route: ROOT_ROUTES.DISCLOSURES, alignBottom: true },
];
