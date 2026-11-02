import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Gruppo scout AGESCI Padova 6',
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./pages/errors/page-not-found/page-not-found').then((m) => m.PageNotFound),
    title: '404 - Page Not Found',
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];
