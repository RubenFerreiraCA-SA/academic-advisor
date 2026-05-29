import { TaskCategory, TaskPriority, TaskStatus } from '../../../pages/platform/pages/tasks-page/task.model';

export interface TaskDoc {
  uid: string;
  title: string;
  commentsCount: number;
  /** Reference to papers collection */
  paperUid: string;
  priority: TaskPriority;
  status: TaskStatus;
  /** Reference to collaborators collection, or 'self' for the logged-in user */
  assigneeId: string;
  dueDateAt: string;
  dueDateLabel: string;
  dueDateTone?: string;
  progress: number;
  updatedAt: string;
  updatedAtLabel: string;
  category: TaskCategory;
}

export const TASKS_DB: TaskDoc[] = [
  { uid: 'task-01', title: 'Write introduction section',            commentsCount: 3,  paperUid: 'HJlk39na9e', priority: 'high',   status: 'in-progress', assigneeId: 'self',   dueDateAt: '2026-05-29', dueDateLabel: 'Today',    dueDateTone: 'danger', progress: 65,  updatedAt: '2026-05-29T10:00', updatedAtLabel: '2 hours ago',         category: 'mine' },
  { uid: 'task-02', title: 'Incorporate reviewer feedback',         commentsCount: 7,  paperUid: '9sdf8s7df',  priority: 'high',   status: 'in-progress', assigneeId: 'self',   dueDateAt: '2026-05-29', dueDateLabel: 'Today',    dueDateTone: 'danger', progress: 40,  updatedAt: '2026-05-29T11:30', updatedAtLabel: '30 min ago',          category: 'mine' },
  { uid: 'task-03', title: 'Annotate literature review sources',    commentsCount: 2,  paperUid: '3sdf8sdf3',  priority: 'medium', status: 'in-review',   assigneeId: 'self',   dueDateAt: '2026-05-29', dueDateLabel: 'Today',    dueDateTone: 'danger', progress: 80,  updatedAt: '2026-05-29T11:00', updatedAtLabel: '1 hour ago',          category: 'mine' },
  { uid: 'task-04', title: 'Format bibliography and citations',     commentsCount: 0,  paperUid: '2sdf8sdf2',  priority: 'low',    status: 'not-started', assigneeId: 'self',   dueDateAt: '2026-05-30', dueDateLabel: 'Tomorrow',                        progress: 0,   updatedAt: '2026-05-28T14:00', updatedAtLabel: 'Yesterday',           category: 'upcoming' },
  { uid: 'task-05', title: 'Prepare submission checklist',          commentsCount: 4,  paperUid: '7sdf8sdf0',  priority: 'medium', status: 'in-progress', assigneeId: 'col-02', dueDateAt: '2026-05-30', dueDateLabel: 'Tomorrow',                        progress: 30,  updatedAt: '2026-05-28T16:30', updatedAtLabel: 'Yesterday',           category: 'upcoming' },
  { uid: 'task-06', title: 'Proofread methodology section',         commentsCount: 1,  paperUid: '8sdf7sdf8',  priority: 'medium', status: 'in-progress', assigneeId: 'self',   dueDateAt: '2026-06-01', dueDateLabel: 'Jun 1',                           progress: 55,  updatedAt: '2026-05-27T09:15', updatedAtLabel: '2 days ago',          category: 'upcoming' },
  { uid: 'task-07', title: 'Run ablation study experiments',        commentsCount: 5,  paperUid: '9sdf8s7df',  priority: 'high',   status: 'in-progress', assigneeId: 'col-04', dueDateAt: '2026-06-03', dueDateLabel: 'Jun 3',                           progress: 30,  updatedAt: '2026-05-26T14:00', updatedAtLabel: '3 days ago',          category: 'upcoming' },
  { uid: 'task-08', title: 'Write conclusions and future work',     commentsCount: 0,  paperUid: '0sdf8sdf0',  priority: 'medium', status: 'not-started', assigneeId: 'self',   dueDateAt: '2026-06-05', dueDateLabel: 'Jun 5',                           progress: 0,   updatedAt: '2026-05-28T10:30', updatedAtLabel: 'Yesterday',           category: 'upcoming' },
  { uid: 'task-09', title: 'Submit to NeurIPS 2026',                commentsCount: 0,  paperUid: 'HJlk39na9e', priority: 'high',   status: 'not-started', assigneeId: 'self',   dueDateAt: '2026-06-08', dueDateLabel: 'Jun 8',                           progress: 10,  updatedAt: '2026-05-25T16:00', updatedAtLabel: '4 days ago',          category: 'upcoming' },
  { uid: 'task-10', title: 'Update abstract summary',               commentsCount: 2,  paperUid: '9sdf8sdf0',  priority: 'low',    status: 'completed',   assigneeId: 'self',   dueDateAt: '2026-05-28', dueDateLabel: 'May 28',                          progress: 100, updatedAt: '2026-05-28T09:00', updatedAtLabel: 'May 28, 9:00 AM',     category: 'completed' },
  { uid: 'task-11', title: 'Collect and validate dataset',          commentsCount: 1,  paperUid: '7sdf8sdf7',  priority: 'low',    status: 'completed',   assigneeId: 'col-02', dueDateAt: '2026-05-27', dueDateLabel: 'May 27',                          progress: 100, updatedAt: '2026-05-27T15:15', updatedAtLabel: 'May 27, 3:15 PM',     category: 'completed' },
  { uid: 'task-12', title: 'Fix citation formatting errors',        commentsCount: 3,  paperUid: '3sdf8sdf3',  priority: 'medium', status: 'completed',   assigneeId: 'col-04', dueDateAt: '2026-05-26', dueDateLabel: 'May 26',                          progress: 100, updatedAt: '2026-05-26T11:30', updatedAtLabel: 'May 26, 11:30 AM',    category: 'completed' },
  { uid: 'task-13', title: 'Draft ethical considerations section',  commentsCount: 0,  paperUid: '2sdf8sdf2',  priority: 'low',    status: 'completed',   assigneeId: 'self',   dueDateAt: '2026-05-25', dueDateLabel: 'May 25',                          progress: 100, updatedAt: '2026-05-25T14:00', updatedAtLabel: 'May 25, 2:00 PM',     category: 'completed' },
  { uid: 'task-14', title: 'Submit camera-ready version',           commentsCount: 8,  paperUid: '5sdf8sdf5',  priority: 'high',   status: 'in-progress', assigneeId: 'self',   dueDateAt: '2026-05-20', dueDateLabel: 'May 20', dueDateTone: 'danger', progress: 70,  updatedAt: '2026-05-29T07:00', updatedAtLabel: '5 hours ago',         category: 'overdue' },
  { uid: 'task-15', title: 'Respond to reviewer comments',          commentsCount: 12, paperUid: '6sdf8sdf6',  priority: 'high',   status: 'in-review',   assigneeId: 'col-02', dueDateAt: '2026-05-22', dueDateLabel: 'May 22', dueDateTone: 'danger', progress: 85,  updatedAt: '2026-05-23T16:45', updatedAtLabel: 'May 23, 4:45 PM',     category: 'overdue' },
];
