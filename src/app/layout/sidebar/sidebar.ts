import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../core/constants/routes.constants';

export interface NavigationItem {
  label: string;
  icon: string;
  isActive?: boolean;
  alignBottom?: boolean;
  route?: string;
}

export const SIDEBAR_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', icon: 'assets/icons/dashboard.svg', route: ROUTES.DASHBOARD },
  { label: 'Positions', icon: 'assets/icons/positions.svg', route: ROUTES.POSITIONS },
  { label: 'Analytics', icon: 'assets/icons/analytics.svg', route: ROUTES.ANALYTICS },
  { label: 'Transfers', icon: 'assets/icons/convert-card.svg', route: ROUTES.TRANSFERS },
  { label: 'Reports', icon: 'assets/icons/reports.svg', route: ROUTES.REPORTS },
  { label: 'Transactions', icon: 'assets/icons/transactions.svg', route: ROUTES.TRANSACTIONS },
  { label: 'Platform', icon: 'assets/icons/platform.svg', route: ROUTES.PLATFORM },
  { label: 'Referrals', icon: 'assets/icons/referrals.svg', route: ROUTES.REFERRALS },
  { label: 'Support', icon: 'assets/icons/support.svg', route: ROUTES.SUPPORT, alignBottom: true },
  {
    label: 'Disclosures',
    icon: 'assets/icons/book-square.svg',
    route: ROUTES.DISCLOSURES,
    alignBottom: true,
  },
];

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly $topItems = signal<NavigationItem[]>(
    SIDEBAR_NAVIGATION_ITEMS.filter(item => !item.alignBottom)
  );

  readonly $bottomItems = signal<NavigationItem[]>(
    SIDEBAR_NAVIGATION_ITEMS.filter(item => item.alignBottom)
  );
}
