import { Routes } from '@angular/router';
import { LogInLandingPage } from './pages/log-in-landing-page/log-in-landing-page';
import { DashboardPage } from './pages/platform/pages/dashboard-page/dashboard-page';
import { Platform } from './pages/platform/platform';
import { redirectSignedInToPlatform, requireSignedIn } from './services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LogInLandingPage,
    canActivate: [redirectSignedInToPlatform],
  },
  {
    path: 'platform',
    component: Platform,
    canActivate: [requireSignedIn],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
