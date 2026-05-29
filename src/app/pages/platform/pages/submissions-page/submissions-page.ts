import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';

@Component({
  selector: 'app-submissions-page',
  imports: [StatCard, CustomDynamicTable],
  templateUrl: './submissions-page.html',
  styleUrl: './submissions-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionsPage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.SubmissionsStatCards;
  readonly tableConfig = this.svc.SubmissionsTableConfig;
}
