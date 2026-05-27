import { ChangeDetectionStrategy, Component, computed, contentChildren, input, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableColumnDirective } from './table-column.directive';

export type TabConfig = {
  id: string;
  label: string;
  filter?: (row: unknown) => boolean;
};

@Component({
  selector: 'app-custom-dynamic-table',
  imports: [NgTemplateOutlet],
  templateUrl: './custom-dynamic-table.html',
  styleUrl: './custom-dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDynamicTable {
  readonly data = input<unknown[]>([]);
  readonly tabs = input<TabConfig[]>([]);
  readonly pageSize = input(5);

  protected readonly columns = contentChildren(TableColumnDirective);
  protected readonly activeTab = signal('');
  protected readonly currentPage = signal(1);

  protected readonly tabsWithCounts = computed(() => {
    const data = this.data();
    return this.tabs().map(tab => ({
      ...tab,
      count: tab.filter ? data.filter(tab.filter).length : data.length,
    }));
  });

  protected readonly filteredData = computed(() => {
    const activeId = this.activeTab();
    const tabs = this.tabs();
    const id = activeId || tabs[0]?.id;
    const tab = tabs.find(t => t.id === id);
    return tab?.filter ? this.data().filter(tab.filter) : this.data();
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredData().length / this.pageSize()))
  );

  protected readonly paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredData().slice(start, start + this.pageSize());
  });

  protected readonly emptyRows = computed(() =>
    Array.from({ length: Math.max(0, this.pageSize() - this.paginatedData().length) })
  );

  protected readonly pageInfo = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const total = this.filteredData().length;
    return {
      from: total === 0 ? 0 : (page - 1) * size + 1,
      to: Math.min(page * size, total),
      total,
    };
  });

  // Returns page numbers (1-indexed) and 'ellipsis' sentinels for gaps.
  protected readonly visiblePages = computed((): (number | 'ellipsis')[] => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [1];
    if (current > 3) pages.push('ellipsis');
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
      pages.push(p);
    }
    if (current < total - 2) pages.push('ellipsis');
    pages.push(total);

    return pages;
  });

  protected selectTab(id: string): void {
    this.activeTab.set(id);
    this.currentPage.set(1);
  }

  protected isActive(tabId: string): boolean {
    const active = this.activeTab();
    const tabs = this.tabs();
    return (active || tabs[0]?.id || '') === tabId;
  }

  protected goToPage(page: number): void {
    const clamped = Math.max(1, Math.min(page, this.totalPages()));
    this.currentPage.set(clamped);
  }
}
