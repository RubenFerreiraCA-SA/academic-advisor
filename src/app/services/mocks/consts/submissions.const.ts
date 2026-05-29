import { ColumnDef, FilterDef, TabConfig } from "../../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { SubmissionData } from "../../../pages/platform/pages/submissions-page/submission.model";
import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

const STATUS_LABELS: Record<string, string> = {
  'submitted': 'Submitted',
  'under-review': 'Under Review',
  'revision-requested': 'Revision',
  'accepted': 'Accepted',
  'rejected': 'Rejected',
  'withdrawn': 'Withdrawn',
};

export const SUBMISSIONS_STAT_CARDS: StatCardData[] = [
  { label: 'Total Submissions',   value: '11',  detail: 'All time',                  icon: 'submissions',     tone: 'total' },
  { label: 'Under Review',        value: '3',   detail: 'Awaiting decision',         icon: 'review-search',   tone: 'review' },
  { label: 'Revision Requested',  value: '2',   detail: 'Response needed',           icon: 'document-status', tone: 'revision' },
  { label: 'Accepted',            value: '4',   detail: 'Published or in press',     icon: 'check-circle',    tone: 'complete' },
  { label: 'Rejected',            value: '2',   detail: 'With reviewer feedback',    icon: 'document-simple', tone: 'danger' },
  { label: 'Avg. Review Time',    value: '38d', detail: 'Days to decision',          icon: 'document-pencil', tone: 'drafting' },
];

export const SUBMISSIONS_TABS: TabConfig[] = [
  { id: 'all', label: 'All Submissions' },
  { id: 'active',   label: 'Active',   filter: (row) => ['submitted', 'under-review', 'revision-requested'].includes((row as SubmissionData).status) },
  { id: 'accepted', label: 'Accepted', filter: (row) => (row as SubmissionData).status === 'accepted' },
  { id: 'rejected', label: 'Rejected', filter: (row) => (row as SubmissionData).status === 'rejected' },
];

export const SUBMISSIONS_FILTER_DEFS: FilterDef[] = [
  {
    id: 'status', label: 'Status',
    options: [
      { value: 'all', label: 'Status' },
      { value: 'submitted', label: 'Submitted' },
      { value: 'under-review', label: 'Under Review' },
      { value: 'revision-requested', label: 'Revision Requested' },
      { value: 'accepted', label: 'Accepted' },
      { value: 'rejected', label: 'Rejected' },
    ],
    filter: (row, value) => (row as SubmissionData).status === value,
  },
];

export const SUBMISSIONS_COLUMNS: ColumnDef[] = [
  {
    key: 'paper', header: 'Paper', width: '26%',
    cell: {
      type: 'text',
      primary: (row) => (row as SubmissionData).paperTitle,
      secondary: (row) => `Round ${(row as SubmissionData).round}`,
    },
  },
  {
    key: 'journal', header: 'Journal', width: '18%',
    cell: {
      type: 'text',
      primary: (row) => (row as SubmissionData).journalShort,
      secondary: (row) => `IF ${(row as SubmissionData).impactFactor.toFixed(1)}`,
    },
  },
  {
    key: 'status', header: 'Status',
    cell: {
      type: 'badge',
      label: (row) => STATUS_LABELS[(row as SubmissionData).status],
      tone: (row) => (row as SubmissionData).status,
    },
  },
  {
    key: 'submitted', header: 'Submitted',
    cell: {
      type: 'date',
      label: (row) => (row as SubmissionData).submittedDate,
      datetime: (row) => (row as SubmissionData).submittedDatetime,
    },
  },
  {
    key: 'review-time', header: 'Review Time',
    cell: {
      type: 'text',
      primary: (row) => {
        const d = (row as SubmissionData).reviewDays;
        return d ? `${d} days` : '—';
      },
    },
  },
  {
    key: 'decision', header: 'Decision Date',
    cell: {
      type: 'date',
      label: (row) => (row as SubmissionData).decisionDate ?? '—',
      datetime: (row) => (row as SubmissionData).decisionDatetime ?? '',
    },
  },
  {
    key: 'actions', header: 'Actions', srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
