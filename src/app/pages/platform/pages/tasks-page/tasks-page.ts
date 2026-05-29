import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';

type ViewMode = 'list' | 'board';

@Component({
  selector: 'app-tasks-page',
  imports: [StatCard, CustomDynamicTable],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
  private readonly mockContentService = inject(MockContentService);

  readonly statCards = this.mockContentService.TaskStatCards;
  readonly tableConfig = this.mockContentService.TasksTableConfig;

  protected readonly viewMode = signal<ViewMode>('list');

  protected setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }
}
