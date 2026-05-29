import { ColumnDef, FilterDef, TabConfig } from "../../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { TaskData } from "../../../pages/platform/pages/tasks-page/task.model";

const STATUS_LABELS: Record<string, string> = {
  'in-progress': 'In Progress',
  'in-review': 'In Review',
  'not-started': 'Not Started',
  'completed': 'Completed',
};

const PRIORITY_LABELS: Record<string, string> = {
  'high': 'High',
  'medium': 'Medium',
  'low': 'Low',
};

export const TASK_TABS: TabConfig[] = [
  { id: 'all', label: 'All Tasks' },
  { id: 'mine', label: 'My Tasks', filter: (row) => (row as TaskData).assignee.initials === 'RF' },
  { id: 'upcoming', label: 'Upcoming', filter: (row) => (row as TaskData).category === 'upcoming' },
  { id: 'overdue', label: 'Overdue', filter: (row) => (row as TaskData).category === 'overdue' },
  { id: 'completed', label: 'Completed', filter: (row) => (row as TaskData).category === 'completed' },
];

export const TASK_FILTER_DEFS: FilterDef[] = [
  {
    id: 'priority', label: 'Priority',
    options: [
      { value: 'all', label: 'Priority' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
    filter: (row, value) => (row as TaskData).priority === value,
  },
  {
    id: 'status', label: 'Status',
    options: [
      { value: 'all', label: 'Status' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'in-review', label: 'In Review' },
      { value: 'not-started', label: 'Not Started' },
      { value: 'completed', label: 'Completed' },
    ],
    filter: (row, value) => (row as TaskData).status === value,
  },
  {
    id: 'assignee', label: 'Assignee',
    options: [
      { value: 'all', label: 'Assignee' },
      { value: 'RF', label: 'Ruben F.' },
      { value: 'SC', label: 'Sarah C.' },
      { value: 'JL', label: 'Jamie L.' },
    ],
    filter: (row, value) => (row as TaskData).assignee.initials === value,
  },
];

export const TASK_COLUMNS: ColumnDef[] = [
  {
    key: 'task', header: 'Task', width: '26%',
    cell: {
      type: 'text',
      primary: (row: unknown) => (row as TaskData).title,
      badge: (row: unknown) => {
        const count = (row as TaskData).commentsCount;
        return count > 0 ? `${count}` : '';
      },
    },
  },
  {
    key: 'linked-paper', header: 'Linked Paper', width: '18%',
    cell: { type: 'text', primary: (row: unknown) => (row as TaskData).linkedPaper },
  },
  {
    key: 'priority', header: 'Priority',
    cell: {
      type: 'badge',
      label: (row: unknown) => PRIORITY_LABELS[(row as TaskData).priority],
      tone: (row: unknown) => (row as TaskData).priority,
    },
  },
  {
    key: 'status', header: 'Status',
    cell: {
      type: 'badge',
      label: (row: unknown) => STATUS_LABELS[(row as TaskData).status],
      tone: (row: unknown) => (row as TaskData).status,
    },
  },
  {
    key: 'assignee', header: 'Assignee',
    cell: {
      type: 'avatar',
      initials: (row: unknown) => (row as TaskData).assignee.initials,
      name: (row: unknown) => (row as TaskData).assignee.name,
    },
  },
  {
    key: 'due-date', header: 'Due Date',
    cell: {
      type: 'date',
      label: (row: unknown) => (row as TaskData).dueDate.label,
      datetime: (row: unknown) => (row as TaskData).dueDate.datetime,
      labelTone: (row: unknown) => (row as TaskData).dueDate.tone,
    },
  },
  {
    key: 'progress', header: 'Progress', width: '150px',
    cell: { type: 'progress', value: (row: unknown) => (row as TaskData).progress },
  },
  {
    key: 'updated', header: 'Last Updated',
    cell: {
      type: 'date',
      label: (row: unknown) => (row as TaskData).updatedAt.label,
      datetime: (row: unknown) => (row as TaskData).updatedAt.datetime,
    },
  },
  {
    key: 'actions', header: 'Actions', srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
