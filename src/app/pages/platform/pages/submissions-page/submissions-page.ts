import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { AppModal } from '../../shared-components/modal/modal';

@Component({
  selector: 'app-submissions-page',
  imports: [StatCard, CustomDynamicTable, ReactiveFormsModule, AppModal],
  templateUrl: './submissions-page.html',
  styleUrl: './submissions-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsPage {
  private readonly svc = inject(MockContentService);
  private readonly fb = inject(FormBuilder);

  readonly statCards = this.svc.SubmissionsStatCards;
  readonly tableConfig = this.svc.submissionsTableConfig;
  readonly papers = this.svc.papers;

  protected readonly showNewSubmission = signal(false);

  protected readonly newSubmissionForm = this.fb.nonNullable.group({
    paperUid: ['', Validators.required],
    journal: ['', Validators.required],
    journalShort: [''],
    impactFactor: [0],
    round: [1],
    submittedDate: [''],
  });

  protected openNewSubmission(): void {
    this.newSubmissionForm.reset({ paperUid: '', journal: '', journalShort: '', impactFactor: 0, round: 1, submittedDate: '' });
    this.showNewSubmission.set(true);
  }

  protected closeNewSubmission(): void {
    this.showNewSubmission.set(false);
  }

  protected submitNewSubmission(): void {
    if (this.newSubmissionForm.invalid) return;
    const v = this.newSubmissionForm.getRawValue();
    const dateLabel = v.submittedDate
      ? new Date(v.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    this.svc.addSubmission({
      paperUid: v.paperUid,
      journal: v.journal,
      journalShort: v.journalShort || v.journal.substring(0, 10),
      submittedDate: dateLabel,
      submittedDatetime: v.submittedDate,
      status: 'submitted',
      reviewDays: 0,
      impactFactor: v.impactFactor,
      round: v.round,
    });
    this.closeNewSubmission();
  }
}
