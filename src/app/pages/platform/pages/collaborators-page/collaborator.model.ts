export type CollaboratorRole = 'co-author' | 'reviewer' | 'advisor' | 'editor';
export type CollaboratorStatus = 'active' | 'pending' | 'inactive';

export interface CollaboratorData {
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
