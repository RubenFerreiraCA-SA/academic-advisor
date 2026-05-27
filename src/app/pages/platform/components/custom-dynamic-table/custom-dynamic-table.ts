import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export type PaperCategory = 'mine' | 'shared' | 'archived';

export type PaperRow = {
  title: string;
  featured?: boolean;
  topic: string;
  category: PaperCategory;
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

type Tab = 'all' | PaperCategory;

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'All Papers' },
  { id: 'mine', label: 'Mine' },
  { id: 'shared', label: 'Shared' },
  { id: 'archived', label: 'Archived' },
];

@Component({
  selector: 'app-custom-dynamic-table',
  imports: [],
  templateUrl: './custom-dynamic-table.html',
  styleUrl: './custom-dynamic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDynamicTable {
  readonly papers = input<PaperRow[]>([]);

  protected readonly tabs = TABS;
  protected readonly activeTab = signal<Tab>('all');

  protected readonly tabCounts = computed(() => {
    const all = this.papers();
    return {
      all: all.length,
      mine: all.filter(p => p.category === 'mine').length,
      shared: all.filter(p => p.category === 'shared').length,
      archived: all.filter(p => p.category === 'archived').length,
    };
  });

  protected readonly filteredPapers = computed(() => {
    const tab = this.activeTab();
    return tab === 'all' ? this.papers() : this.papers().filter(p => p.category === tab);
  });

  protected selectTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
