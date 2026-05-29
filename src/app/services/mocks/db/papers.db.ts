import { PaperStage } from '../../../pages/platform/pages/papers-page/papers-model';

export interface PaperDoc {
  uid: string;
  title: string;
  topic: string;
  featured?: boolean;
  category: 'mine' | 'shared' | 'archived';
  stage: PaperStage;
  progress: number;
  progressTone?: string;
  deadlineDate: string;
  deadlineDatetime: string;
  deadlineStatus: string;
  deadlineTone?: string;
  /** IDs of collaborators tracked in the collaborators collection */
  collaboratorIds: string[];
  /** Count of collaborators not tracked in this system (external/past) */
  externalCollaboratorCount: number;
  updatedAt: string;
  updatedAtLabel: string;
  concept?: string;
  outline?: string[];
}

export const PAPERS_DB: PaperDoc[] = [
  // ── Active / In-progress papers spanning all 12 workflow stages ─────────────
  {
    uid: '0sdf8sdf0', title: 'Reinforcement Learning for Robotics',
    topic: 'AI · Robotics · RL', category: 'mine',
    stage: 'concept', progress: 18, progressTone: 'green',
    deadlineDate: 'Sep 10, 2024', deadlineDatetime: '2024-09-10', deadlineStatus: '83 days left',
    collaboratorIds: ['col-08'], externalCollaboratorCount: 0,
    updatedAt: '2024-05-20T16:15', updatedAtLabel: 'May 20, 4:15 PM',
  },
  {
    uid: '7sdf8sdf7', title: 'Quantum Networks Survey',
    topic: 'Quantum · Networks · Security', category: 'shared',
    stage: 'positioning', progress: 28, progressTone: 'green',
    deadlineDate: 'Jul 1, 2024', deadlineDatetime: '2024-07-01', deadlineStatus: '42 days left',
    collaboratorIds: ['col-07', 'col-02', 'col-05'], externalCollaboratorCount: 2,
    updatedAt: '2024-05-16T16:23', updatedAtLabel: 'May 16, 4:23 PM',
  },
  {
    uid: '7sdf8sdf0', title: 'Multi-Modal Learning for Vision-Language',
    topic: 'AI · Vision · NLP', category: 'shared',
    stage: 'blueprint', progress: 32, progressTone: 'green',
    deadlineDate: 'Jul 22, 2024', deadlineDatetime: '2024-07-22', deadlineStatus: '33 days left',
    collaboratorIds: ['col-01'], externalCollaboratorCount: 2,
    updatedAt: '2024-05-22T08:45', updatedAtLabel: 'May 22, 8:45 AM',
  },
  {
    uid: '6sdf8sdf6', title: 'Federated Learning in Healthcare',
    topic: 'AI · Privacy · Healthcare', category: 'shared',
    stage: 'drafting', progress: 35, progressTone: 'blue',
    deadlineDate: 'Jun 18, 2024', deadlineDatetime: '2024-06-18', deadlineStatus: '31 days left',
    collaboratorIds: ['col-02', 'col-04', 'col-03'], externalCollaboratorCount: 1,
    updatedAt: '2024-05-18T13:10', updatedAtLabel: 'May 18, 1:10 PM',
  },
  {
    uid: '2sdf8sdf2', title: 'Ethical Implications of LLMs in Education',
    topic: 'AI · Ethics · Education', category: 'shared',
    stage: 'drafting', progress: 55, progressTone: 'blue',
    deadlineDate: 'Aug 1, 2024', deadlineDatetime: '2024-08-01', deadlineStatus: '43 days left',
    collaboratorIds: ['col-03'], externalCollaboratorCount: 2,
    updatedAt: '2024-05-24T09:30', updatedAtLabel: 'May 24, 9:30 AM',
  },
  {
    uid: '9sdf8s7df', title: 'Deep Learning for Medical Imaging',
    topic: 'AI · Medical Imaging · CNN', category: 'mine',
    stage: 'drafting', progress: 65, progressTone: 'blue',
    deadlineDate: 'May 31, 2024', deadlineDatetime: '2024-05-31', deadlineStatus: '8 days left', deadlineTone: 'danger',
    collaboratorIds: ['col-01', 'col-04', 'col-03'], externalCollaboratorCount: 3,
    updatedAt: '2024-05-22T15:15', updatedAtLabel: 'May 22, 3:15 PM',
  },
  {
    uid: '9sdf8sdf0', title: 'Privacy-Preserving Machine Learning',
    topic: 'AI · Privacy · Cryptography', category: 'shared',
    stage: 'peer-review', progress: 70,
    deadlineDate: 'Jun 30, 2024', deadlineDatetime: '2024-06-30', deadlineStatus: '7 days left', deadlineTone: 'danger',
    collaboratorIds: [], externalCollaboratorCount: 4,
    updatedAt: '2024-05-23T14:00', updatedAtLabel: 'May 23, 2:00 PM',
  },
  {
    uid: '8sdf7sdf8', title: 'Climate Change Policy Review',
    topic: 'Climate · Policy · Environment', category: 'shared',
    stage: 'game-plan', progress: 52,
    deadlineDate: 'Jun 10, 2024', deadlineDatetime: '2024-06-10', deadlineStatus: '21 days left',
    collaboratorIds: ['col-06', 'col-02'], externalCollaboratorCount: 1,
    updatedAt: '2024-05-21T09:05', updatedAtLabel: 'May 21, 9:05 AM',
  },
  {
    uid: 'HJlk39na9e', title: 'Synthetic Intelligence and Origination', featured: true,
    topic: 'AI · Creativity · Cognition', category: 'mine',
    stage: 'revision', progress: 73,
    deadlineDate: 'Jun 28, 2024', deadlineDatetime: '2024-06-28', deadlineStatus: '5 days left', deadlineTone: 'danger',
    collaboratorIds: ['col-01', 'col-03'], externalCollaboratorCount: 2,
    updatedAt: '2024-05-23T10:42', updatedAtLabel: 'May 23, 10:42 AM',
  },
  {
    uid: '3sdf8sdf3', title: 'Graph Neural Networks for Drug Discovery',
    topic: 'AI · Drug Discovery · GNN', category: 'mine',
    stage: 'submission-ready', progress: 88,
    deadlineDate: 'Jul 15, 2024', deadlineDatetime: '2024-07-15', deadlineStatus: '26 days left',
    collaboratorIds: ['col-01', 'col-03'], externalCollaboratorCount: 1,
    updatedAt: '2024-05-25T11:00', updatedAtLabel: 'May 25, 11:00 AM',
  },
  {
    uid: '5sdf8sdf5', title: 'Robust Optimization for Supply Chains',
    topic: 'Operations · Optimization', category: 'mine',
    stage: 'submitted', progress: 100, progressTone: 'cyan',
    deadlineDate: 'May 10, 2024', deadlineDatetime: '2024-05-10', deadlineStatus: 'Submitted', deadlineTone: 'success',
    collaboratorIds: ['col-08'], externalCollaboratorCount: 4,
    updatedAt: '2024-05-10T10:20', updatedAtLabel: 'May 10, 10:20 AM',
  },
  // ── Archived / completed papers ─────────────────────────────────────────────
  {
    uid: '8sdf8sdf0', title: 'Causal Inference in Observational Studies',
    topic: 'Statistics · Causal AI', category: 'archived',
    stage: 'external-review', progress: 100, progressTone: 'cyan',
    deadlineDate: 'Feb 14, 2024', deadlineDatetime: '2024-02-14', deadlineStatus: 'Under Review',
    collaboratorIds: ['col-10'], externalCollaboratorCount: 4,
    updatedAt: '2024-02-14T10:00', updatedAtLabel: 'Feb 14, 10:00 AM',
  },
  {
    uid: '4sdf8sdf4', title: 'Explainable AI: A Systematic Review',
    topic: 'AI · Explainability · Survey', category: 'archived',
    stage: 'revise-resubmit', progress: 100,
    deadlineDate: 'Apr 20, 2024', deadlineDatetime: '2024-04-20', deadlineStatus: 'Resubmitted',
    collaboratorIds: ['col-09'], externalCollaboratorCount: 5,
    updatedAt: '2024-04-20T14:45', updatedAtLabel: 'Apr 20, 2:45 PM',
  },
  {
    uid: '1sdf8sdf1', title: 'Transformer Architectures: A Survey',
    topic: 'AI · NLP · Transformers', category: 'archived',
    stage: 'published', progress: 100, progressTone: 'green',
    deadlineDate: 'Mar 5, 2024', deadlineDatetime: '2024-03-05', deadlineStatus: 'Published', deadlineTone: 'success',
    collaboratorIds: [], externalCollaboratorCount: 5,
    updatedAt: '2024-03-05T15:00', updatedAtLabel: 'Mar 5, 3:00 PM',
  },
];
