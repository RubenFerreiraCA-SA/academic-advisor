import { ColumnDef, FilterDef, TabConfig } from "../../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { ReviewItem } from "../../../pages/platform/pages/review-queue-page/review-queue.model";
import { StatCardData } from "../../../pages/platform/shared-components/stat-card/stat-card";

const STATUS_LABELS: Record<string, string> = {
  'pending': 'Pending',
  'in-review': 'In Review',
  'awaiting-decision': 'Awaiting Decision',
  'approved': 'Approved',
  'rejected': 'Rejected',
};

const TYPE_LABELS: Record<string, string> = {
  'peer-review': 'Peer Review',
  'editorial': 'Editorial',
  'internal': 'Internal',
};

const PRIORITY_LABELS: Record<string, string> = {
  'urgent': 'Urgent',
  'high': 'High',
  'normal': 'Normal',
  'low': 'Low',
};

export const REVIEW_QUEUE_STAT_CARDS: StatCardData[] = [
  { label: 'Pending Review',     value: '5',   detail: 'Awaiting assignment',       icon: 'document-lines',  tone: 'total' },
  { label: 'In Review',          value: '3',   detail: 'Currently being reviewed',  icon: 'review-search',   tone: 'review' },
  { label: 'Awaiting Decision',  value: '2',   detail: 'Review complete',           icon: 'document-status', tone: 'revision' },
  { label: 'Approved',           value: '4',   detail: 'This quarter',              icon: 'check-circle',    tone: 'complete' },
  { label: 'Rejected',           value: '1',   detail: 'With feedback',             icon: 'document-simple', tone: 'danger' },
  { label: 'Avg. Turnaround',    value: '12d', detail: 'Days per review',           icon: 'document-pencil', tone: 'drafting' },
];

export const REVIEW_TABS: TabConfig[] = [
  { id: 'all', label: 'All' },
  { id: 'active',     label: 'Active',    filter: (row) => (row as ReviewItem).category === 'active' },
  { id: 'pending',    label: 'Pending',   filter: (row) => (row as ReviewItem).category === 'pending' },
  { id: 'completed',  label: 'Completed', filter: (row) => (row as ReviewItem).category === 'completed' },
];

export const REVIEW_FILTER_DEFS: FilterDef[] = [
  {
    id: 'type', label: 'Type',
    options: [
      { value: 'all', label: 'Type' },
      { value: 'peer-review', label: 'Peer Review' },
      { value: 'editorial', label: 'Editorial' },
      { value: 'internal', label: 'Internal' },
    ],
    filter: (row, value) => (row as ReviewItem).reviewType === value,
  },
  {
    id: 'priority', label: 'Priority',
    options: [
      { value: 'all', label: 'Priority' },
      { value: 'urgent', label: 'Urgent' },
      { value: 'high', label: 'High' },
      { value: 'normal', label: 'Normal' },
      { value: 'low', label: 'Low' },
    ],
    filter: (row, value) => (row as ReviewItem).priority === value,
  },
  {
    id: 'status', label: 'Status',
    options: [
      { value: 'all', label: 'Status' },
      { value: 'pending', label: 'Pending' },
      { value: 'in-review', label: 'In Review' },
      { value: 'awaiting-decision', label: 'Awaiting Decision' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
    ],
    filter: (row, value) => (row as ReviewItem).status === value,
  },
];

export const REVIEW_COLUMNS: ColumnDef[] = [
  {
    key: 'paper', header: 'Paper', width: '28%',
    cell: {
      type: 'text',
      primary: (row) => (row as ReviewItem).paperTitle,
      secondary: (row) => TYPE_LABELS[(row as ReviewItem).reviewType],
    },
  },
  {
    key: 'reviewer', header: 'Reviewer',
    cell: {
      type: 'avatar',
      initials: (row) => (row as ReviewItem).reviewer.initials,
      name: (row) => (row as ReviewItem).reviewer.name,
    },
  },
  {
    key: 'priority', header: 'Priority',
    cell: {
      type: 'badge',
      label: (row) => PRIORITY_LABELS[(row as ReviewItem).priority],
      tone: (row) => (row as ReviewItem).priority,
    },
  },
  {
    key: 'status', header: 'Status',
    cell: {
      type: 'badge',
      label: (row) => STATUS_LABELS[(row as ReviewItem).status],
      tone: (row) => (row as ReviewItem).status,
    },
  },
  {
    key: 'submitted', header: 'Submitted',
    cell: {
      type: 'date',
      label: (row) => (row as ReviewItem).submittedDate,
      datetime: (row) => (row as ReviewItem).submittedDatetime,
    },
  },
  {
    key: 'deadline', header: 'Deadline',
    cell: {
      type: 'date',
      label: (row) => (row as ReviewItem).deadline.label,
      datetime: (row) => (row as ReviewItem).deadline.datetime,
      labelTone: (row) => (row as ReviewItem).deadline.tone,
    },
  },
  {
    key: 'comments', header: 'Comments',
    cell: {
      type: 'text',
      primary: (row) => {
        const c = (row as ReviewItem).commentsCount;
        return c > 0 ? `${c}` : '—';
      },
    },
  },
  {
    key: 'actions', header: 'Actions', srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
