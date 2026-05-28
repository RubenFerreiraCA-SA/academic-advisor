import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { StatCard, StatCardData } from '../../shared-components/stat-card/stat-card';
import { PaperData } from '../papers-page/papers-model';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { DynamicTableConfig, TabConfig } from '../../shared-components/custom-dynamic-table/custom-dynamic-table.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [CustomDynamicTable, StatCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly mockContentService = inject(MockContentService);
  
  readonly statCards: StatCardData[] = this.mockContentService.StatCards
  readonly tableConfig: DynamicTableConfig = this.mockContentService.PapersTableConfig;
}