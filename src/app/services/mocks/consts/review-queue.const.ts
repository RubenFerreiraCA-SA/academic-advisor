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
  { label: 'Pending Review', value: '5', detail: 'Awaiting assignment', icon: 'document-lines', tone: 'total' },
  { label: 'In Review', value: '3', detail: 'Currently being reviewed', icon: 'review-search', tone: 'review' },
  { label: 'Awaiting Decision', value: '2', detail: 'Review complete', icon: 'document-status', tone: 'revision' },
  { label: 'Approved', value: '4', detail: 'This quarter', icon: 'check-circle', tone: 'complete' },
  { label: 'Rejected', value: '1', detail: 'With feedback', icon: 'document-simple', tone: 'danger' },
  { label: 'Avg. Turnaround', value: '12d', detail: 'Days per review', icon: 'document-pencil', tone: 'drafting' },
];

export const REVIEW_TABS: TabConfig[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active', filter: (row) => (row as ReviewItem).category === 'active' },
  { id: 'pending', label: 'Pending', filter: (row) => (row as ReviewItem).category === 'pending' },
  { id: 'completed', label: 'Completed', filter: (row) => (row as ReviewItem).category === 'completed' },
];

export const REVIEW_FILTER_DEFS: FilterDef[] = [
  {
    id: 'type',
    label: 'Type',
    options: [
      { value: 'all', label: 'Type' },
      { value: 'peer-review', label: 'Peer Review' },
      { value: 'editorial', label: 'Editorial' },
      { value: 'internal', label: 'Internal' },
    ],
    filter: (row, value) => (row as ReviewItem).reviewType === value,
  },
  {
    id: 'priority',
    label: 'Priority',
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
    id: 'status',
    label: 'Status',
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

export const REVIEW_DATA: ReviewItem[] = [
  {
    uid: 'rv-01', paperTitle: 'Synthetic Intelligence and Origination', paperUid: 'HJlk39na9e',
    reviewType: 'peer-review', reviewer: { initials: 'AL', name: 'Alex L.' },
    priority: 'urgent', status: 'in-review',
    submittedDate: 'May 22, 2026', submittedDatetime: '2026-05-22',
    deadline: { date: 'May 30, 2026', datetime: '2026-05-30', label: 'Tomorrow', tone: 'danger' },
    commentsCount: 6, category: 'active',
  },
  {
    uid: 'rv-02', paperTitle: 'Deep Learning for Medical Imaging', paperUid: '9sdf8s7df',
    reviewType: 'editorial', reviewer: { initials: 'MK', name: 'Maria K.' },
    priority: 'high', status: 'in-review',
    submittedDate: 'May 20, 2026', submittedDatetime: '2026-05-20',
    deadline: { date: 'Jun 2, 2026', datetime: '2026-06-02', label: 'Jun 2' },
    commentsCount: 3, category: 'active',
  },
  {
    uid: 'rv-03', paperTitle: 'Graph Neural Networks for Drug Discovery', paperUid: '3sdf8sdf3',
    reviewType: 'peer-review', reviewer: { initials: 'TS', name: 'Tom S.' },
    priority: 'high', status: 'awaiting-decision',
    submittedDate: 'May 12, 2026', submittedDatetime: '2026-05-12',
    deadline: { date: 'Jun 5, 2026', datetime: '2026-06-05', label: 'Jun 5' },
    commentsCount: 11, category: 'active',
  },
  {
    uid: 'rv-04', paperTitle: 'Federated Learning in Healthcare', paperUid: '6sdf8sdf6',
    reviewType: 'internal', reviewer: { initials: 'RF', name: 'Ruben F.' },
    priority: 'normal', status: 'awaiting-decision',
    submittedDate: 'May 18, 2026', submittedDatetime: '2026-05-18',
    deadline: { date: 'Jun 8, 2026', datetime: '2026-06-08', label: 'Jun 8' },
    commentsCount: 4, category: 'active',
  },
  {
    uid: 'rv-05', paperTitle: 'Multi-Modal Learning for Vision-Language', paperUid: '7sdf8sdf0',
    reviewType: 'peer-review', reviewer: { initials: 'SC', name: 'Sarah C.' },
    priority: 'normal', status: 'pending',
    submittedDate: 'May 27, 2026', submittedDatetime: '2026-05-27',
    deadline: { date: 'Jun 10, 2026', datetime: '2026-06-10', label: 'Jun 10' },
    commentsCount: 0, category: 'pending',
  },
  {
    uid: 'rv-06', paperTitle: 'Privacy-Preserving Machine Learning', paperUid: '9sdf8sdf0',
    reviewType: 'editorial', reviewer: { initials: 'JL', name: 'Jamie L.' },
    priority: 'low', status: 'pending',
    submittedDate: 'May 28, 2026', submittedDatetime: '2026-05-28',
    deadline: { date: 'Jun 14, 2026', datetime: '2026-06-14', label: 'Jun 14' },
    commentsCount: 0, category: 'pending',
  },
  {
    uid: 'rv-07', paperTitle: 'Climate Change Policy Review', paperUid: '8sdf7sdf8',
    reviewType: 'peer-review', reviewer: { initials: 'EV', name: 'Elena V.' },
    priority: 'low', status: 'pending',
    submittedDate: 'May 29, 2026', submittedDatetime: '2026-05-29',
    deadline: { date: 'Jun 18, 2026', datetime: '2026-06-18', label: 'Jun 18' },
    commentsCount: 0, category: 'pending',
  },
  {
    uid: 'rv-08', paperTitle: 'Transformer Architectures: A Survey', paperUid: '1sdf8sdf1',
    reviewType: 'peer-review', reviewer: { initials: 'MK', name: 'Maria K.' },
    priority: 'normal', status: 'approved',
    submittedDate: 'Apr 10, 2026', submittedDatetime: '2026-04-10',
    deadline: { date: 'May 5, 2026', datetime: '2026-05-05', label: 'May 5' },
    commentsCount: 8, category: 'completed',
  },
  {
    uid: 'rv-09', paperTitle: 'Causal Inference in Observational Studies', paperUid: '8sdf8sdf0',
    reviewType: 'editorial', reviewer: { initials: 'CI', name: 'Clara I.' },
    priority: 'high', status: 'approved',
    submittedDate: 'Mar 15, 2026', submittedDatetime: '2026-03-15',
    deadline: { date: 'Apr 10, 2026', datetime: '2026-04-10', label: 'Apr 10' },
    commentsCount: 5, category: 'completed',
  },
  {
    uid: 'rv-10', paperTitle: 'Quantum Networks Survey', paperUid: '7sdf8sdf7',
    reviewType: 'peer-review', reviewer: { initials: 'QC', name: 'Quinn C.' },
    priority: 'normal', status: 'approved',
    submittedDate: 'Mar 2, 2026', submittedDatetime: '2026-03-02',
    deadline: { date: 'Mar 28, 2026', datetime: '2026-03-28', label: 'Mar 28' },
    commentsCount: 7, category: 'completed',
  },
  {
    uid: 'rv-11', paperTitle: 'Explainable AI: A Systematic Review', paperUid: '4sdf8sdf4',
    reviewType: 'peer-review', reviewer: { initials: 'XA', name: 'Xander A.' },
    priority: 'normal', status: 'approved',
    submittedDate: 'Feb 14, 2026', submittedDatetime: '2026-02-14',
    deadline: { date: 'Mar 12, 2026', datetime: '2026-03-12', label: 'Mar 12' },
    commentsCount: 9, category: 'completed',
  },
  {
    uid: 'rv-12', paperTitle: 'Reinforcement Learning for Robotics', paperUid: '0sdf8sdf0',
    reviewType: 'internal', reviewer: { initials: 'RL', name: 'Robin L.' },
    priority: 'low', status: 'rejected',
    submittedDate: 'Apr 5, 2026', submittedDatetime: '2026-04-05',
    deadline: { date: 'May 1, 2026', datetime: '2026-05-01', label: 'May 1' },
    commentsCount: 14, category: 'completed',
  },
];

export const REVIEW_COLUMNS: ColumnDef[] = [
  {
    key: 'paper',
    header: 'Paper',
    width: '28%',
    cell: {
      type: 'text',
      primary: (row) => (row as ReviewItem).paperTitle,
      secondary: (row) => TYPE_LABELS[(row as ReviewItem).reviewType],
    },
  },
  {
    key: 'reviewer',
    header: 'Reviewer',
    cell: {
      type: 'avatar',
      initials: (row) => (row as ReviewItem).reviewer.initials,
      name: (row) => (row as ReviewItem).reviewer.name,
    },
  },
  {
    key: 'priority',
    header: 'Priority',
    cell: {
      type: 'badge',
      label: (row) => PRIORITY_LABELS[(row as ReviewItem).priority],
      tone: (row) => (row as ReviewItem).priority,
    },
  },
  {
    key: 'status',
    header: 'Status',
    cell: {
      type: 'badge',
      label: (row) => STATUS_LABELS[(row as ReviewItem).status],
      tone: (row) => (row as ReviewItem).status,
    },
  },
  {
    key: 'submitted',
    header: 'Submitted',
    cell: {
      type: 'date',
      label: (row) => (row as ReviewItem).submittedDate,
      datetime: (row) => (row as ReviewItem).submittedDatetime,
    },
  },
  {
    key: 'deadline',
    header: 'Deadline',
    cell: {
      type: 'date',
      label: (row) => (row as ReviewItem).deadline.label,
      datetime: (row) => (row as ReviewItem).deadline.datetime,
      labelTone: (row) => (row as ReviewItem).deadline.tone,
    },
  },
  {
    key: 'comments',
    header: 'Comments',
    cell: {
      type: 'text',
      primary: (row) => {
        const c = (row as ReviewItem).commentsCount;
        return c > 0 ? `${c}` : '—';
      },
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
