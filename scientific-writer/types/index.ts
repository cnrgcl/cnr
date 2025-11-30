export interface Paragraph {
  id: string;
  title: string;
  content: string;
  notes: string;
}

export interface Section {
  id: string;
  name: string;
  paragraphs: Paragraph[];
}

export interface Paper {
  id: string;
  title: string;
  abstractTR: string;
  abstractEN: string;
  keywordsTR: string[];
  keywordsEN: string[];
  sections: Section[];
  references: string[];
  createdAt: string;
  updatedAt: string;
}

export type SectionType = 'introduction' | 'methods' | 'results' | 'discussion';
