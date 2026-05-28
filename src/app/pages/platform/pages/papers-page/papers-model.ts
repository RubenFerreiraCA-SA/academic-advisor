export type PaperCategory = 'mine' | 'shared' | 'archived';

export type PaperData = {
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