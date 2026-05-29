import { ReviewCategory, ReviewPriority, ReviewStatus, ReviewType } from '../../../pages/platform/pages/review-queue-page/review-queue.model';

export interface ReviewQueueDoc {
  uid: string;
  /** Reference to papers collection */
  paperUid: string;
  reviewType: ReviewType;
  /** Reference to collaborators collection, or 'self' for the logged-in user */
  reviewerId: string;
  priority: ReviewPriority;
  status: ReviewStatus;
  submittedDate: string;
  submittedDatetime: string;
  deadlineDate: string;
  deadlineDatetime: string;
  deadlineLabel: string;
  deadlineTone?: string;
  commentsCount: number;
  category: ReviewCategory;
}

export const REVIEW_QUEUE_DB: ReviewQueueDoc[] = [
  { uid: 'rv-01', paperUid: 'HJlk39na9e', reviewType: 'peer-review', reviewerId: 'col-01', priority: 'urgent', status: 'in-review',         submittedDate: 'May 22, 2026', submittedDatetime: '2026-05-22', deadlineDate: 'May 30, 2026', deadlineDatetime: '2026-05-30', deadlineLabel: 'Tomorrow', deadlineTone: 'danger', commentsCount: 6,  category: 'active' },
  { uid: 'rv-02', paperUid: '9sdf8s7df',  reviewType: 'editorial',   reviewerId: 'col-03', priority: 'high',   status: 'in-review',         submittedDate: 'May 20, 2026', submittedDatetime: '2026-05-20', deadlineDate: 'Jun 2, 2026',  deadlineDatetime: '2026-06-02', deadlineLabel: 'Jun 2',                    commentsCount: 3,  category: 'active' },
  { uid: 'rv-03', paperUid: '3sdf8sdf3',  reviewType: 'peer-review', reviewerId: 'col-05', priority: 'high',   status: 'awaiting-decision', submittedDate: 'May 12, 2026', submittedDatetime: '2026-05-12', deadlineDate: 'Jun 5, 2026',  deadlineDatetime: '2026-06-05', deadlineLabel: 'Jun 5',                    commentsCount: 11, category: 'active' },
  { uid: 'rv-04', paperUid: '6sdf8sdf6',  reviewType: 'internal',    reviewerId: 'self',   priority: 'normal', status: 'awaiting-decision', submittedDate: 'May 18, 2026', submittedDatetime: '2026-05-18', deadlineDate: 'Jun 8, 2026',  deadlineDatetime: '2026-06-08', deadlineLabel: 'Jun 8',                    commentsCount: 4,  category: 'active' },
  { uid: 'rv-05', paperUid: '7sdf8sdf0',  reviewType: 'peer-review', reviewerId: 'col-02', priority: 'normal', status: 'pending',           submittedDate: 'May 27, 2026', submittedDatetime: '2026-05-27', deadlineDate: 'Jun 10, 2026', deadlineDatetime: '2026-06-10', deadlineLabel: 'Jun 10',                   commentsCount: 0,  category: 'pending' },
  { uid: 'rv-06', paperUid: '9sdf8sdf0',  reviewType: 'editorial',   reviewerId: 'col-04', priority: 'low',    status: 'pending',           submittedDate: 'May 28, 2026', submittedDatetime: '2026-05-28', deadlineDate: 'Jun 14, 2026', deadlineDatetime: '2026-06-14', deadlineLabel: 'Jun 14',                   commentsCount: 0,  category: 'pending' },
  { uid: 'rv-07', paperUid: '8sdf7sdf8',  reviewType: 'peer-review', reviewerId: 'col-06', priority: 'low',    status: 'pending',           submittedDate: 'May 29, 2026', submittedDatetime: '2026-05-29', deadlineDate: 'Jun 18, 2026', deadlineDatetime: '2026-06-18', deadlineLabel: 'Jun 18',                   commentsCount: 0,  category: 'pending' },
  { uid: 'rv-08', paperUid: '1sdf8sdf1',  reviewType: 'peer-review', reviewerId: 'col-03', priority: 'normal', status: 'approved',          submittedDate: 'Apr 10, 2026', submittedDatetime: '2026-04-10', deadlineDate: 'May 5, 2026',  deadlineDatetime: '2026-05-05', deadlineLabel: 'May 5',                    commentsCount: 8,  category: 'completed' },
  { uid: 'rv-09', paperUid: '8sdf8sdf0',  reviewType: 'editorial',   reviewerId: 'col-10', priority: 'high',   status: 'approved',          submittedDate: 'Mar 15, 2026', submittedDatetime: '2026-03-15', deadlineDate: 'Apr 10, 2026', deadlineDatetime: '2026-04-10', deadlineLabel: 'Apr 10',                   commentsCount: 5,  category: 'completed' },
  { uid: 'rv-10', paperUid: '7sdf8sdf7',  reviewType: 'peer-review', reviewerId: 'col-07', priority: 'normal', status: 'approved',          submittedDate: 'Mar 2, 2026',  submittedDatetime: '2026-03-02', deadlineDate: 'Mar 28, 2026', deadlineDatetime: '2026-03-28', deadlineLabel: 'Mar 28',                   commentsCount: 7,  category: 'completed' },
  { uid: 'rv-11', paperUid: '4sdf8sdf4',  reviewType: 'peer-review', reviewerId: 'col-09', priority: 'normal', status: 'approved',          submittedDate: 'Feb 14, 2026', submittedDatetime: '2026-02-14', deadlineDate: 'Mar 12, 2026', deadlineDatetime: '2026-03-12', deadlineLabel: 'Mar 12',                   commentsCount: 9,  category: 'completed' },
  { uid: 'rv-12', paperUid: '0sdf8sdf0',  reviewType: 'internal',    reviewerId: 'col-08', priority: 'low',    status: 'rejected',          submittedDate: 'Apr 5, 2026',  submittedDatetime: '2026-04-05', deadlineDate: 'May 1, 2026',  deadlineDatetime: '2026-05-01', deadlineLabel: 'May 1',                    commentsCount: 14, category: 'completed' },
];
