import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { PaperData } from '../papers-page/papers-model';
import { PaperContent } from './paper-detail.model';

@Component({
  selector: 'app-paper-detail-page',
  imports: [RouterLink],
  templateUrl: './paper-detail-page.html',
  styleUrl: './paper-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mockContentService = inject(MockContentService);
  private readonly document = inject(DOCUMENT);

  protected readonly paperData = signal<PaperData | null>(null);
  protected readonly paperContent = signal<PaperContent | null>(null);
  protected readonly tocOpen = signal(true);
  private readonly collapsed = signal(new Set<string>());
  private readonly parentOf = new Map<string, string>(); // sectionId → chapterId

  ngOnInit(): void {
    const uid = this.route.snapshot.paramMap.get('id') ?? '';
    const paper = this.mockContentService.PapersData.find(p => p.uid === uid) ?? null;
    this.paperData.set(paper);

    this.mockContentService.getPaperContentById(uid).then(content => {
      this.paperContent.set(content);

      const ids = new Set<string>(['references']);
      for (const chapter of content.chapters) {
        ids.add(chapter.id);
        for (const section of chapter.sections) {
          ids.add(section.id);
          this.parentOf.set(section.id, chapter.id);
        }
      }
      this.collapsed.set(ids);
    });
  }

  protected toggleToc(): void {
    this.tocOpen.update(v => !v);
  }

  protected navigateTo(id: string): void {
    this.collapsed.update(set => {
      const next = new Set(set);
      next.delete(id);
      const parent = this.parentOf.get(id);
      if (parent) next.delete(parent);
      return next;
    });
    // Wait one tick for Angular to render the newly expanded content
    setTimeout(() => {
      this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  protected scrollTo(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected isOpen(id: string): boolean {
    return !this.collapsed().has(id);
  }

  protected toggleSection(id: string): void {
    this.collapsed.update(set => {
      const next = new Set(set);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
}
