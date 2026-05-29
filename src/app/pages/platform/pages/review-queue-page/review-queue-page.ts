import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';

@Component({
  selector: 'app-review-queue-page',
  imports: [StatCard, CustomDynamicTable],
  templateUrl: './review-queue-page.html',
  styleUrl: './review-queue-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewQueuePage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.ReviewQueueStatCards;
  readonly tableConfig = this.svc.ReviewQueueTableConfig;
}
