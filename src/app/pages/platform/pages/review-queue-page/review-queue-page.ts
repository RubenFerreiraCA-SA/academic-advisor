import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { AppModal } from '../../shared-components/modal/modal';

@Component({
  selector: 'app-review-queue-page',
  imports: [StatCard, CustomDynamicTable, ReactiveFormsModule, AppModal],
  templateUrl: './review-queue-page.html',
  styleUrl: './review-queue-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewQueuePage {
  private readonly svc = inject(MockContentService);
  private readonly fb = inject(FormBuilder);

  readonly statCards = this.svc.ReviewQueueStatCards;
  readonly tableConfig = this.svc.reviewQueueTableConfig;
  readonly papers = this.svc.papers;
  readonly collaborators = computed(() => this.svc.collaborators());

  protected readonly showNewReview = signal(false);

  protected readonly newReviewForm = this.fb.nonNullable.group({
    paperUid: ['', Validators.required],
    reviewerId: ['self'],
    reviewType: ['peer-review'],
    priority: ['normal'],
    deadlineDate: [''],
  });

  protected openNewReview(): void {
    this.newReviewForm.reset({ paperUid: '', reviewerId: 'self', reviewType: 'peer-review', priority: 'normal', deadlineDate: '' });
    this.showNewReview.set(true);
  }

  protected closeNewReview(): void {
    this.showNewReview.set(false);
  }

  protected submitNewReview(): void {
    if (this.newReviewForm.invalid) return;
    const v = this.newReviewForm.getRawValue();
    const now = new Date().toISOString().split('T')[0];
    const deadlineLabel = v.deadlineDate
      ? new Date(v.deadlineDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    this.svc.addReviewItem({
      paperUid: v.paperUid,
      reviewType: v.reviewType as 'peer-review' | 'editorial' | 'internal',
      reviewerId: v.reviewerId,
      priority: v.priority as 'urgent' | 'high' | 'normal' | 'low',
      status: 'pending',
      submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      submittedDatetime: now,
      deadlineDate: deadlineLabel,
      deadlineDatetime: v.deadlineDate,
      deadlineLabel,
      commentsCount: 0,
      category: 'pending',
    });
    this.closeNewReview();
  }
}
