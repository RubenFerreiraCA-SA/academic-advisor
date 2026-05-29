import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const CALENDAR_STAT_CARDS: StatCardData[] = [
  { label: 'Due This Week',       value: '4', detail: 'May 29 – Jun 4',    icon: 'calendar',        tone: 'review',    trendIcon: '!' },
  { label: 'Upcoming Deadlines',  value: '7', detail: 'Next 30 days',      icon: 'document-simple', tone: 'total' },
  { label: 'Meetings',            value: '3', detail: 'Scheduled',          icon: 'collaborators',   tone: 'drafting' },
  { label: 'Milestones',          value: '5', detail: 'This quarter',       icon: 'check-circle',    tone: 'complete' },
  { label: 'Submissions Due',     value: '2', detail: 'Next 14 days',       icon: 'submissions',     tone: 'revision' },
  { label: 'Review Windows',      value: '3', detail: 'Open for review',    icon: 'review-search',   tone: 'submitted' },
];
