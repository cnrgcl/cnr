export interface Reference {
  id: string;
  inText: string; // metin içi ad: "Yılmaz", "Yılmaz ve Kaya", "Yılmaz vd."
  year: string;   // "2003"
  full: string;   // tam kaynakça satırı (APA)
}

export interface Sentence {
  id: string;
  move: string;         // retorik işlev — bu cümle ne iş yapıyor
  note: string;         // plan: ne diyecek
  text: string;         // gerçek cümle (atıf yazmadan)
  citations: string[];  // bağlı kaynakların id'leri
}

export interface Paragraph {
  id: string;
  theme: string;
  targetSentences: number;
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
  references: Reference[];
  createdAt: string;
  updatedAt: string;
}

export type SectionType = 'introduction' | 'methods' | 'results' | 'discussion';
