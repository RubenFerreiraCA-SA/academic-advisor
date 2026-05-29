import { SubmissionStatus } from '../../../pages/platform/pages/submissions-page/submission.model';

export interface SubmissionDoc {
  uid: string;
  /** Reference to papers collection */
  paperUid: string;
  journal: string;
  journalShort: string;
  submittedDate: string;
  submittedDatetime: string;
  status: SubmissionStatus;
  reviewDays: number;
  impactFactor: number;
  round: number;
  decisionDate?: string;
  decisionDatetime?: string;
}

export const SUBMISSIONS_DB: SubmissionDoc[] = [
  { uid: 'sub-01', paperUid: 'HJlk39na9e', journal: 'Nature Machine Intelligence',                        journalShort: 'Nature MI',     submittedDate: 'May 15, 2026', submittedDatetime: '2026-05-15', status: 'under-review',       reviewDays: 14, impactFactor: 25.9, round: 1 },
  { uid: 'sub-02', paperUid: '9sdf8s7df',  journal: 'IEEE Transactions on Medical Imaging',               journalShort: 'IEEE TMI',      submittedDate: 'Apr 28, 2026', submittedDatetime: '2026-04-28', status: 'revision-requested', reviewDays: 31, impactFactor: 11.0, round: 1, decisionDate: 'May 29, 2026', decisionDatetime: '2026-05-29' },
  { uid: 'sub-03', paperUid: '5sdf8sdf5',  journal: 'Operations Research',                                journalShort: 'OR',            submittedDate: 'Mar 10, 2026', submittedDatetime: '2026-03-10', status: 'under-review',       reviewDays: 80, impactFactor: 5.4,  round: 1 },
  { uid: 'sub-04', paperUid: '1sdf8sdf1',  journal: 'ACM Computing Surveys',                              journalShort: 'ACM CSUR',      submittedDate: 'Jan 5, 2026',  submittedDatetime: '2026-01-05', status: 'accepted',           reviewDays: 58, impactFactor: 16.6, round: 2, decisionDate: 'Mar 4, 2026',  decisionDatetime: '2026-03-04' },
  { uid: 'sub-05', paperUid: '8sdf8sdf0',  journal: 'Journal of the American Statistical Association',   journalShort: 'JASA',          submittedDate: 'Nov 20, 2025', submittedDatetime: '2025-11-20', status: 'accepted',           reviewDays: 62, impactFactor: 4.2,  round: 1, decisionDate: 'Jan 21, 2026', decisionDatetime: '2026-01-21' },
  { uid: 'sub-06', paperUid: '4sdf8sdf4',  journal: 'Artificial Intelligence Review',                    journalShort: 'AIR',           submittedDate: 'Sep 5, 2025',  submittedDatetime: '2025-09-05', status: 'accepted',           reviewDays: 45, impactFactor: 12.0, round: 1, decisionDate: 'Oct 20, 2025', decisionDatetime: '2025-10-20' },
  { uid: 'sub-07', paperUid: '3sdf8sdf3',  journal: 'Journal of Chemical Information and Modeling',      journalShort: 'J. Chem. Inf.', submittedDate: 'Apr 1, 2026',  submittedDatetime: '2026-04-01', status: 'under-review',       reviewDays: 58, impactFactor: 6.2,  round: 1 },
  { uid: 'sub-08', paperUid: '7sdf8sdf7',  journal: 'npj Quantum Information',                           journalShort: 'npj QI',        submittedDate: 'Feb 1, 2026',  submittedDatetime: '2026-02-01', status: 'accepted',           reviewDays: 38, impactFactor: 8.4,  round: 1, decisionDate: 'Mar 11, 2026', decisionDatetime: '2026-03-11' },
  { uid: 'sub-09', paperUid: '9sdf8sdf0',  journal: 'IEEE Security & Privacy',                           journalShort: 'IEEE S&P',      submittedDate: 'Mar 22, 2026', submittedDatetime: '2026-03-22', status: 'revision-requested', reviewDays: 38, impactFactor: 4.1,  round: 1, decisionDate: 'Apr 29, 2026', decisionDatetime: '2026-04-29' },
  { uid: 'sub-10', paperUid: '0sdf8sdf0',  journal: 'Science Robotics',                                  journalShort: 'Sci. Rob.',     submittedDate: 'Jan 18, 2026', submittedDatetime: '2026-01-18', status: 'rejected',           reviewDays: 24, impactFactor: 26.1, round: 1, decisionDate: 'Feb 11, 2026', decisionDatetime: '2026-02-11' },
  { uid: 'sub-11', paperUid: '2sdf8sdf2',  journal: 'Computers & Education',                             journalShort: 'C&E',           submittedDate: 'Dec 1, 2025',  submittedDatetime: '2025-12-01', status: 'rejected',           reviewDays: 35, impactFactor: 12.0, round: 1, decisionDate: 'Jan 5, 2026',  decisionDatetime: '2026-01-05' },
];
