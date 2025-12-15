import { Routes } from '@angular/router';
import { TRANSFERS_ROUTES } from '../../core/constants/routes.constants';
import { Transfers } from './transfers';

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
        loadComponent: () => import('./overview/overview').then(m => m.Overview),
      },
      {
        path: TRANSFERS_ROUTES.DEPOSIT,
        loadComponent: () => import('./deposit/deposit').then(m => m.Deposit),
      },
      {
        path: TRANSFERS_ROUTES.WITHDRAW,
        loadComponent: () => import('./withdraw/withdraw').then(m => m.Withdraw),
      },
      {
        path: TRANSFERS_ROUTES.HISTORY,
        loadComponent: () => import('./history/history').then(m => m.History),
      },
    ],
  },
];
