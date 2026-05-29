import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { TemplateCategory, TemplateData, TemplateVisibility } from './template.model';
import { AppModal } from '../../shared-components/modal/modal';

type CategoryFilter = 'all' | TemplateCategory;
type VisibilityFilter = 'all' | TemplateVisibility;

@Component({
  selector: 'app-templates-page',
  imports: [StatCard, ReactiveFormsModule, AppModal],
  templateUrl: './templates-page.html',
  styleUrl: './templates-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesPage {
  private readonly svc = inject(MockContentService);
  private readonly fb = inject(FormBuilder);

  readonly statCards = this.svc.TemplatesStatCards;
  readonly templates = this.svc.templates;

  protected readonly categoryFilter = signal<CategoryFilter>('all');
  protected readonly visibilityFilter = signal<VisibilityFilter>('all');
  protected readonly searchQuery = signal('');
  protected readonly showNewTemplate = signal(false);

  protected readonly CATEGORY_LABELS: Record<TemplateCategory, string> = {
    'manuscript': 'Manuscript', 'review': 'Review', 'outline': 'Outline',
    'submission': 'Submission', 'cover-letter': 'Cover Letter',
  };

  protected readonly filtered = computed<TemplateData[]>(() => {
    const cat = this.categoryFilter();
    const vis = this.visibilityFilter();
    const q = this.searchQuery().trim().toLowerCase();
    return this.templates().filter(t => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (vis !== 'all' && t.visibility !== vis) return false;
      if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      return true;
    });
  });

  protected readonly newTemplateForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    category: ['manuscript'],
    visibility: ['personal'],
    tags: [''],
  });

  protected setCategory(c: CategoryFilter): void { this.categoryFilter.set(c); }
  protected setVisibility(v: VisibilityFilter): void { this.visibilityFilter.set(v); }
  protected setSearch(q: string): void { this.searchQuery.set(q); }

  protected openNewTemplate(): void {
    this.newTemplateForm.reset({ title: '', description: '', category: 'manuscript', visibility: 'personal', tags: '' });
    this.showNewTemplate.set(true);
  }

  protected closeNewTemplate(): void {
    this.showNewTemplate.set(false);
  }

  protected submitNewTemplate(): void {
    if (this.newTemplateForm.invalid) return;
    const v = this.newTemplateForm.getRawValue();
    const now = new Date();
    const dateLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dateIso = now.toISOString().split('T')[0];
    const tags = v.tags ? v.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    this.svc.addTemplate({
      title: v.title,
      description: v.description,
      category: v.category as TemplateCategory,
      visibility: v.visibility as TemplateVisibility,
      usageCount: 0,
      lastUsed: dateLabel,
      lastUsedDatetime: dateIso,
      createdBy: 'Ruben F.',
      tags,
    });
    this.closeNewTemplate();
  }
}
