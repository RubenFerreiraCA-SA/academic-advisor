import { StatCardData } from "../../../pages/platform/components/stat-card/stat-card";

export const STAT_CARDS: StatCardData[] = [
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