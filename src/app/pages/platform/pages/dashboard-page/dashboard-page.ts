import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomDynamicTable, DynamicTableConfig, TabConfig } from '../../components/custom-dynamic-table/custom-dynamic-table';

type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  icon: string;
  tone: 'total' | 'drafting' | 'review' | 'revision' | 'submitted' | 'complete';
  trendIcon?: string;
};

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

  private readonly paperTabs: TabConfig[] = [
    { id: 'all', label: 'All Papers' },
    { id: 'mine', label: 'Mine', filter: (row) => (row as PaperRow).category === 'mine' },
    { id: 'shared', label: 'Shared', filter: (row) => (row as PaperRow).category === 'shared' },
    { id: 'archived', label: 'Archived', filter: (row) => (row as PaperRow).category === 'archived' },
  ];

  protected readonly papers: PaperRow[] = [
    {
      title: 'Synthetic Intelligence and Origination',
      featured: true,
      topic: 'AI · Creativity · Cognition',
      category: 'mine',
      stage: { label: 'Revision', tone: 'revision' },
      progress: { value: 73 },
      deadline: { date: 'Jun 28, 2024', datetime: '2024-06-28', status: '5 days left', tone: 'danger' },
      collaborators: { initials: ['AL', 'RN', 'MK'], extra: '+2' },
      updated: { label: 'May 23, 10:42 AM', datetime: '2024-05-23T10:42' },
    },
    {
      title: 'Deep Learning for Medical Imaging',
      topic: 'AI · Medical Imaging · CNN',
      category: 'mine',
      stage: { label: 'Drafting', tone: 'drafting' },
      progress: { value: 65, tone: 'blue' },
      deadline: { date: 'May 31, 2024', datetime: '2024-05-31', status: '8 days left', tone: 'danger' },
      collaborators: { initials: ['SK', 'JM', 'AT'], extra: '+3' },
      updated: { label: 'May 22, 3:15 PM', datetime: '2024-05-22T15:15' },
    },
    {
      title: 'Climate Change Policy Review',
      topic: 'Climate · Policy · Environment',
      category: 'shared',
      stage: { label: 'Review', tone: 'review' },
      progress: { value: 48 },
      deadline: { date: 'Jun 10, 2024', datetime: '2024-06-10', status: '21 days left' },
      collaborators: { initials: ['EV', 'BW', 'NO'], extra: '+1' },
      updated: { label: 'May 21, 9:05 AM', datetime: '2024-05-21T09:05' },
    },
    {
      title: 'Quantum Networks Survey',
      topic: 'Quantum · Networks · Security',
      category: 'shared',
      stage: { label: 'Outline', tone: 'outline' },
      progress: { value: 28, tone: 'green' },
      deadline: { date: 'Jul 1, 2024', datetime: '2024-07-01', status: '42 days left' },
      collaborators: { initials: ['QC', 'LD', 'TS'], extra: '+2' },
      updated: { label: 'May 16, 4:23 PM', datetime: '2024-05-16T16:23' },
    },
    {
      title: 'Federated Learning in Healthcare',
      topic: 'AI · Privacy · Healthcare',
      category: 'shared',
      stage: { label: 'Drafting', tone: 'drafting' },
      progress: { value: 35, tone: 'blue' },
      deadline: { date: 'Jun 18, 2024', datetime: '2024-06-18', status: '31 days left' },
      collaborators: { initials: ['HP', 'MA', 'JL'], extra: '+1' },
      updated: { label: 'May 18, 1:10 PM', datetime: '2024-05-18T13:10' },
    },
    {
      title: 'Robust Optimization for Supply Chains',
      topic: 'Operations · Optimization',
      category: 'mine',
      stage: { label: 'Submitted', tone: 'submitted' },
      progress: { value: 100, tone: 'cyan' },
      deadline: { date: 'May 10, 2024', datetime: '2024-05-10', status: 'Submitted', tone: 'success' },
      collaborators: { initials: ['OS', 'KV', 'TR'], extra: '+4' },
      updated: { label: 'May 10, 10:20 AM', datetime: '2024-05-10T10:20' },
    },
    {
      title: 'Explainable AI: A Systematic Review',
      topic: 'AI · Explainability · Survey',
      category: 'archived',
      stage: { label: 'Complete', tone: 'complete' },
      progress: { value: 100, tone: 'green' },
      deadline: { date: 'Apr 20, 2024', datetime: '2024-04-20', status: 'Published', tone: 'success' },
      collaborators: { initials: ['XA', 'SP', 'NU'], extra: '+5' },
      updated: { label: 'Apr 20, 2:45 PM', datetime: '2024-04-20T14:45' },
    },
    {
      title: 'Graph Neural Networks for Drug Discovery',
      topic: 'AI · Drug Discovery · GNN',
      category: 'mine',
      stage: { label: 'Review', tone: 'review' },
      progress: { value: 82 },
      deadline: { date: 'Jul 15, 2024', datetime: '2024-07-15', status: '26 days left' },
      collaborators: { initials: ['DR', 'PL'], extra: '+1' },
      updated: { label: 'May 25, 11:00 AM', datetime: '2024-05-25T11:00' },
    },
    {
      title: 'Ethical Implications of LLMs in Education',
      topic: 'AI · Ethics · Education',
      category: 'shared',
      stage: { label: 'Drafting', tone: 'drafting' },
      progress: { value: 55, tone: 'blue' },
      deadline: { date: 'Aug 1, 2024', datetime: '2024-08-01', status: '43 days left' },
      collaborators: { initials: ['CE', 'MR', 'BT'], extra: '+2' },
      updated: { label: 'May 24, 9:30 AM', datetime: '2024-05-24T09:30' },
    },
    {
      title: 'Transformer Architectures: A Survey',
      topic: 'AI · NLP · Transformers',
      category: 'archived',
      stage: { label: 'Complete', tone: 'complete' },
      progress: { value: 100, tone: 'green' },
      deadline: { date: 'Mar 5, 2024', datetime: '2024-03-05', status: 'Published', tone: 'success' },
      collaborators: { initials: ['TA', 'KS'], extra: '+3' },
      updated: { label: 'Mar 5, 3:00 PM', datetime: '2024-03-05T15:00' },
    },
    {
      title: 'Reinforcement Learning for Robotics',
      topic: 'AI · Robotics · RL',
      category: 'mine',
      stage: { label: 'Outline', tone: 'outline' },
      progress: { value: 18, tone: 'green' },
      deadline: { date: 'Sep 10, 2024', datetime: '2024-09-10', status: '83 days left' },
      collaborators: { initials: ['RL', 'GH'], extra: '' },
      updated: { label: 'May 20, 4:15 PM', datetime: '2024-05-20T16:15' },
    },
    {
      title: 'Privacy-Preserving Machine Learning',
      topic: 'AI · Privacy · Cryptography',
      category: 'shared',
      stage: { label: 'Review', tone: 'review' },
      progress: { value: 70 },
      deadline: { date: 'Jun 30, 2024', datetime: '2024-06-30', status: '7 days left', tone: 'danger' },
      collaborators: { initials: ['PP', 'AS', 'TW'], extra: '+1' },
      updated: { label: 'May 23, 2:00 PM', datetime: '2024-05-23T14:00' },
    },
    {
      title: 'Causal Inference in Observational Studies',
      topic: 'Statistics · Causal AI',
      category: 'archived',
      stage: { label: 'Complete', tone: 'complete' },
      progress: { value: 100, tone: 'cyan' },
      deadline: { date: 'Feb 14, 2024', datetime: '2024-02-14', status: 'Published', tone: 'success' },
      collaborators: { initials: ['CI', 'LM'], extra: '+4' },
      updated: { label: 'Feb 14, 10:00 AM', datetime: '2024-02-14T10:00' },
    },
    {
      title: 'Multi-Modal Learning for Vision-Language',
      topic: 'AI · Vision · NLP',
      category: 'shared',
      stage: { label: 'Drafting', tone: 'drafting' },
      progress: { value: 42, tone: 'blue' },
      deadline: { date: 'Jul 22, 2024', datetime: '2024-07-22', status: '33 days left' },
      collaborators: { initials: ['VL', 'NP', 'JK'], extra: '+2' },
      updated: { label: 'May 22, 8:45 AM', datetime: '2024-05-22T08:45' },
    },
  ];

  protected readonly tableConfig: DynamicTableConfig = {
    data: this.papers,
    tabs: this.paperTabs,
    columns: [
      {
        key: 'title',
        header: 'Paper / Topic',
        width: '30%',
        cell: {
          type: 'text',
          primary: (row) => (row as PaperRow).title,
          secondary: (row) => (row as PaperRow).topic,
          badge: (row) => (row as PaperRow).featured ? '★' : '',
        },
      },
      {
        key: 'stage',
        header: 'Stage',
        cell: {
          type: 'badge',
          label: (row) => (row as PaperRow).stage.label,
          tone: (row) => (row as PaperRow).stage.tone,
        },
      },
      {
        key: 'progress',
        header: 'Progress',
        width: '210px',
        cell: {
          type: 'progress',
          value: (row) => (row as PaperRow).progress.value,
          tone: (row) => (row as PaperRow).progress.tone,
        },
      },
      {
        key: 'deadline',
        header: 'Deadline',
        cell: {
          type: 'date',
          label: (row) => (row as PaperRow).deadline.date,
          datetime: (row) => (row as PaperRow).deadline.datetime,
          secondary: (row) => (row as PaperRow).deadline.status,
          secondaryTone: (row) => (row as PaperRow).deadline.tone,
        },
      },
      {
        key: 'collaborators',
        header: 'Collaborators',
        width: '170px',
        cell: {
          type: 'avatars',
          initials: (row) => (row as PaperRow).collaborators.initials,
          extra: (row) => (row as PaperRow).collaborators.extra,
        },
      },
      {
        key: 'updated',
        header: 'Last Updated',
        cell: {
          type: 'date',
          label: (row) => (row as PaperRow).updated.label,
          datetime: (row) => (row as PaperRow).updated.datetime,
        },
      },
      {
        key: 'actions',
        header: 'Actions',
        srOnly: true,
        cell: { type: 'action', ariaLabel: 'More actions' },
      },
    ],
  };
}
