import { Paper } from '@/types';

const STORAGE_KEY = 'scientific-paper';

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function countWords(text: string): number {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

export function savePaper(paper: Paper): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(paper));
  } catch (error) {
    console.error('Error saving paper:', error);
  }
}

export function loadPaper(): Paper | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading paper:', error);
    return null;
  }
}

export function clearPaper(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportPaperAsJSON(paper: Paper): void {
  const dataStr = JSON.stringify(paper, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${paper.title.replace(/\s+/g, '_')}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importPaperFromJSON(file: File): Promise<Paper> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const paper = JSON.parse(e.target?.result as string);
        resolve(paper);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
