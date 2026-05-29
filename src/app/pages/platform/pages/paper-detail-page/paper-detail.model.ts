export interface PaperContent {
  uid: string;
  id: string;
  title: string;
  abstract: string;
  chapters: ChapterModel[];
  references: ReferenceModel[];
}

export interface ChapterModel {
  id: string;
  title: string;
  sections: SectionModel[];
}

export interface SectionModel {
  id: string;
  title: string;
  content: string;
}

export interface ReferenceModel {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  doi: string;
}