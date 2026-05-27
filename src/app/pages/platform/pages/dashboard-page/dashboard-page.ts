import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomDynamicTable, PaperRow } from '../../components/custom-dynamic-table/custom-dynamic-table';

type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'total' | 'drafting' | 'review' | 'revision' | 'submitted' | 'complete';
  trendIcon?: string;
};

@Component({
  selector: 'app-dashboard-page',
  imports: [CustomDynamicTable],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  protected readonly stats: DashboardStat[] = [
    {
      label: 'Total Papers',
      value: '24',
      detail: '3 this month',
      icon: 'document-lines',
      tone: 'total',
      trendIcon: '↗',
    },
    {
      label: 'Drafting',
      value: '7',
      detail: '29% of total',
      icon: 'document-pencil',
      tone: 'drafting',
    },
    {
      label: 'Under Review',
      value: '5',
      detail: '21% of total',
      icon: 'review-search',
      tone: 'review',
    },
    {
      label: 'Revision',
      value: '6',
      detail: '25% of total',
      icon: 'document-status',
      tone: 'revision',
    },
    {
      label: 'Submitted',
      value: '3',
      detail: '13% of total',
      icon: 'document-simple',
      tone: 'submitted',
    },
    {
      label: 'Completed',
      value: '3',
      detail: '12% of total',
      icon: 'check-circle',
      tone: 'complete',
    },
  ];

  protected readonly papers: PaperRow[] = [
    {
      title: 'Synthetic Intelligence and Origination',
      featured: true,
      topic: 'AI · Creativity · Cognition',
      category: 'mine',
      stage: {
        label: 'Revision',
        tone: 'revision',
      },
      progress: {
        value: 73,
      },
      deadline: {
        date: 'Jun 28, 2024',
        datetime: '2024-06-28',
        status: '5 days left',
        tone: 'danger',
      },
      collaborators: {
        initials: ['AL', 'RN', 'MK'],
        extra: '+2',
      },
      updated: {
        label: 'May 23, 10:42 AM',
        datetime: '2024-05-23T10:42',
      },
    },
    {
      title: 'Deep Learning for Medical Imaging',
      topic: 'AI · Medical Imaging · CNN',
      category: 'mine',
      stage: {
        label: 'Drafting',
        tone: 'drafting',
      },
      progress: {
        value: 65,
        tone: 'blue',
      },
      deadline: {
        date: 'May 31, 2024',
        datetime: '2024-05-31',
        status: '8 days left',
        tone: 'danger',
      },
      collaborators: {
        initials: ['SK', 'JM', 'AT'],
        extra: '+3',
      },
      updated: {
        label: 'May 22, 3:15 PM',
        datetime: '2024-05-22T15:15',
      },
    },
    {
      title: 'Climate Change Policy Review',
      topic: 'Climate · Policy · Environment',
      category: 'shared',
      stage: {
        label: 'Review',
        tone: 'review',
      },
      progress: {
        value: 48,
      },
      deadline: {
        date: 'Jun 10, 2024',
        datetime: '2024-06-10',
        status: '21 days left',
      },
      collaborators: {
        initials: ['EV', 'BW', 'NO'],
        extra: '+1',
      },
      updated: {
        label: 'May 21, 9:05 AM',
        datetime: '2024-05-21T09:05',
      },
    },
    {
      title: 'Quantum Networks Survey',
      topic: 'Quantum · Networks · Security',
      category: 'shared',
      stage: {
        label: 'Outline',
        tone: 'outline',
      },
      progress: {
        value: 28,
        tone: 'green',
      },
      deadline: {
        date: 'Jul 1, 2024',
        datetime: '2024-07-01',
        status: '42 days left',
      },
      collaborators: {
        initials: ['QC', 'LD', 'TS'],
        extra: '+2',
      },
      updated: {
        label: 'May 16, 4:23 PM',
        datetime: '2024-05-16T16:23',
      },
    },
    {
      title: 'Federated Learning in Healthcare',
      topic: 'AI · Privacy · Healthcare',
      category: 'shared',
      stage: {
        label: 'Drafting',
        tone: 'drafting',
      },
      progress: {
        value: 35,
        tone: 'blue',
      },
      deadline: {
        date: 'Jun 18, 2024',
        datetime: '2024-06-18',
        status: '31 days left',
      },
      collaborators: {
        initials: ['HP', 'MA', 'JL'],
        extra: '+1',
      },
      updated: {
        label: 'May 18, 1:10 PM',
        datetime: '2024-05-18T13:10',
      },
    },
    {
      title: 'Robust Optimization for Supply Chains',
      topic: 'Operations · Optimization',
      category: 'mine',
      stage: {
        label: 'Submitted',
        tone: 'submitted',
      },
      progress: {
        value: 100,
        tone: 'cyan',
      },
      deadline: {
        date: 'May 10, 2024',
        datetime: '2024-05-10',
        status: 'Submitted',
        tone: 'success',
      },
      collaborators: {
        initials: ['OS', 'KV', 'TR'],
        extra: '+4',
      },
      updated: {
        label: 'May 10, 10:20 AM',
        datetime: '2024-05-10T10:20',
      },
    },
    {
      title: 'Explainable AI: A Systematic Review',
      topic: 'AI · Explainability · Survey',
      category: 'archived',
      stage: {
        label: 'Complete',
        tone: 'complete',
      },
      progress: {
        value: 100,
        tone: 'green',
      },
      deadline: {
        date: 'Apr 20, 2024',
        datetime: '2024-04-20',
        status: 'Published',
        tone: 'success',
      },
      collaborators: {
        initials: ['XA', 'SP', 'NU'],
        extra: '+5',
      },
      updated: {
        label: 'Apr 20, 2:45 PM',
        datetime: '2024-04-20T14:45',
      },
    },
  ];
}
