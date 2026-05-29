export type TemplateCategory = 'manuscript' | 'review' | 'outline' | 'submission' | 'cover-letter';
export type TemplateVisibility = 'personal' | 'shared';

export interface TemplateData {
  uid: string;
  title: string;
  description: string;
  category: TemplateCategory;
  visibility: TemplateVisibility;
  usageCount: number;
  lastUsed: string;
  lastUsedDatetime: string;
  createdBy: string;
  tags: string[];
}
