import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { TRANSFERS_ROUTES } from '../../core/constants/routes.constants';
import { TabItem, TabsComponent } from '../../shared/components/tabs/tabs';

@Component({
  selector: 'app-transfers',
  imports: [RouterOutlet, TabsComponent],
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
})
export class Transfers {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly tabs: TabItem[] = [
    { label: 'Overview', route: TRANSFERS_ROUTES.OVERVIEW },
    { label: 'Deposit', route: TRANSFERS_ROUTES.DEPOSIT },
    { label: 'Withdraw', route: TRANSFERS_ROUTES.WITHDRAW },
    { label: 'History', route: TRANSFERS_ROUTES.HISTORY },
  ];

  readonly $activeTab = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getActiveRoute()),
      startWith(this.getActiveRoute())
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
