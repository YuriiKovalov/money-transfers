import { Component, computed } from '@angular/core';

export interface NavigationItem {
  label: string;
  icon: string;
  isActive?: boolean;
  alignBottom?: boolean;
}

export const SIDEBAR_NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', icon: 'assets/icons/dashboard.svg' },
  { label: 'Positions', icon: 'assets/icons/positions.svg' },
  { label: 'Analytics', icon: 'assets/icons/analytics.svg' },
  { label: 'Transfers', icon: 'assets/icons/convert-card.svg' },
  { label: 'Reports', icon: 'assets/icons/reports.svg' },
  { label: 'Transactions', icon: 'assets/icons/transactions.svg' },
  { label: 'Platform', icon: 'assets/icons/platform.svg' },
  { label: 'Referrals', icon: 'assets/icons/referrals.svg' },
  { label: 'Support', icon: 'assets/icons/support.svg', alignBottom: true },
  { label: 'Disclosures', icon: 'assets/icons/book-square.svg', alignBottom: true },
];

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly topItems$ = computed(() =>
    SIDEBAR_NAVIGATION_ITEMS.filter(item => !item.alignBottom)
  );

  readonly bottomItems$ = computed(() =>
    SIDEBAR_NAVIGATION_ITEMS.filter(item => item.alignBottom)
  );
}
