import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';

@Component({
  selector: 'app-analytics-page',
  imports: [StatCard],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsPage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.AnalyticsStatCards;
  readonly data = this.svc.AnalyticsData;

  protected readonly maxCount = Math.max(...this.data.publicationsByYear.map(y => y.count));
  protected readonly maxCitations = Math.max(...this.data.publicationsByYear.map(y => y.citations));
}
