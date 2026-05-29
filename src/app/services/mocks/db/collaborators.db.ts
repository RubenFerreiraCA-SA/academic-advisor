import { CollaboratorRole, CollaboratorStatus } from '../../../pages/platform/pages/collaborators-page/collaborator.model';

export interface CollaboratorDoc {
  uid: string;
  name: string;
  initials: string;
  role: CollaboratorRole;
  institution: string;
  department: string;
  email: string;
  papersCount: number;
  lastActive: string;
  lastActiveDatetime: string;
  status: CollaboratorStatus;
  avatarTone: 1 | 2 | 3 | 4;
}

export const COLLABORATORS_DB: CollaboratorDoc[] = [
  { uid: 'col-01', name: 'Dr. Alex Lambert',      initials: 'AL', role: 'co-author', institution: 'MIT',                          department: 'CSAIL',                         email: 'alambert@mit.edu',       papersCount: 4, lastActive: 'Today',       lastActiveDatetime: '2026-05-29', status: 'active',   avatarTone: 1 },
  { uid: 'col-02', name: 'Sarah Chen',             initials: 'SC', role: 'co-author', institution: 'Stanford University',          department: 'Computer Science',              email: 'schen@stanford.edu',     papersCount: 3, lastActive: 'Yesterday',   lastActiveDatetime: '2026-05-28', status: 'active',   avatarTone: 2 },
  { uid: 'col-03', name: 'Prof. Maria Kowalski',   initials: 'MK', role: 'advisor',   institution: 'ETH Zürich',                   department: 'D-INFK',                        email: 'mkowalski@ethz.ch',      papersCount: 6, lastActive: '2 days ago',  lastActiveDatetime: '2026-05-27', status: 'active',   avatarTone: 3 },
  { uid: 'col-04', name: 'Jamie Liu',              initials: 'JL', role: 'co-author', institution: 'Carnegie Mellon University',   department: 'Machine Learning',              email: 'jliu@cmu.edu',           papersCount: 2, lastActive: '3 days ago',  lastActiveDatetime: '2026-05-26', status: 'active',   avatarTone: 4 },
  { uid: 'col-05', name: 'Dr. Thomas Schneider',   initials: 'TS', role: 'reviewer',  institution: 'TU Berlin',                    department: 'Neural Information Processing', email: 'tschneider@tu-berlin.de', papersCount: 1, lastActive: '4 days ago', lastActiveDatetime: '2026-05-25', status: 'active',   avatarTone: 1 },
  { uid: 'col-06', name: 'Dr. Elena Vasquez',      initials: 'EV', role: 'co-author', institution: 'Oxford University',            department: 'Environmental Change Institute', email: 'evasquez@oxford.ac.uk', papersCount: 1, lastActive: 'May 22',      lastActiveDatetime: '2026-05-22', status: 'active',   avatarTone: 2 },
  { uid: 'col-07', name: 'Quinn Carver',           initials: 'QC', role: 'co-author', institution: 'Caltech',                      department: 'Quantum Information Science',   email: 'qcarver@caltech.edu',    papersCount: 1, lastActive: 'May 16',      lastActiveDatetime: '2026-05-16', status: 'active',   avatarTone: 3 },
  { uid: 'col-08', name: 'Prof. Robin Lawson',     initials: 'RL', role: 'advisor',   institution: 'University of Cambridge',      department: 'Engineering',                   email: 'rlawson@cam.ac.uk',      papersCount: 2, lastActive: 'May 20',      lastActiveDatetime: '2026-05-20', status: 'active',   avatarTone: 4 },
  { uid: 'col-09', name: 'Dr. Xander Ames',        initials: 'XA', role: 'reviewer',  institution: 'UC Berkeley',                  department: 'BAIR',                          email: 'xames@berkeley.edu',     papersCount: 1, lastActive: 'Apr 20',      lastActiveDatetime: '2026-04-20', status: 'inactive', avatarTone: 1 },
  { uid: 'col-10', name: 'Dr. Clara Ibáñez',       initials: 'CI', role: 'reviewer',  institution: 'EPFL',                         department: 'Statistics',                    email: 'cibanez@epfl.ch',        papersCount: 1, lastActive: 'Feb 14',      lastActiveDatetime: '2026-02-14', status: 'inactive', avatarTone: 2 },
  { uid: 'col-11', name: 'Dr. Nina Petrov',        initials: 'NP', role: 'editor',    institution: 'Nature Publishing Group',      department: 'Editorial',                     email: 'npetrov@nature.com',     papersCount: 0, lastActive: 'Pending',     lastActiveDatetime: '',           status: 'pending',  avatarTone: 3 },
  { uid: 'col-12', name: 'Dr. Sam Okafor',         initials: 'SO', role: 'co-author', institution: 'Johns Hopkins University',      department: 'Biomedical Engineering',        email: 'sokafor@jhu.edu',        papersCount: 0, lastActive: 'Pending',     lastActiveDatetime: '',           status: 'pending',  avatarTone: 4 },
];
