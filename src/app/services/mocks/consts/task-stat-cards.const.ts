import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const TASK_STAT_CARDS: StatCardData[] = [
  {
    label: 'Total Tasks',
    value: '15',
    detail: '11 active tasks',
    icon: 'document-lines',
    tone: 'total',
  },
  {
    label: 'Due Today',
    value: '3',
    detail: 'Needs attention',
    icon: 'calendar',
    tone: 'review',
    trendIcon: '!',
  },
  {
    label: 'In Progress',
    value: '6',
    detail: 'Being worked on',
    icon: 'document-pencil',
    tone: 'drafting',
  },
  {
    label: 'Overdue',
    value: '2',
    detail: 'Past deadline',
    icon: 'bell',
    tone: 'danger',
  },
  {
    label: 'Completed This Week',
    value: '4',
    detail: 'Since May 25',
    icon: 'check-circle',
    tone: 'complete',
  },
  {
    label: 'Delegated',
    value: '5',
    detail: 'Assigned to others',
    icon: 'collaborators',
    tone: 'submitted',
  },
];
