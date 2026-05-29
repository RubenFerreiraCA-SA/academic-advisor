import { ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { DynamicTableConfig } from './custom-dynamic-table.model';

@Component({
  selector: 'app-custom-dynamic-table',
  imports: [],
  templateUrl: './custom-dynamic-table.html',
  styleUrl: './custom-dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDynamicTable {
  @Input() config!: DynamicTableConfig;
  @Output() rowClick = new EventEmitter<any>();

  protected readonly activeTab = signal('');
  protected readonly currentPage = signal(1);
  protected readonly searchQuery = signal('');
  protected readonly activeFilters = signal<Record<string, string>>({});
  protected readonly selectedKeys = signal<Set<string>>(new Set());

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  protected readonly tabsWithCounts = computed(() => {
    const { data, tabs = [] } = this.config;
    return tabs.map(tab => ({
      ...tab,
      count: tab.filter ? data.filter(tab.filter).length : data.length,
    }));
  });

  protected readonly filteredData = computed(() => {
    const { data, tabs = [], searchFilter, filters: filterDefs = [] } = this.config;
    const id = this.activeTab() || tabs[0]?.id;
    const tab = tabs.find(t => t.id === id);
    let result = tab?.filter ? data.filter(tab.filter) : data;

    const query = this.searchQuery().trim().toLowerCase();
    if (query && searchFilter) {
      result = result.filter(row => searchFilter(row, query));
    }

    const active = this.activeFilters();
    for (const def of filterDefs) {
      const val = active[def.id];
      if (val && val !== 'all') {
        result = result.filter(row => def.filter(row, val));
      }
    }

    return result;
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

  protected readonly hasActiveFilters = computed(() => {
    const query = this.searchQuery().trim();
    const filters = this.activeFilters();
    return !!query || Object.values(filters).some(v => !!v && v !== 'all');
  });

  protected readonly allPageSelected = computed(() => {
    const rowKey = this.config.rowKey;
    if (!rowKey) return false;
    const page = this.paginatedData();
    if (!page.length) return false;
    const sel = this.selectedKeys();
    return page.every(r => sel.has(rowKey(r)));
  });

  protected readonly somePageSelected = computed(() => {
    const rowKey = this.config.rowKey;
    if (!rowKey) return false;
    const page = this.paginatedData();
    const sel = this.selectedKeys();
    const count = page.filter(r => sel.has(rowKey(r))).length;
    return count > 0 && count < page.length;
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

  protected setSearch(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  protected setFilter(id: string, value: string): void {
    this.activeFilters.update(f => ({ ...f, [id]: value }));
    this.currentPage.set(1);
  }

  protected clearFilters(): void {
    this.searchQuery.set('');
    this.activeFilters.set({});
    this.currentPage.set(1);
  }

  protected toggleAllRows(): void {
    const { rowKey } = this.config;
    if (!rowKey) return;
    const page = this.paginatedData();
    const allSelected = this.allPageSelected();
    this.selectedKeys.update(set => {
      const next = new Set(set);
      if (allSelected) {
        page.forEach(r => next.delete(rowKey(r)));
      } else {
        page.forEach(r => next.add(rowKey(r)));
      }
      return next;
    });
  }

  protected toggleRow(row: unknown): void {
    const { rowKey } = this.config;
    if (!rowKey) return;
    const key = rowKey(row);
    this.selectedKeys.update(set => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  protected isSelected(row: unknown): boolean {
    const { rowKey } = this.config;
    if (!rowKey) return false;
    return this.selectedKeys().has(rowKey(row));
  }
}
