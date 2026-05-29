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
  { label: 'Total Submissions', value: '11', detail: 'All time', icon: 'submissions', tone: 'total' },
  { label: 'Under Review', value: '3', detail: 'Awaiting decision', icon: 'review-search', tone: 'review' },
  { label: 'Revision Requested', value: '2', detail: 'Response needed', icon: 'document-status', tone: 'revision' },
  { label: 'Accepted', value: '4', detail: 'Published or in press', icon: 'check-circle', tone: 'complete' },
  { label: 'Rejected', value: '2', detail: 'With reviewer feedback', icon: 'document-simple', tone: 'danger' },
  { label: 'Avg. Review Time', value: '38d', detail: 'Days to decision', icon: 'document-pencil', tone: 'drafting' },
];

export const SUBMISSIONS_TABS: TabConfig[] = [
  { id: 'all', label: 'All Submissions' },
  { id: 'active', label: 'Active', filter: (row) => ['submitted', 'under-review', 'revision-requested'].includes((row as SubmissionData).status) },
  { id: 'accepted', label: 'Accepted', filter: (row) => (row as SubmissionData).status === 'accepted' },
  { id: 'rejected', label: 'Rejected', filter: (row) => (row as SubmissionData).status === 'rejected' },
];

export const SUBMISSIONS_FILTER_DEFS: FilterDef[] = [
  {
    id: 'status',
    label: 'Status',
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

export const SUBMISSIONS_DATA: SubmissionData[] = [
  {
    uid: 'sub-01', paperTitle: 'Synthetic Intelligence and Origination', paperUid: 'HJlk39na9e',
    journal: 'Nature Machine Intelligence', journalShort: 'Nature MI',
    submittedDate: 'May 15, 2026', submittedDatetime: '2026-05-15',
    status: 'under-review', reviewDays: 14, impactFactor: 25.9, round: 1,
  },
  {
    uid: 'sub-02', paperTitle: 'Deep Learning for Medical Imaging', paperUid: '9sdf8s7df',
    journal: 'IEEE Transactions on Medical Imaging', journalShort: 'IEEE TMI',
    submittedDate: 'Apr 28, 2026', submittedDatetime: '2026-04-28',
    status: 'revision-requested', reviewDays: 31, impactFactor: 11.0, round: 1,
    decisionDate: 'May 29, 2026', decisionDatetime: '2026-05-29',
  },
  {
    uid: 'sub-03', paperTitle: 'Robust Optimization for Supply Chains', paperUid: '5sdf8sdf5',
    journal: 'Operations Research', journalShort: 'OR',
    submittedDate: 'Mar 10, 2026', submittedDatetime: '2026-03-10',
    status: 'under-review', reviewDays: 80, impactFactor: 5.4, round: 1,
  },
  {
    uid: 'sub-04', paperTitle: 'Transformer Architectures: A Survey', paperUid: '1sdf8sdf1',
    journal: 'ACM Computing Surveys', journalShort: 'ACM CSUR',
    submittedDate: 'Jan 5, 2026', submittedDatetime: '2026-01-05',
    status: 'accepted', reviewDays: 58,
    decisionDate: 'Mar 4, 2026', decisionDatetime: '2026-03-04',
    impactFactor: 16.6, round: 2,
  },
  {
    uid: 'sub-05', paperTitle: 'Causal Inference in Observational Studies', paperUid: '8sdf8sdf0',
    journal: 'Journal of the American Statistical Association', journalShort: 'JASA',
    submittedDate: 'Nov 20, 2025', submittedDatetime: '2025-11-20',
    status: 'accepted', reviewDays: 62,
    decisionDate: 'Jan 21, 2026', decisionDatetime: '2026-01-21',
    impactFactor: 4.2, round: 1,
  },
  {
    uid: 'sub-06', paperTitle: 'Explainable AI: A Systematic Review', paperUid: '4sdf8sdf4',
    journal: 'Artificial Intelligence Review', journalShort: 'AIR',
    submittedDate: 'Sep 5, 2025', submittedDatetime: '2025-09-05',
    status: 'accepted', reviewDays: 45,
    decisionDate: 'Oct 20, 2025', decisionDatetime: '2025-10-20',
    impactFactor: 12.0, round: 1,
  },
  {
    uid: 'sub-07', paperTitle: 'Graph Neural Networks for Drug Discovery', paperUid: '3sdf8sdf3',
    journal: 'Journal of Chemical Information and Modeling', journalShort: 'J. Chem. Inf.',
    submittedDate: 'Apr 1, 2026', submittedDatetime: '2026-04-01',
    status: 'under-review', reviewDays: 58, impactFactor: 6.2, round: 1,
  },
  {
    uid: 'sub-08', paperTitle: 'Quantum Networks Survey', paperUid: '7sdf8sdf7',
    journal: 'npj Quantum Information', journalShort: 'npj QI',
    submittedDate: 'Feb 1, 2026', submittedDatetime: '2026-02-01',
    status: 'accepted', reviewDays: 38,
    decisionDate: 'Mar 11, 2026', decisionDatetime: '2026-03-11',
    impactFactor: 8.4, round: 1,
  },
  {
    uid: 'sub-09', paperTitle: 'Privacy-Preserving Machine Learning', paperUid: '9sdf8sdf0',
    journal: 'IEEE Security & Privacy', journalShort: 'IEEE S&P',
    submittedDate: 'Mar 22, 2026', submittedDatetime: '2026-03-22',
    status: 'revision-requested', reviewDays: 38,
    decisionDate: 'Apr 29, 2026', decisionDatetime: '2026-04-29',
    impactFactor: 4.1, round: 1,
  },
  {
    uid: 'sub-10', paperTitle: 'Reinforcement Learning for Robotics', paperUid: '0sdf8sdf0',
    journal: 'Science Robotics', journalShort: 'Sci. Rob.',
    submittedDate: 'Jan 18, 2026', submittedDatetime: '2026-01-18',
    status: 'rejected', reviewDays: 24,
    decisionDate: 'Feb 11, 2026', decisionDatetime: '2026-02-11',
    impactFactor: 26.1, round: 1,
  },
  {
    uid: 'sub-11', paperTitle: 'Ethical Implications of LLMs in Education', paperUid: '2sdf8sdf2',
    journal: 'Computers & Education', journalShort: 'C&E',
    submittedDate: 'Dec 1, 2025', submittedDatetime: '2025-12-01',
    status: 'rejected', reviewDays: 35,
    decisionDate: 'Jan 5, 2026', decisionDatetime: '2026-01-05',
    impactFactor: 12.0, round: 1,
  },
];

export const SUBMISSIONS_COLUMNS: ColumnDef[] = [
  {
    key: 'paper',
    header: 'Paper',
    width: '26%',
    cell: {
      type: 'text',
      primary: (row) => (row as SubmissionData).paperTitle,
      secondary: (row) => `Round ${(row as SubmissionData).round}`,
    },
  },
  {
    key: 'journal',
    header: 'Journal',
    width: '18%',
    cell: {
      type: 'text',
      primary: (row) => (row as SubmissionData).journalShort,
      secondary: (row) => `IF ${(row as SubmissionData).impactFactor.toFixed(1)}`,
    },
  },
  {
    key: 'status',
    header: 'Status',
    cell: {
      type: 'badge',
      label: (row) => STATUS_LABELS[(row as SubmissionData).status],
      tone: (row) => (row as SubmissionData).status,
    },
  },
  {
    key: 'submitted',
    header: 'Submitted',
    cell: {
      type: 'date',
      label: (row) => (row as SubmissionData).submittedDate,
      datetime: (row) => (row as SubmissionData).submittedDatetime,
    },
  },
  {
    key: 'review-time',
    header: 'Review Time',
    cell: {
      type: 'text',
      primary: (row) => {
        const d = (row as SubmissionData).reviewDays;
        return d ? `${d} days` : '—';
      },
    },
  },
  {
    key: 'decision',
    header: 'Decision Date',
    cell: {
      type: 'date',
      label: (row) => (row as SubmissionData).decisionDate ?? '—',
      datetime: (row) => (row as SubmissionData).decisionDatetime ?? '',
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
