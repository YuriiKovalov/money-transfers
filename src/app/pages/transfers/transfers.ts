import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { TRANSFERS_ROUTES } from '../../core/constants/routes.constants';
import { TabsComponent } from '../../shared/components/tabs/tabs';
import { TRANSFERS_NAVIGATION_ITEMS } from '../../core/constants/transfers-nav.constants';

@Component({
  selector: 'app-transfers',
  imports: [RouterOutlet, TabsComponent],
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
})
export class Transfers {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly tabs = TRANSFERS_NAVIGATION_ITEMS;

  readonly $activeTab = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getActiveRoute())
    ),
    { initialValue: TRANSFERS_ROUTES.OVERVIEW }
  );

  onTabChange(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  private getActiveRoute(): string {
    const childRoute = this.activatedRoute.firstChild;
    return childRoute?.snapshot?.url?.[0]?.path || TRANSFERS_ROUTES.OVERVIEW;
  }
}
