export type PaperCategory = 'mine' | 'shared' | 'archived';

export type PaperStage =
  | 'concept' | 'positioning' | 'blueprint' | 'drafting'
  | 'peer-review' | 'game-plan' | 'revision' | 'submission-ready'
  | 'submitted' | 'external-review' | 'revise-resubmit' | 'published';

export type PaperData = {
  uid: string;
  title: string;
  featured?: boolean;
  topic: string;
  category: PaperCategory;
  stage: {
    label: string;
    tone: PaperStage;
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
