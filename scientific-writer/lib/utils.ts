import { Paper, Paragraph, Sentence, Reference } from '@/types';

const STORAGE_KEY = 'scientific-paper';

// Türkçe akademik metinde ortalama cümle uzunluğu. Kaba bir tahmin —
// kelime sayısı öngörüsü için kullanılır, kesin bir ölçü değildir.
export const WORDS_PER_SENTENCE = 20;

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function countWords(text: string): number {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

export function emptySentence(): Sentence {
  return { id: generateId(), move: '', note: '', text: '', citations: [] };
}

export function emptyParagraph(): Paragraph {
  return { id: generateId(), theme: '', targetSentences: 0, notes: '', sentences: [] };
}

export function emptyReference(): Reference {
  return { id: generateId(), inText: '', year: '', full: '' };
}

export function isReferenceIncomplete(ref: Reference): boolean {
  return !ref.full.trim() || !ref.inText.trim() || !ref.year.trim();
}

/**
 * Tam kaynakça satırından metin içi ad ve yılı tahmin eder.
 * Yalnızca alanlar boşken öneri olarak kullanılır — yanılması zararsızdır.
 */
export function guessReferenceFields(full: string): { inText: string; year: string } {
  const parenYear = full.match(/\((\d{4})[a-z]?\)/);
  const bareYear = full.match(/\b((?:19|20)\d{2})\b/);
  const year = parenYear ? parenYear[1] : bareYear ? bareYear[1] : '';

  const beforeComma = full.split(',')[0].trim();
  const inText = beforeComma.length > 0 && beforeComma.length <= 40 ? beforeComma : '';

  return { inText, year };
}

/** Tek bir kaynağın metin içi gösterimi: "Yılmaz, 2003" */
export function inTextLabel(ref: Reference): string {
  const name = ref.inText.trim() || '?';
  const year = ref.year.trim() || 't.y.';
  return `${name}, ${year}`;
}

export function findReference(refs: Reference[], id: string): Reference | undefined {
  return refs.find((r) => r.id === id);
}

/** Bir cümlenin atıf öbeği: "(Yılmaz, 2003; Kaya, 2011)" */
export function citationBlock(sentence: Sentence, refs: Reference[]): string {
  const labels = sentence.citations
    .map((id) => findReference(refs, id))
    .filter((r): r is Reference => Boolean(r))
    .map(inTextLabel);
  return labels.length ? `(${labels.join('; ')})` : '';
}

/**
 * Cümleyi atıflarıyla birlikte üretir. Atıf, APA'daki gibi cümle sonundaki
 * noktalama işaretinden önce yerleştirilir.
 */
export function renderSentence(sentence: Sentence, refs: Reference[]): string {
  const text = sentence.text.trim();
  if (!text) return '';

  const block = citationBlock(sentence, refs);
  if (!block) return text;

  const ending = text.match(/[.!?]+$/);
  if (ending) {
    return `${text.slice(0, -ending[0].length).trimEnd()} ${block}${ending[0]}`;
  }
  return `${text} ${block}`;
}

/** Paragrafın yazılmış cümlelerini atıflarıyla birlikte tek metne birleştirir. */
export function assembleParagraph(paragraph: Paragraph, refs: Reference[] = []): string {
  return paragraph.sentences
    .map((s) => renderSentence(s, refs))
    .filter((t) => t.length > 0)
    .join(' ');
}

export function writtenSentenceCount(paragraph: Paragraph): number {
  return paragraph.sentences.filter((s) => s.text.trim().length > 0).length;
}

export function allSentences(paper: Paper): Sentence[] {
  return paper.sections.flatMap((s) =>
    s.subsections.flatMap((sub) => sub.paragraphs.flatMap((p) => p.sentences))
  );
}

/** Bir kaynağın kaç cümlede kullanıldığı. */
export function referenceUsage(paper: Paper, refId: string): number {
  return allSentences(paper).filter((s) => s.citations.includes(refId)).length;
}

/** Bir kaynağın kullanıldığı yerler — "1.1 · P2 · C3" biçiminde. */
export function referenceLocations(paper: Paper, refId: string): string[] {
  const spots: string[] = [];
  paper.sections.forEach((section, sIdx) => {
    section.subsections.forEach((sub, subIdx) => {
      sub.paragraphs.forEach((para, pIdx) => {
        para.sentences.forEach((sentence, senIdx) => {
          if (sentence.citations.includes(refId)) {
            spots.push(`${sIdx + 1}.${subIdx + 1} · P${pIdx + 1} · C${senIdx + 1}`);
          }
        });
      });
    });
  });
  return spots;
}

/** Kaynakçayı tam satıra göre Türkçe alfabetik sıralar. */
export function sortReferences(refs: Reference[]): Reference[] {
  return [...refs].sort((a, b) => a.full.localeCompare(b.full, 'tr'));
}

/**
 * Eski sürümlerden gelen kayıtları yeni yapıya taşır. Hiçbir veri atılmaz:
 * serbest metin atıflar kaynakçaya yeni birer kayıt olarak eklenir.
 */
function migratePaper(raw: any): Paper {
  // 1) Kaynakça: string[] -> Reference[]
  const references: Reference[] = (raw.references ?? []).map((ref: any) => {
    if (typeof ref === 'string') {
      const guess = guessReferenceFields(ref);
      return { id: generateId(), inText: guess.inText, year: guess.year, full: ref };
    }
    return {
      id: ref.id ?? generateId(),
      inText: ref.inText ?? '',
      year: ref.year ?? '',
      full: ref.full ?? '',
    };
  });

  // Eski serbest metin atıfları tekilleştirerek kaynakçaya taşımak için
  const legacyByText = new Map<string, string>();
  const ensureLegacyReference = (text: string): string => {
    const key = text.trim();
    const existing = legacyByText.get(key);
    if (existing) return existing;

    const already = references.find((r) => r.full.trim() === key);
    if (already) {
      legacyByText.set(key, already.id);
      return already.id;
    }

    const guess = guessReferenceFields(key);
    const created: Reference = {
      id: generateId(),
      inText: guess.inText,
      year: guess.year,
      full: key,
    };
    references.push(created);
    legacyByText.set(key, created.id);
    return created.id;
  };

  const migrateSentence = (s: any): Sentence => {
    let citations: string[] = [];
    if (Array.isArray(s.citations)) {
      citations = s.citations;
    } else if (typeof s.citation === 'string' && s.citation.trim()) {
      citations = [ensureLegacyReference(s.citation)];
    }
    return {
      id: s.id ?? generateId(),
      move: s.move ?? '',
      note: s.note ?? '',
      text: s.text ?? '',
      citations,
    };
  };

  // 2) Bölümler
  const sections = (raw.sections ?? []).map((section: any) => {
    const subsections =
      section.subsections ??
      (section.paragraphs?.length
        ? [
            {
              id: generateId(),
              title: 'Alt başlık 1',
              targetParagraphs: 0,
              paragraphs: section.paragraphs,
            },
          ]
        : []);

    return {
      ...section,
      subsections: subsections.map((sub: any) => ({
        id: sub.id ?? generateId(),
        title: sub.title ?? '',
        targetParagraphs: sub.targetParagraphs ?? 0,
        paragraphs: (sub.paragraphs ?? []).map((p: any): Paragraph => {
          if (Array.isArray(p.sentences)) {
            return {
              id: p.id ?? generateId(),
              theme: p.theme ?? '',
              targetSentences: p.targetSentences ?? 0,
              notes: p.notes ?? '',
              sentences: p.sentences.map(migrateSentence),
            };
          }

          // En eski şekil: paragrafın düz `content` metni.
          const chunks: string[] = (p.content ?? '')
            .split(/(?<=[.!?])\s+/)
            .map((c: string) => c.trim())
            .filter((c: string) => c.length > 0);

          return {
            id: p.id ?? generateId(),
            theme: p.theme || p.title || '',
            targetSentences: p.targetSentences ?? 0,
            notes: p.notes ?? '',
            sentences: chunks.map((text) => ({
              id: generateId(),
              move: '',
              note: '',
              text,
              citations: [],
            })),
          };
        }),
      })),
    };
  });

  return { ...raw, sections, references } as Paper;
}

export function savePaper(paper: Paper): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(paper));
  } catch (error) {
    console.error('Kayıt hatası:', error);
  }
}

export function loadPaper(): Paper | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return migratePaper(JSON.parse(stored));
  } catch (error) {
    console.error('Yükleme hatası:', error);
    return null;
  }
}

export function clearPaper(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportPaperAsJSON(paper: Paper): void {
  const blob = new Blob([JSON.stringify(paper, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${paper.title.replace(/\s+/g, '_')}_yedek.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importPaperFromJSON(file: File): Promise<Paper> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(migratePaper(JSON.parse(e.target?.result as string)));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
