import { Paper, Paragraph, Sentence } from '@/types';

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
  return { id: generateId(), move: '', note: '', text: '', citation: '' };
}

export function emptyParagraph(): Paragraph {
  return {
    id: generateId(),
    theme: '',
    targetSentences: 0,
    notes: '',
    sentences: [],
  };
}

/** Bir paragrafın yazılmış cümlelerini tek bir metne birleştirir. */
export function assembleParagraph(paragraph: Paragraph): string {
  return paragraph.sentences
    .map((s) => s.text.trim())
    .filter((t) => t.length > 0)
    .join(' ');
}

export function paragraphWordCount(paragraph: Paragraph): number {
  return countWords(assembleParagraph(paragraph));
}

export function writtenSentenceCount(paragraph: Paragraph): number {
  return paragraph.sentences.filter((s) => s.text.trim().length > 0).length;
}

/**
 * Eski sürümlerden gelen kayıtları yeni yapıya taşır.
 * Eski şekilde paragrafın düz `content` metni vardı; onu cümlelere bölüp
 * her birini ayrı bir nesneye çeviriyoruz. Hiçbir metin atılmaz.
 */
function migratePaper(raw: any): Paper {
  const sections = (raw.sections ?? []).map((section: any) => {
    // Alt başlık katmanı yoksa (en eski sürüm) paragrafları tek bir
    // alt başlık altına topla.
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
              sentences: p.sentences.map((s: any) => ({
                id: s.id ?? generateId(),
                move: s.move ?? '',
                note: s.note ?? '',
                text: s.text ?? '',
                citation: s.citation ?? '',
              })),
            };
          }

          // Eski şekil: düz `content` metni.
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
              citation: '',
            })),
          };
        }),
      })),
    };
  });

  return { ...raw, sections } as Paper;
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
