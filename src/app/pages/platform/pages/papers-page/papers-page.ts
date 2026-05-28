import { Component, inject } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { DynamicTableConfig } from '../../components/custom-dynamic-table/custom-dynamic-table.model';
import { CustomDynamicTable } from '../../components/custom-dynamic-table/custom-dynamic-table';

@Component({
  selector: 'app-papers-page',
  imports: [CustomDynamicTable],
  templateUrl: './papers-page.html',
  styleUrl: './papers-page.scss',
})
export class PapersPage {
    private readonly mockContentService = inject(MockContentService);
  
  readonly tableConfig: DynamicTableConfig = this.mockContentService.PapersTableConfig;
}
