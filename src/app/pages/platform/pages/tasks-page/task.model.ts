export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'in-progress' | 'in-review' | 'not-started' | 'completed';
export type TaskCategory = 'mine' | 'upcoming' | 'overdue' | 'completed';

export interface TaskData {
  uid: string;
  title: string;
  commentsCount: number;
  linkedPaper: string;
  linkedPaperUid: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    initials: string;
    name: string;
  };
  dueDate: {
    date: string;
    datetime: string;
    label: string;
    tone?: 'danger' | 'warning';
  };
  progress: number;
  updatedAt: {
    label: string;
    datetime: string;
  };
  category: TaskCategory;
}
