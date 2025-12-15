import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { IconDirective } from '../../shared/directives/icon.directive';
import { SIDEBAR_NAVIGATION_ITEMS } from '../../core/constants/sidebar-nav.constants';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, IconDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly sidebarNavigationItems = SIDEBAR_NAVIGATION_ITEMS;

  readonly $active = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.getActiveRoute())
    ),
    { initialValue: this.getActiveRoute() }
  );

  readonly topItems = this.sidebarNavigationItems.filter(item => !item.alignBottom);
  readonly bottomItems = this.sidebarNavigationItems.filter(item => item.alignBottom);

  private getActiveRoute(): string {
    const url = this.router.url;
    const segments = url.split('/').filter(segment => segment.length > 0);
    return segments[0] || '';
  }
}
