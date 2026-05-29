import { Routes } from '@angular/router';
import { LogInLandingPage } from './pages/log-in-landing-page/log-in-landing-page';
import { DashboardPage } from './pages/platform/pages/dashboard-page/dashboard-page';
import { Platform } from './pages/platform/platform';
import { redirectSignedInToPlatform, requireSignedIn } from './services/auth/auth.guard';
import { PapersPage } from './pages/platform/pages/papers-page/papers-page';
import { NewPaperPage } from './pages/platform/pages/papers-page/new-paper-page/new-paper-page';
import { PaperDetailPage } from './pages/platform/pages/paper-detail-page/paper-detail-page';
import { TasksPage } from './pages/platform/pages/tasks-page/tasks-page';
import { ReviewQueuePage } from './pages/platform/pages/review-queue-page/review-queue-page';
import { CollaboratorsPage } from './pages/platform/pages/collaborators-page/collaborators-page';
import { CalendarPage } from './pages/platform/pages/calendar-page/calendar-page';
import { TemplatesPage } from './pages/platform/pages/templates-page/templates-page';
import { SubmissionsPage } from './pages/platform/pages/submissions-page/submissions-page';
import { AnalyticsPage } from './pages/platform/pages/analytics-page/analytics-page';
import { SettingsPage } from './pages/platform/pages/settings-page/settings-page';

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
      {
        path: 'papers',
        component: PapersPage,
      },
      {
        path: 'papers/new',
        component: NewPaperPage,
      },
      {
        path: 'papers/:id', component: PaperDetailPage
      },
      {
        path: 'tasks',
        component: TasksPage,
      },
      { path: 'review-queue', component: ReviewQueuePage },
      { path: 'collaborators', component: CollaboratorsPage },
      { path: 'calendar', component: CalendarPage },
      { path: 'templates', component: TemplatesPage },
      { path: 'submissions', component: SubmissionsPage },
      { path: 'analytics', component: AnalyticsPage },
      { path: 'settings', component: SettingsPage },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
