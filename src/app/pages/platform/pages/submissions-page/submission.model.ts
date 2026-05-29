export type SubmissionStatus =
  | 'submitted'
  | 'under-review'
  | 'revision-requested'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export interface SubmissionData {
  uid: string;
  paperTitle: string;
  paperUid: string;
  journal: string;
  journalShort: string;
  submittedDate: string;
  submittedDatetime: string;
  status: SubmissionStatus;
  reviewDays?: number;
  decisionDate?: string;
  decisionDatetime?: string;
  impactFactor: number;
  round: number;
}
