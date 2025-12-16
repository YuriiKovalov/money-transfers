import { Routes } from '@angular/router';
import { ROOT_ROUTES } from './core/constants/root-routes.constants';

export const routes: Routes = [
  {
    path: ROOT_ROUTES.ROOT,
    redirectTo: `/${ROOT_ROUTES.TRANSFERS}`,
    pathMatch: 'full',
  },
  {
    path: ROOT_ROUTES.DASHBOARD,
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
  },
  {
    path: ROOT_ROUTES.POSITIONS,
    loadChildren: () => import('./pages/positions/positions.routes').then(m => m.positionsRoutes),
  },
  {
    path: ROOT_ROUTES.ANALYTICS,
    loadChildren: () => import('./pages/analytics/analytics.routes').then(m => m.analyticsRoutes),
  },
  {
    path: ROOT_ROUTES.TRANSFERS,
    loadChildren: () => import('./pages/transfers/transfers.routes').then(m => m.transfersRoutes),
  },
  {
    path: ROOT_ROUTES.REPORTS,
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.reportsRoutes),
  },
  {
    path: ROOT_ROUTES.TRANSACTIONS,
    loadChildren: () =>
      import('./pages/transactions/transactions.routes').then(m => m.transactionsRoutes),
  },
  {
    path: ROOT_ROUTES.PLATFORM,
    loadChildren: () => import('./pages/platform/platform.routes').then(m => m.platformRoutes),
  },
  {
    path: ROOT_ROUTES.REFERRALS,
    loadChildren: () => import('./pages/referrals/referrals.routes').then(m => m.referralsRoutes),
  },
  {
    path: ROOT_ROUTES.SUPPORT,
    loadChildren: () => import('./pages/support/support.routes').then(m => m.supportRoutes),
  },
  {
    path: ROOT_ROUTES.DISCLOSURES,
    loadChildren: () =>
      import('./pages/disclosures/disclosures.routes').then(m => m.disclosuresRoutes),
  },
];
