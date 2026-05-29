import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const TEMPLATES_STAT_CARDS: StatCardData[] = [
  { label: 'Total Templates', value: '10', detail: 'Ready to use',       icon: 'document-lines',  tone: 'total' },
  { label: 'Used This Month', value: '6',  detail: 'Since May 1',        icon: 'document-pencil', tone: 'drafting' },
  { label: 'Personal',        value: '6',  detail: 'Created by you',     icon: 'document-simple', tone: 'revision' },
  { label: 'Shared',          value: '4',  detail: 'Workspace templates', icon: 'collaborators',   tone: 'submitted' },
  { label: 'Manuscripts',     value: '4',  detail: 'Paper templates',    icon: 'document-text',   tone: 'complete' },
  { label: 'Submissions',     value: '3',  detail: 'Submission packs',   icon: 'submissions',     tone: 'review' },
];
