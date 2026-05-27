import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type PaperRow = {
  title: string;
  featured?: boolean;
  topic: string;
  stage: {
    label: string;
    tone: 'revision' | 'drafting' | 'review' | 'outline' | 'submitted' | 'complete';
  };
  progress: {
    value: number;
    tone?: 'blue' | 'green' | 'cyan';
  };
  deadline: {
    date: string;
    datetime: string;
    status: string;
    tone?: 'danger' | 'success';
  };
  collaborators: {
    initials: string[];
    extra: string;
  };
  updated: {
    label: string;
    datetime: string;
  };
};

@Component({
  selector: 'app-custom-dynamic-table',
  imports: [],
  templateUrl: './custom-dynamic-table.html',
  styleUrl: './custom-dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDynamicTable {
  readonly papers = input<PaperRow[]>([]);
}
