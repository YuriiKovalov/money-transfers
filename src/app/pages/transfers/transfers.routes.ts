import { Routes } from '@angular/router';
import { Transfers } from './transfers';
import { TRANSFERS_ROUTES } from './constants/transfers-routes.constants';

export const transfersRoutes: Routes = [
  {
    path: '',
    component: Transfers,
    children: [
      {
        path: '',
        redirectTo: TRANSFERS_ROUTES.OVERVIEW,
        pathMatch: 'full',
      },
      {
        path: TRANSFERS_ROUTES.OVERVIEW,
        loadComponent: () => import('./tabs/overview/overview').then(m => m.Overview),
      },
      {
        path: TRANSFERS_ROUTES.DEPOSIT,
        loadComponent: () => import('./tabs/deposit/deposit').then(m => m.Deposit),
      },
      {
        path: TRANSFERS_ROUTES.WITHDRAW,
        loadComponent: () => import('./tabs/withdraw/withdraw').then(m => m.Withdraw),
      },
      {
        path: TRANSFERS_ROUTES.HISTORY,
        loadComponent: () => import('./tabs/history/history').then(m => m.History),
      },
    ],
  },
];
