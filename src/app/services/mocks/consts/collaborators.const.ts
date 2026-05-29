import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

export const COLLABORATORS_STAT_CARDS: StatCardData[] = [
  { label: 'Total Collaborators', value: '12', detail: 'Across all papers',   icon: 'collaborators',   tone: 'total' },
  { label: 'Active',              value: '8',  detail: 'Working with now',    icon: 'document-pencil', tone: 'drafting' },
  { label: 'Pending Invites',     value: '2',  detail: 'Awaiting acceptance', icon: 'mail',            tone: 'review' },
  { label: 'Shared Papers',       value: '9',  detail: 'Co-authored',         icon: 'document-text',   tone: 'submitted' },
  { label: 'Advisors',            value: '2',  detail: 'Active mentors',      icon: 'document-status', tone: 'revision' },
  { label: 'Institutions',        value: '6',  detail: 'Universities & labs', icon: 'workspace',       tone: 'complete' },
];
