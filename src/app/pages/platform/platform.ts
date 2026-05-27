import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type PlatformNavItem = {
  label: string;
  icon: string;
  route: string;
  badge?: {
    label: string;
    tone?: 'default' | 'highlight';
  };
};

@Component({
  selector: 'app-platform',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './platform.html',
  styleUrl: './platform.scss',
})
export class Platform {
  protected readonly navItems: PlatformNavItem[] = [
    {
      label: 'Dashboard',
      icon: 'home',
      route: '/platform/dashboard',
    },
    {
      label: 'Papers',
      icon: 'document-text',
      route: '/platform/papers',
    },
    {
      label: 'Tasks',
      icon: 'document-simple',
      route: '/platform/tasks',
      badge: {
        label: '12',
      },
    },
    {
      label: 'Review Queue',
      icon: 'document-search',
      route: '/platform/review-queue',
      badge: {
        label: '7',
      },
    },
    {
      label: 'Collaborators',
      icon: 'collaborators',
      route: '/platform/collaborators',
    },
    {
      label: 'Calendar',
      icon: 'calendar',
      route: '/platform/calendar',
    },
    {
      label: 'Templates',
      icon: 'document-simple',
      route: '/platform/templates',
    },
    {
      label: 'Submissions',
      icon: 'submissions',
      route: '/platform/submissions',
    },
    {
      label: 'Analytics',
      icon: 'analytics',
      route: '/platform/analytics',
      badge: {
        label: 'New',
        tone: 'highlight',
      },
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/platform/settings',
    },
  ];
}
