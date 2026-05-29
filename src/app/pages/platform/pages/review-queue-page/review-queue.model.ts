export type ReviewType = 'peer-review' | 'editorial' | 'internal';
export type ReviewStatus = 'pending' | 'in-review' | 'awaiting-decision' | 'approved' | 'rejected';
export type ReviewPriority = 'urgent' | 'high' | 'normal' | 'low';
export type ReviewCategory = 'active' | 'pending' | 'completed';

export interface ReviewItem {
  uid: string;
  paperTitle: string;
  paperUid: string;
  reviewType: ReviewType;
  reviewer: { initials: string; name: string };
  priority: ReviewPriority;
  status: ReviewStatus;
  submittedDate: string;
  submittedDatetime: string;
  deadline: { date: string; datetime: string; label: string; tone?: 'danger' | 'warning' };
  commentsCount: number;
  category: ReviewCategory;
}
