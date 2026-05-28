import { PlatformNavItem } from "../../../pages/platform/sections/side-nav/side-nav";

export const SIDE_NAV_ITEMS: PlatformNavItem[] = [
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