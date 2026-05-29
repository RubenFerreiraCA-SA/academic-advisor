import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const ANALYTICS_STAT_CARDS: StatCardData[] = [
  { label: 'Papers Published', value: '7', detail: '↗ 3 this year', icon: 'check-circle', tone: 'complete', trendIcon: '↗' },
  { label: 'Acceptance Rate', value: '64%', detail: '7 of 11 submissions', icon: 'document-status', tone: 'drafting' },
  { label: 'Avg. Review Time', value: '38d', detail: 'Days to decision', icon: 'review-search', tone: 'review' },
  { label: 'Total Citations', value: '284', detail: '↗ 42 this year', icon: 'analytics', tone: 'submitted', trendIcon: '↗' },
  { label: 'H-Index', value: '9', detail: 'Estimated', icon: 'document-lines', tone: 'revision' },
  { label: 'Collaborators', value: '12', detail: 'Across 6 institutions', icon: 'collaborators', tone: 'total' },
];

export interface PublicationYear {
  year: number;
  count: number;
  citations: number;
}

export interface VenueData {
  name: string;
  shortName: string;
  count: number;
  tone: string;
}

export interface TopicData {
  topic: string;
  count: number;
  percentage: number;
  tone: string;
}

export const PUBLICATIONS_BY_YEAR: PublicationYear[] = [
  { year: 2022, count: 1, citations: 38 },
  { year: 2023, count: 2, citations: 89 },
  { year: 2024, count: 2, citations: 115 },
  { year: 2025, count: 2, citations: 42 },
];

export const VENUES_DATA: VenueData[] = [
  { name: 'Nature / IEEE Transactions', shortName: 'Nature / IEEE', count: 3, tone: 'complete' },
  { name: 'ACM / NeurIPS / ICML', shortName: 'ACM / NeurIPS', count: 2, tone: 'drafting' },
  { name: 'Specialty Journals', shortName: 'Specialty', count: 2, tone: 'review' },
];

export const TOPICS_DATA: TopicData[] = [
  { topic: 'AI / Machine Learning', count: 9, percentage: 64, tone: 'drafting' },
  { topic: 'Privacy & Security', count: 3, percentage: 21, tone: 'review' },
  { topic: 'Biomedical / Healthcare', count: 2, percentage: 14, tone: 'complete' },
  { topic: 'Climate / Environment', count: 1, percentage: 7, tone: 'submitted' },
  { topic: 'Operations Research', count: 1, percentage: 7, tone: 'revision' },
];
