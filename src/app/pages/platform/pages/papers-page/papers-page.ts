import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { DynamicTableConfig } from '../../shared-components/custom-dynamic-table/custom-dynamic-table.model';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { InfoCard } from '../../shared-components/info-card/info-card';

type ViewMode = 'table' | 'card';

@Component({
  selector: 'app-papers-page',
  imports: [CustomDynamicTable, InfoCard],
  templateUrl: './papers-page.html',
  styleUrl: './papers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapersPage {
  private readonly mockContentService = inject(MockContentService);

  readonly tableConfig: DynamicTableConfig = this.mockContentService.PapersTableConfig;
  readonly papers = this.mockContentService.PapersData;

  protected readonly viewMode = signal<ViewMode>('table');

  protected setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }
}
