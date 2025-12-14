import { Routes } from '@angular/router';
import { ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
  {
    path: ROUTES.ROOT,
    redirectTo: `/${ROUTES.TRANSFERS}`,
    pathMatch: 'full',
  },
  {
    path: ROUTES.DASHBOARD,
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.dashboardRoutes),
  },
  {
    path: ROUTES.POSITIONS,
    loadChildren: () => import('./pages/positions/positions.routes').then(m => m.positionsRoutes),
  },
  {
    path: ROUTES.ANALYTICS,
    loadChildren: () => import('./pages/analytics/analytics.routes').then(m => m.analyticsRoutes),
  },
  {
    path: ROUTES.TRANSFERS,
    loadChildren: () => import('./pages/transfers/transfers.routes').then(m => m.transfersRoutes),
  },
  {
    path: ROUTES.REPORTS,
    loadChildren: () => import('./pages/reports/reports.routes').then(m => m.reportsRoutes),
  },
  {
    path: ROUTES.TRANSACTIONS,
    loadChildren: () =>
      import('./pages/transactions/transactions.routes').then(m => m.transactionsRoutes),
  },
  {
    path: ROUTES.PLATFORM,
    loadChildren: () => import('./pages/platform/platform.routes').then(m => m.platformRoutes),
  },
  {
    path: ROUTES.REFERRALS,
    loadChildren: () => import('./pages/referrals/referrals.routes').then(m => m.referralsRoutes),
  },
  {
    path: ROUTES.SUPPORT,
    loadChildren: () => import('./pages/support/support.routes').then(m => m.supportRoutes),
  },
  {
    path: ROUTES.DISCLOSURES,
    loadChildren: () =>
      import('./pages/disclosures/disclosures.routes').then(m => m.disclosuresRoutes),
  },
];
