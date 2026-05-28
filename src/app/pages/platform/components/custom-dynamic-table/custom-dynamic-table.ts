import { ChangeDetectionStrategy, Component, computed, Input, input, signal } from '@angular/core';

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
  secondary?: (row: unknown) => string;
  secondaryTone?: (row: unknown) => string | undefined;
};

export type CellAvatars = {
  type: 'avatars';
  initials: (row: unknown) => string[];
  extra: (row: unknown) => string;
};

export type CellAction = {
  type: 'action';
  ariaLabel: string;
};

export type CellDef = CellText | CellBadge | CellProgress | CellDate | CellAvatars | CellAction;

export type ColumnDef = {
  key: string;
  header: string;
  srOnly?: boolean;
  width?: string;
  cell: CellDef;
};

export type DynamicTableConfig = {
  data: unknown[];
  columns: ColumnDef[];
  tabs?: TabConfig[];
  pageSize?: number;
};

@Component({
  selector: 'app-custom-dynamic-table',
  imports: [],
  templateUrl: './custom-dynamic-table.html',
  styleUrl: './custom-dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDynamicTable {
  @Input() config!: DynamicTableConfig;

  protected readonly activeTab = signal('');
  protected readonly currentPage = signal(1);

  protected readonly tabsWithCounts = computed(() => {
    const { data, tabs = [] } = this.config;
    return tabs.map(tab => ({
      ...tab,
      count: tab.filter ? data.filter(tab.filter).length : data.length,
    }));
  });

  protected readonly filteredData = computed(() => {
    const { data, tabs = [] } = this.config;
    const id = this.activeTab() || tabs[0]?.id;
    const tab = tabs.find(t => t.id === id);
    return tab?.filter ? data.filter(tab.filter) : data;
  });

  protected readonly totalPages = computed(() => {
    const pageSize = this.config.pageSize ?? 5;
    return Math.max(1, Math.ceil(this.filteredData().length / pageSize));
  });

  protected readonly paginatedData = computed(() => {
    const pageSize = this.config.pageSize ?? 5;
    const start = (this.currentPage() - 1) * pageSize;
    return this.filteredData().slice(start, start + pageSize);
  });

  protected readonly emptyRows = computed(() => {
    const pageSize = this.config.pageSize ?? 5;
    return Array.from({ length: Math.max(0, pageSize - this.paginatedData().length) });
  });

  protected readonly pageInfo = computed(() => {
    const pageSize = this.config.pageSize ?? 5;
    const page = this.currentPage();
    const total = this.filteredData().length;
    return {
      from: total === 0 ? 0 : (page - 1) * pageSize + 1,
      to: Math.min(page * pageSize, total),
      total,
    };
  });

  protected readonly visiblePages = computed((): (number | 'ellipsis')[] => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | 'ellipsis')[] = [1];
    if (current > 3) pages.push('ellipsis');
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
    if (current < total - 2) pages.push('ellipsis');
    pages.push(total);
    return pages;
  });

  protected selectTab(id: string): void {
    this.activeTab.set(id);
    this.currentPage.set(1);
  }

  protected isActive(tabId: string): boolean {
    const tabs = this.config.tabs ?? [];
    return (this.activeTab() || tabs[0]?.id || '') === tabId;
  }

  protected goToPage(page: number): void {
    this.currentPage.set(Math.max(1, Math.min(page, this.totalPages())));
  }
}
