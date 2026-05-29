import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockContentService } from '../../../../../services/mocks/content.service.mock';

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

  readonly collaborators = computed(() => this.svc.collaborators());

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    topic: [''],
    category: ['mine'],
    stage: ['outline'],
    deadline: [''],
    collaboratorIds: [[] as string[]],
  });

  protected toggleCollaborator(uid: string): void {
    const current = this.form.controls.collaboratorIds.value as string[];
    const updated = current.includes(uid)
      ? current.filter(id => id !== uid)
      : [...current, uid];
    this.form.controls.collaboratorIds.setValue(updated);
  }

  protected isCollabSelected(uid: string): boolean {
    return (this.form.controls.collaboratorIds.value as string[]).includes(uid);
  }

  protected submit(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    const now = new Date();
    const deadlineIso = v.deadline || now.toISOString().split('T')[0];
    const deadlineLabel = v.deadline
      ? new Date(v.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    const updatedLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    this.svc.addPaper({
      title: v.title,
      topic: v.topic,
      category: v.category as 'mine' | 'shared' | 'archived',
      stage: v.stage,
      progress: 0,
      deadlineDate: deadlineLabel,
      deadlineDatetime: deadlineIso,
      deadlineStatus: v.deadline ? '' : 'No deadline',
      collaboratorIds: v.collaboratorIds,
      externalCollaboratorCount: 0,
      updatedAt: now.toISOString(),
      updatedAtLabel: updatedLabel,
    });
    this.router.navigate(['/platform/papers']);
  }

  protected cancel(): void {
    this.router.navigate(['/platform/papers']);
  }
}
