export interface Paragraph {
  id: string;
  title: string;
  content: string;
  notes: string;
  theme: string; // Paragrafın teması/amacı
  targetSentences: number; // Hedef cümle sayısı
}

export interface Subsection {
  id: string;
  title: string;
  targetParagraphs: number; // Hedef paragraf sayısı
  paragraphs: Paragraph[];
}

export interface Section {
  id: string;
  name: string;
  subsections: Subsection[];
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
