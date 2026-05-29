import { ColumnDef, TabConfig } from "../../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { PaperData } from "../../../pages/platform/pages/papers-page/papers-model";

export const PAPER_TABS: TabConfig[] = [
  { id: 'all', label: 'All Papers' },
  { id: 'mine', label: 'Mine', filter: (row) => (row as PaperData).category === 'mine' },
  { id: 'shared', label: 'Shared', filter: (row) => (row as PaperData).category === 'shared' },
  { id: 'archived', label: 'Archived', filter: (row) => (row as PaperData).category === 'archived' },
];

export const PAPER_COLUMNS: ColumnDef[] = [
  {
    key: 'title', header: 'Paper / Topic', width: '30%',
    cell: {
      type: 'text',
      primary: (row: unknown) => (row as PaperData).title,
      secondary: (row: unknown) => (row as PaperData).topic,
      badge: (row: unknown) => (row as PaperData).featured ? '★' : '',
    },
  },
  {
    key: 'stage', header: 'Stage',
    cell: {
      type: 'badge',
      label: (row: unknown) => (row as PaperData).stage.label,
      tone: (row: unknown) => (row as PaperData).stage.tone,
    },
  },
  {
    key: 'progress', header: 'Progress', width: '210px',
    cell: {
      type: 'progress',
      value: (row: unknown) => (row as PaperData).progress.value,
      tone: (row: unknown) => (row as PaperData).progress.tone,
    },
  },
  {
    key: 'deadline', header: 'Deadline',
    cell: {
      type: 'date',
      label: (row: unknown) => (row as PaperData).deadline.date,
      datetime: (row: unknown) => (row as PaperData).deadline.datetime,
      secondary: (row: unknown) => (row as PaperData).deadline.status,
      secondaryTone: (row: unknown) => (row as PaperData).deadline.tone,
    },
  },
  {
    key: 'collaborators', header: 'Collaborators', width: '170px',
    cell: {
      type: 'avatars',
      initials: (row: unknown) => (row as PaperData).collaborators.initials,
      extra: (row: unknown) => (row as PaperData).collaborators.extra,
    },
  },
  {
    key: 'updated', header: 'Last Updated',
    cell: {
      type: 'date',
      label: (row: unknown) => (row as PaperData).updated.label,
      datetime: (row: unknown) => (row as PaperData).updated.datetime,
    },
  },
  {
    key: 'actions', header: 'Actions', srOnly: true,
    cell: { type: 'action', ariaLabel: 'More actions' },
  },
];
