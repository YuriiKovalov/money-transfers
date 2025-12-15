import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ROUTES } from '../../core/constants/routes.constants';
import { IconDirective } from '../../shared/directives/icon.directive';

export interface NavigationItem {
  label: string;
  icon: string;
  isActive?: boolean;
  alignBottom?: boolean;
  route?: string;
}

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

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, IconDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly router = inject(Router);

  readonly $active = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.getActiveRoute()),
      startWith(this.getActiveRoute())
    ),
    { initialValue: '' }
  );

  readonly $topItems = signal<NavigationItem[]>(
    SIDEBAR_NAVIGATION_ITEMS.filter(item => !item.alignBottom)
  );

  readonly $bottomItems = signal<NavigationItem[]>(
    SIDEBAR_NAVIGATION_ITEMS.filter(item => item.alignBottom)
  );

  private getActiveRoute(): string {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment.length > 0);
    return segments[0] || '';
  }
}
