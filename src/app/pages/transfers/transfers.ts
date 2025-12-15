import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { TRANSFERS_ROUTES } from '../../core/constants/routes.constants';
import { TabsComponent } from '../../shared/components/tabs/tabs';
import { TRANSFERS_NAVIGATION_ITEMS } from '../../core/constants/transfers-nav.constants';
import { TransfersFacade } from './data-access/transfers.facade';
import { TransfersStore } from './data-access/transfers.store';

@Component({
  selector: 'app-transfers',
  imports: [RouterOutlet, TabsComponent],
  templateUrl: './transfers.html',
  styleUrl: './transfers.scss',
  providers: [TransfersStore, TransfersFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transfers {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly facade = inject(TransfersFacade);

  readonly tabs = TRANSFERS_NAVIGATION_ITEMS;

  readonly $activeTab = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getActiveRoute())
    ),
    { initialValue: TRANSFERS_ROUTES.OVERVIEW }
  );

  constructor() {
    this.facade.initOverview();
  }

  onTabChange(route: string): void {
    this.router.navigate([route], { relativeTo: this.activatedRoute });
  }

  private getActiveRoute(): string {
    const childRoute = this.activatedRoute.firstChild;
    return childRoute?.snapshot?.url?.[0]?.path || TRANSFERS_ROUTES.OVERVIEW;
  }
}
