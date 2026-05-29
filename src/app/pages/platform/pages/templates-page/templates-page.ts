import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { TemplateCategory, TemplateData, TemplateVisibility } from './template.model';

type CategoryFilter = 'all' | TemplateCategory;
type VisibilityFilter = 'all' | TemplateVisibility;

@Component({
  selector: 'app-templates-page',
  imports: [StatCard],
  templateUrl: './templates-page.html',
  styleUrl: './templates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesPage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.TemplatesStatCards;
  readonly templates = this.svc.TemplatesData;

  protected readonly categoryFilter = signal<CategoryFilter>('all');
  protected readonly visibilityFilter = signal<VisibilityFilter>('all');
  protected readonly searchQuery = signal('');

  protected readonly CATEGORY_LABELS: Record<TemplateCategory, string> = {
    'manuscript': 'Manuscript', 'review': 'Review', 'outline': 'Outline',
    'submission': 'Submission', 'cover-letter': 'Cover Letter',
  };

  protected readonly filtered = computed<TemplateData[]>(() => {
    const cat = this.categoryFilter();
    const vis = this.visibilityFilter();
    const q = this.searchQuery().trim().toLowerCase();
    return this.templates.filter(t => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (vis !== 'all' && t.visibility !== vis) return false;
      if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      return true;
    });
  });

  protected setCategory(c: CategoryFilter): void { this.categoryFilter.set(c); }
  protected setVisibility(v: VisibilityFilter): void { this.visibilityFilter.set(v); }
  protected setSearch(q: string): void { this.searchQuery.set(q); }
}
