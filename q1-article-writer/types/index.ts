export interface LiteratureSummary {
  id: string;
  title: string;
  authors: string;
  year: string;
  summary: string;
  keyFindings: string;
  methodology?: string;
  citation?: string;
}

export interface ArticleSection {
  type: 'introduction' | 'literature' | 'methodology' | 'results' | 'discussion' | 'conclusion';
  content: string;
  references?: string[];
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  sections: ArticleSection[];
  references: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HumanizationMetrics {
  aiDetectionScore: number; // 0-100, lower is better
  humanLikeScore: number; // 0-100, higher is better
  perplexity: 'low' | 'medium' | 'high';
  burstiness: 'low' | 'medium' | 'high';
  readabilityScore: number;
  academicQuality: number;
}

export interface GenerationRequest {
  literatureSummaries: LiteratureSummary[];
  sectionType: ArticleSection['type'];
  articleTitle?: string;
  researchQuestion?: string;
  additionalContext?: string;
  humanizationLevel: 'low' | 'medium' | 'high';
}

export interface GenerationResponse {
  content: string;
  metrics: HumanizationMetrics;
  suggestions?: string[];
}
