import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockContentService } from '../../../../../services/mocks/content.service.mock';

type Step = 1 | 2 | 3 | 4 | 5;
type AuthorType = 'sole' | 'team';

interface StepDef { num: Step; label: string; }

const STEPS: StepDef[] = [
  { num: 1, label: 'Concept' },
  { num: 2, label: 'Title' },
  { num: 3, label: 'Team' },
  { num: 4, label: 'Outline' },
  { num: 5, label: 'Create' },
];

const DEFAULT_SECTIONS = ['Introduction', 'Related Work', 'Methodology', 'Results', 'Discussion', 'Conclusion'];
const PRESET_SECTIONS  = ['Abstract', 'Background', 'Experimental Setup', 'Evaluation', 'Limitations', 'Future Work', 'Appendix', 'Acknowledgements'];

@Component({
  selector: 'app-new-paper-page',
  imports: [ReactiveFormsModule],
  templateUrl: './new-paper-page.html',
  styleUrl: './new-paper-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPaperPage {
  private readonly svc = inject(MockContentService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly STEPS = STEPS;
  protected readonly PRESET_SECTIONS = PRESET_SECTIONS;

  // ── Step state ────────────────────────────────────────────────────────────
  protected readonly currentStep = signal<Step>(1);

  // ── Step 1: Concept ───────────────────────────────────────────────────────
  protected readonly conceptForm = this.fb.nonNullable.group({
    concept: ['', Validators.required],
  });

  // Bridge form status into the signal graph so computed() re-evaluates
  private readonly conceptStatus = toSignal(this.conceptForm.statusChanges, {
    initialValue: this.conceptForm.status,
  });

  // ── Step 1: Topic chips ───────────────────────────────────────────────────
  protected readonly topicChips = signal<string[]>([]);
  protected readonly topicRawInput = signal('');

  // ── Step 2: Title ─────────────────────────────────────────────────────────
  protected readonly titleForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
  });

  private readonly titleStatus = toSignal(this.titleForm.statusChanges, {
    initialValue: this.titleForm.status,
  });

  // ── Step 3: Team ──────────────────────────────────────────────────────────
  protected readonly authorType = signal<AuthorType>('sole');
  protected readonly selectedCollaborators = signal<string[]>([]);
  protected readonly collaborators = computed(() => this.svc.collaborators());

  // ── Step 4: Outline ───────────────────────────────────────────────────────
  protected readonly outlineSections = signal<string[]>([...DEFAULT_SECTIONS]);
  protected readonly newSectionInput = signal('');
  protected readonly availablePresets = computed(() =>
    PRESET_SECTIONS.filter(s => !this.outlineSections().includes(s))
  );

  // ── Step 4: Drag state ────────────────────────────────────────────────────
  protected readonly dragIndex = signal<number | null>(null);
  protected readonly dragOverIndex = signal<number | null>(null);

  // ── Navigation ────────────────────────────────────────────────────────────
  protected readonly canAdvance = computed<boolean>(() => {
    switch (this.currentStep()) {
      case 1: return this.conceptStatus() === 'VALID';
      case 2: return this.titleStatus() === 'VALID';
      case 3: return true;
      case 4: return this.outlineSections().length > 0;
      default: return true;
    }
  });

  // ── Summary (step 5) ──────────────────────────────────────────────────────
  protected readonly summary = computed(() => ({
    concept: this.conceptForm.getRawValue().concept,
    title: this.titleForm.getRawValue().title,
    topics: this.topicChips().join(' · '),
    authorType: this.authorType(),
    collaboratorCount: this.selectedCollaborators().length,
    collaboratorNames: this.selectedCollaborators()
      .map(id => this.collaborators().find(c => c.uid === id)?.name ?? id),
    sections: this.outlineSections(),
  }));

  protected goNext(): void {
    if (this.canAdvance() && this.currentStep() < 5) {
      this.currentStep.update(s => (s + 1) as Step);
    }
  }

  protected goBack(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => (s - 1) as Step);
    }
  }

  protected cancel(): void {
    this.router.navigate(['/platform/papers']);
  }

  // ── Step 1: Topic chip actions ────────────────────────────────────────────
  protected handleTopicKeydown(event: KeyboardEvent): void {
    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault();
      this.commitTopicInput();
    } else if (event.key === 'Backspace' && !this.topicRawInput()) {
      this.topicChips.update(chips => chips.slice(0, -1));
    }
  }

  protected commitTopicInput(): void {
    const val = this.topicRawInput().replace(/,+$/, '').trim();
    if (val && !this.topicChips().includes(val)) {
      this.topicChips.update(c => [...c, val]);
    }
    this.topicRawInput.set('');
  }

  protected removeTopicChip(chip: string): void {
    this.topicChips.update(chips => chips.filter(c => c !== chip));
  }

  // ── Step 3 actions ────────────────────────────────────────────────────────
  protected setAuthorType(type: AuthorType): void {
    this.authorType.set(type);
    if (type === 'sole') this.selectedCollaborators.set([]);
  }

  protected toggleCollaborator(uid: string): void {
    this.selectedCollaborators.update(ids =>
      ids.includes(uid) ? ids.filter(id => id !== uid) : [...ids, uid]
    );
  }

  protected isCollabSelected(uid: string): boolean {
    return this.selectedCollaborators().includes(uid);
  }

  // ── Step 4 actions ────────────────────────────────────────────────────────
  protected removeSection(index: number): void {
    this.outlineSections.update(s => s.filter((_, i) => i !== index));
  }

  protected onDragStart(event: DragEvent, index: number): void {
    this.dragIndex.set(index);
    event.dataTransfer?.setData('text/plain', String(index));
  }

  protected onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    if (this.dragOverIndex() !== index) {
      this.dragOverIndex.set(index);
    }
  }

  protected onDragLeave(event: DragEvent): void {
    const related = event.relatedTarget as HTMLElement | null;
    if (!related?.closest('.outline-item')) {
      this.dragOverIndex.set(null);
    }
  }

  protected onDrop(event: DragEvent, toIndex: number): void {
    event.preventDefault();
    const from = this.dragIndex();
    if (from !== null && from !== toIndex) {
      this.outlineSections.update(sections => {
        const updated = [...sections];
        const [item] = updated.splice(from, 1);
        updated.splice(toIndex, 0, item);
        return updated;
      });
    }
    this.dragIndex.set(null);
    this.dragOverIndex.set(null);
  }

  protected onDragEnd(): void {
    this.dragIndex.set(null);
    this.dragOverIndex.set(null);
  }

  protected addCustomSection(): void {
    const name = this.newSectionInput().trim();
    if (name && !this.outlineSections().includes(name)) {
      this.outlineSections.update(s => [...s, name]);
      this.newSectionInput.set('');
    }
  }

  protected addPreset(preset: string): void {
    this.outlineSections.update(s => [...s, preset]);
  }

  protected handleSectionKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCustomSection();
    }
  }

  // ── Final create ──────────────────────────────────────────────────────────
  protected createPaper(): void {
    const v1 = this.conceptForm.getRawValue();
    const v2 = this.titleForm.getRawValue();
    const now = new Date();

    const topics = this.topicChips().length > 0
      ? this.topicChips().join(' · ')
      : 'Research';

    const uid = this.svc.addPaper({
      title: v2.title,
      topic: topics,
      category: this.authorType() === 'team' ? 'shared' : 'mine',
      stage: 'concept',
      progress: 5,
      deadlineDate: '',
      deadlineDatetime: '',
      deadlineStatus: 'No deadline',
      collaboratorIds: this.selectedCollaborators(),
      externalCollaboratorCount: 0,
      updatedAt: now.toISOString(),
      updatedAtLabel: 'Just now',
      concept: v1.concept,
      outline: this.outlineSections(),
    });

    this.router.navigate(['/platform/papers', uid]);
  }
}
