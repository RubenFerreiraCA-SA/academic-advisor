export type TabConfig = {
  id: string;
  label: string;
  filter?: (row: unknown) => boolean;
};

export type CellText = {
  type: 'text';
  primary: (row: unknown) => string;
  secondary?: (row: unknown) => string;
  badge?: (row: unknown) => string;
};

export type CellBadge = {
  type: 'badge';
  label: (row: unknown) => string;
  tone: (row: unknown) => string;
};

export type CellProgress = {
  type: 'progress';
  value: (row: unknown) => number;
  tone?: (row: unknown) => string | undefined;
};

export type CellDate = {
  type: 'date';
  label: (row: unknown) => string;
  datetime: (row: unknown) => string;
  labelTone?: (row: unknown) => string | undefined;
  secondary?: (row: unknown) => string;
  secondaryTone?: (row: unknown) => string | undefined;
};

export type CellAvatars = {
  type: 'avatars';
  initials: (row: unknown) => string[];
  extra: (row: unknown) => string;
};

export type CellAvatar = {
  type: 'avatar';
  initials: (row: unknown) => string;
  name: (row: unknown) => string;
};

export type CellAction = {
  type: 'action';
  ariaLabel: string;
};

export type CellDef = CellText | CellBadge | CellProgress | CellDate | CellAvatars | CellAvatar | CellAction;

export type ColumnDef = {
  key: string;
  header: string;
  srOnly?: boolean;
  width?: string;
  cell: CellDef;
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterDef = {
  id: string;
  label: string;
  options: FilterOption[];
  filter: (row: unknown, value: string) => boolean;
};

export type DynamicTableConfig = {
  data: unknown[];
  columns: ColumnDef[];
  tabs?: TabConfig[];
  pageSize?: number;
  featured?: (row: unknown) => boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: unknown, query: string) => boolean;
  filters?: FilterDef[];
  selectable?: boolean;
  rowKey?: (row: unknown) => string;
};
