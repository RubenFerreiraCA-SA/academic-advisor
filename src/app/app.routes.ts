import { Routes } from '@angular/router';
import { LogInLandingPage } from './pages/log-in-landing-page/log-in-landing-page';
import { DashboardPage } from './pages/platform/pages/dashboard-page/dashboard-page';
import { PlatformSectionPage } from './pages/platform/pages/platform-section-page/platform-section-page';
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
      {
        path: 'papers',
        component: PlatformSectionPage,
        data: {
          title: 'Papers',
          description: 'Browse, organize, and manage research papers across every stage of the publishing workflow.',
        },
      },
      {
        path: 'tasks',
        component: PlatformSectionPage,
        data: {
          title: 'Tasks',
          description: 'Track writing, review, submission, and collaborator tasks in one focused workspace.',
        },
      },
      {
        path: 'review-queue',
        component: PlatformSectionPage,
        data: {
          title: 'Review Queue',
          description: 'Prioritize papers that need peer review, editorial feedback, or approval before submission.',
        },
      },
      {
        path: 'collaborators',
        component: PlatformSectionPage,
        data: {
          title: 'Collaborators',
          description: 'Manage coauthors, reviewers, advisors, and shared research responsibilities.',
        },
      },
      {
        path: 'calendar',
        component: PlatformSectionPage,
        data: {
          title: 'Calendar',
          description: 'See deadlines, meetings, review windows, and submission milestones by date.',
        },
      },
      {
        path: 'templates',
        component: PlatformSectionPage,
        data: {
          title: 'Templates',
          description: 'Access reusable manuscript, review, outline, and submission templates.',
        },
      },
      {
        path: 'submissions',
        component: PlatformSectionPage,
        data: {
          title: 'Submissions',
          description: 'Monitor journal submissions, publication statuses, and response timelines.',
        },
      },
      {
        path: 'analytics',
        component: PlatformSectionPage,
        data: {
          title: 'Analytics',
          description: 'Review publication progress, workload distribution, and research output trends.',
        },
      },
      {
        path: 'settings',
        component: PlatformSectionPage,
        data: {
          title: 'Settings',
          description: 'Configure workspace preferences, account details, notifications, and integrations.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
