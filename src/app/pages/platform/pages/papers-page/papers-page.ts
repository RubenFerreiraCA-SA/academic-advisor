import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { DynamicTableConfig } from '../../shared-components/custom-dynamic-table/custom-dynamic-table.model';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { InfoCard } from '../../shared-components/info-card/info-card';
import { PaperCategory } from '../papers-page/papers-model';
import { Router } from '@angular/router';

type ViewMode = 'table' | 'card';
type CategoryFilter = 'all' | PaperCategory;

export type CategoryChip = {
  id: CategoryFilter;
  label: string;
  count: number;
};

@Component({
  selector: 'app-papers-page',
  imports: [CustomDynamicTable, InfoCard],
  templateUrl: './papers-page.html',
  styleUrl: './papers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersPage {
  private readonly mockContentService = inject(MockContentService);
  private router = inject(Router);

  readonly tableConfig: DynamicTableConfig = this.mockContentService.PapersTableConfig;
  readonly papers = this.mockContentService.PapersData;

  protected readonly viewMode = signal<ViewMode>('table');
  protected readonly activeCategory = signal<CategoryFilter>('all');

  protected readonly categoryChips = computed<CategoryChip[]>(() => {
    const papers = this.papers;
    return [
      { id: 'all', label: 'All', count: papers.length },
      { id: 'mine', label: 'Mine', count: papers.filter(p => p.category === 'mine').length },
      { id: 'shared', label: 'Shared', count: papers.filter(p => p.category === 'shared').length },
      { id: 'archived', label: 'Archived', count: papers.filter(p => p.category === 'archived').length },
    ];
  });

  protected readonly filteredPapers = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? this.papers : this.papers.filter(p => p.category === cat);
  });

  protected setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  protected setCategory(id: CategoryFilter): void {
    this.activeCategory.set(id);
  }

  onRowClick(row: any): void {
    this.router.navigate(['/platform/papers', row.uid]);
  }

}
