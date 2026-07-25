export interface Sentence {
  id: string;
  move: string;      // retorik işlev — bu cümle ne iş yapıyor
  note: string;      // plan: ne diyecek
  text: string;      // gerçek cümle
  citation: string;  // hangi kaynağa dayanıyor
}

export interface Paragraph {
  id: string;
  theme: string;            // paragrafın tek cümlelik amacı
  targetSentences: number;  // hedef cümle sayısı
  notes: string;
  sentences: Sentence[];
}

export interface Subsection {
  id: string;
  title: string;
  targetParagraphs: number;
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
