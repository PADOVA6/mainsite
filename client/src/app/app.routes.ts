import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Gruppo scout AGESCI Padova 6',
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
    title: 'Chi siamo - AGESCI Padova 6',
  },
  {
    path: 'missione',
    loadComponent: () => import('./pages/mission/mission-page').then((m) => m.MissionPage),
    title: 'La nostra missione - AGESCI Padova 6',
  },
  {
    path: 'cammino',
    loadComponent: () => import('./pages/path/path-page').then((m) => m.PathPage),
    title: 'Il cammino scout - AGESCI Padova 6',
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage),
    title: 'Contatti - AGESCI Padova 6',
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
