'use client';

import { useState, useEffect, useRef } from 'react';
import { Paper, Subsection } from '@/types';
import SubsectionEditor from '@/components/SubsectionEditor';
import { findMoveLabel } from '@/lib/moves';
import {
  generateId,
  countWords,
  savePaper,
  loadPaper,
  assembleParagraph,
  writtenSentenceCount,
  exportPaperAsJSON,
  importPaperFromJSON,
  WORDS_PER_SENTENCE,
} from '@/lib/utils';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function newPaper(): Paper {
  return {
    id: generateId(),
    title: 'Yeni Bilimsel Makale',
    abstractTR: '',
    abstractEN: '',
    keywordsTR: [],
    keywordsEN: [],
    sections: [
      { id: 'introduction', name: 'Giriş', subsections: [] },
      { id: 'methods', name: 'Yöntem', subsections: [] },
      { id: 'results', name: 'Bulgular', subsections: [] },
      { id: 'discussion', name: 'Tartışma', subsections: [] },
    ],
    references: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export default function Home() {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [activeSection, setActiveSection] = useState('introduction');
  const [lastSaved, setLastSaved] = useState('');
  const [showOutline, setShowOutline] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loaded = loadPaper();
    if (loaded) {
      setPaper(loaded);
      setLastSaved(new Date(loaded.updatedAt).toLocaleTimeString('tr-TR'));
    } else {
      setPaper(newPaper());
    }
  }, []);

  useEffect(() => {
    if (!paper) return;
    const timer = setTimeout(() => {
      savePaper({ ...paper, updatedAt: new Date().toISOString() });
      setLastSaved(new Date().toLocaleTimeString('tr-TR'));
    }, 2000);
    return () => clearTimeout(timer);
  }, [paper]);

  if (!paper) {
    return <div className="flex h-screen items-center justify-center">Yükleniyor...</div>;
  }

  const currentSection = paper.sections.find((s) => s.id === activeSection)!;

  // ---- istatistikler ----
  const allParagraphs = paper.sections.flatMap((s) =>
    s.subsections.flatMap((sub) => sub.paragraphs)
  );
  const plannedSentences = allParagraphs.reduce((n, p) => n + p.sentences.length, 0);
  const writtenSentences = allParagraphs.reduce((n, p) => n + writtenSentenceCount(p), 0);
  const targetSentences = allParagraphs.reduce((n, p) => n + p.targetSentences, 0);
  const totalWords = allParagraphs.reduce((n, p) => n + countWords(assembleParagraph(p)), 0);

  // ---- alt başlık işlemleri ----
  const addSubsection = (sectionId: string) => {
    const section = paper.sections.find((s) => s.id === sectionId)!;
    const sub: Subsection = {
      id: generateId(),
      title: `${section.subsections.length + 1}. Alt Başlık`,
      targetParagraphs: 0,
      paragraphs: [],
    };
    setPaper((prev) => ({
      ...prev!,
      sections: prev!.sections.map((s) =>
        s.id === sectionId ? { ...s, subsections: [...s.subsections, sub] } : s
      ),
    }));
  };

  const updateSubsection = (sectionId: string, subId: string, updates: Partial<Subsection>) => {
    setPaper((prev) => ({
      ...prev!,
      sections: prev!.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              subsections: s.subsections.map((sub) =>
                sub.id === subId ? { ...sub, ...updates } : sub
              ),
            }
          : s
      ),
    }));
  };

  const deleteSubsection = (sectionId: string, subId: string) => {
    setPaper((prev) => ({
      ...prev!,
      sections: prev!.sections.map((s) =>
        s.id === sectionId
          ? { ...s, subsections: s.subsections.filter((sub) => sub.id !== subId) }
          : s
      ),
    }));
  };

  const moveSubsection = (sectionId: string, subId: string, direction: 'up' | 'down') => {
    setPaper((prev) => {
      const section = prev!.sections.find((s) => s.id === sectionId)!;
      const idx = section.subsections.findIndex((sub) => sub.id === subId);
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= section.subsections.length) return prev!;

      const next = [...section.subsections];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return {
        ...prev!,
        sections: prev!.sections.map((s) =>
          s.id === sectionId ? { ...s, subsections: next } : s
        ),
      };
    });
  };

  // ---- dışa aktarma ----
  const exportToWord = () => {
    let html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${escapeHtml(paper.title)}</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.8; max-width: 800px; margin: 40px auto; padding: 0 20px; }
  h1 { text-align: center; font-size: 16pt; margin-bottom: 30px; }
  h2 { font-size: 14pt; margin-top: 30px; }
  h3 { font-size: 13pt; margin-top: 20px; }
  p { text-align: justify; margin-bottom: 12px; text-indent: 1.25cm; }
  .ozet { margin: 20px 0; padding: 15px; border: 1px solid #ccc; }
  .anahtar { font-style: italic; text-indent: 0; }
</style></head><body>
<h1>${escapeHtml(paper.title)}</h1>
<div class="ozet"><h2>Özet</h2><p>${escapeHtml(paper.abstractTR)}</p>
<p class="anahtar"><strong>Anahtar Kelimeler:</strong> ${escapeHtml(paper.keywordsTR.join(', '))}</p></div>
<div class="ozet"><h2>Abstract</h2><p>${escapeHtml(paper.abstractEN)}</p>
<p class="anahtar"><strong>Keywords:</strong> ${escapeHtml(paper.keywordsEN.join(', '))}</p></div>
`;

    paper.sections.forEach((section, sIdx) => {
      html += `<h2>${sIdx + 1}. ${escapeHtml(section.name)}</h2>\n`;
      section.subsections.forEach((sub, subIdx) => {
        html += `<h3>${sIdx + 1}.${subIdx + 1}. ${escapeHtml(sub.title)}</h3>\n`;
        sub.paragraphs.forEach((para) => {
          const text = assembleParagraph(para);
          if (text) html += `<p>${escapeHtml(text)}</p>\n`;
        });
      });
    });

    if (paper.references.length) {
      html += `<h2>Kaynakça</h2>\n`;
      paper.references.forEach((ref) => {
        html += `<p style="text-indent:0">${escapeHtml(ref)}</p>\n`;
      });
    }

    html += `</body></html>`;

    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paper.title.replace(/\s+/g, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    if (!confirm('Yedek yüklenecek ve mevcut çalışmanın üzerine yazılacak. Devam edilsin mi?')) {
      return;
    }
    try {
      const imported = await importPaperFromJSON(file);
      setPaper(imported);
      alert('Yedek yüklendi.');
    } catch {
      alert('Dosya okunamadı. Geçerli bir yedek dosyası mı?');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Plan görünümü */}
      {showOutline && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">📋 Makale Planı</h2>
              <button
                onClick={() => setShowOutline(false)}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                ✕ Kapat
              </button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-sm text-gray-600">Paragraf</div>
                <div className="text-2xl font-bold text-blue-600">{allParagraphs.length}</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-sm text-gray-600">Cümle yazıldı</div>
                <div className="text-2xl font-bold text-green-600">
                  {writtenSentences}/{plannedSentences}
                </div>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <div className="text-sm text-gray-600">Hedef cümle</div>
                <div className="text-2xl font-bold text-amber-600">{targetSentences}</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="text-sm text-gray-600">Kelime</div>
                <div className="text-2xl font-bold text-purple-600">{totalWords}</div>
                {targetSentences > 0 && (
                  <div className="text-xs text-gray-500">
                    ~{targetSentences * WORDS_PER_SENTENCE} tahmini
                  </div>
                )}
              </div>
            </div>

            {paper.sections.map((section, sIdx) => (
              <div key={section.id} className="mb-6">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  {sIdx + 1}. {section.name}
                </h3>
                {section.subsections.length === 0 ? (
                  <p className="ml-6 text-gray-500">Alt başlık eklenmemiş</p>
                ) : (
                  section.subsections.map((sub, subIdx) => (
                    <div key={sub.id} className="mb-4 ml-6 border-l-4 border-blue-300 pl-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold text-gray-700">
                          {sIdx + 1}.{subIdx + 1}. {sub.title}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {sub.paragraphs.length}/{sub.targetParagraphs} paragraf
                        </span>
                      </div>

                      {sub.paragraphs.map((para, pIdx) => (
                        <div key={para.id} className="mb-3 ml-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700">
                              P{pIdx + 1} · {para.theme || <em className="text-gray-400">tema yok</em>}
                            </span>
                            <span className="text-xs text-gray-500">
                              {writtenSentenceCount(para)}/{para.sentences.length}
                              {para.targetSentences > 0 ? ` (hedef ${para.targetSentences})` : ''} cümle
                            </span>
                          </div>
                          <ol className="ml-4 mt-1 space-y-0.5">
                            {para.sentences.map((s, i) => (
                              <li key={s.id} className="flex items-start gap-2 text-xs">
                                <span
                                  className={
                                    s.text.trim() ? 'text-green-600' : 'text-gray-300'
                                  }
                                >
                                  {s.text.trim() ? '●' : '○'}
                                </span>
                                <span className="text-gray-500">{i + 1}.</span>
                                {s.move && (
                                  <span className="rounded bg-gray-100 px-1.5 text-gray-700">
                                    {findMoveLabel(section.id, s.move)}
                                  </span>
                                )}
                                <span className="text-gray-600">
                                  {s.note || s.text.slice(0, 60)}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Üst çubuk */}
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <input
                type="text"
                value={paper.title}
                onChange={(e) => setPaper({ ...paper, title: e.target.value })}
                className="rounded border-none px-2 py-1 text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 px-2 text-sm text-gray-500">
                Son kayıt: {lastSaved} • {writtenSentences}/{plannedSentences} cümle •{' '}
                {totalWords} kelime
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowOutline(true)}
                className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
              >
                📋 Plan
              </button>
              <button
                onClick={() => exportPaperAsJSON(paper)}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
                title="Tüm çalışmayı JSON olarak indir"
              >
                💾 Yedekle
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
                title="JSON yedeğinden geri yükle"
              >
                📂 Geri yükle
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImport(file);
                  e.target.value = '';
                }}
              />
              <button
                onClick={exportToWord}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                📄 Word
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Uyarı */}
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          ⚠️ Çalışmanız yalnızca bu tarayıcıda saklanıyor. Tarayıcı verilerini temizlerseniz
          silinir. Düzenli olarak <strong>💾 Yedekle</strong> ile JSON dosyası indirin.
        </div>

        {/* Özet */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Özet / Abstract</h2>

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Türkçe Özet ({countWords(paper.abstractTR)} kelime)
          </label>
          <textarea
            value={paper.abstractTR}
            onChange={(e) => setPaper({ ...paper, abstractTR: e.target.value })}
            className="mb-4 h-28 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Türkçe özet..."
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            English Abstract ({countWords(paper.abstractEN)} kelime)
          </label>
          <textarea
            value={paper.abstractEN}
            onChange={(e) => setPaper({ ...paper, abstractEN: e.target.value })}
            className="mb-4 h-28 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="English abstract..."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Anahtar Kelimeler
              </label>
              <input
                type="text"
                value={paper.keywordsTR.join(', ')}
                onChange={(e) =>
                  setPaper({
                    ...paper,
                    keywordsTR: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="kelime1, kelime2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Keywords</label>
              <input
                type="text"
                value={paper.keywordsEN.join(', ')}
                onChange={(e) =>
                  setPaper({
                    ...paper,
                    keywordsEN: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="word1, word2"
              />
            </div>
          </div>
        </div>

        {/* Bölümler */}
        <div className="mb-6 rounded-lg bg-white shadow-sm">
          <nav className="flex flex-wrap border-b border-gray-200">
            {paper.sections.map((section) => {
              const count = section.subsections.reduce(
                (n, sub) => n + sub.paragraphs.reduce((m, p) => m + p.sentences.length, 0),
                0
              );
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`border-b-2 px-6 py-4 text-sm font-medium transition ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {section.name}
                  <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
                    {count} cümle
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{currentSection.name}</h2>
              <button
                onClick={() => addSubsection(activeSection)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                ➕ Yeni Alt Başlık
              </button>
            </div>

            {currentSection.subsections.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p className="mb-2 text-lg">Henüz alt başlık eklenmedi</p>
                <p className="text-sm">Yukarıdaki butonla başlayın</p>
              </div>
            ) : (
              currentSection.subsections.map((sub, index) => (
                <SubsectionEditor
                  key={sub.id}
                  subsection={sub}
                  sectionId={activeSection}
                  index={index}
                  total={currentSection.subsections.length}
                  onUpdate={(subId, updates) => updateSubsection(activeSection, subId, updates)}
                  onDelete={(subId) => deleteSubsection(activeSection, subId)}
                  onMove={(subId, dir) => moveSubsection(activeSection, subId, dir)}
                />
              ))
            )}
          </div>
        </div>

        {/* Kaynakça */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Kaynakça</h2>
          <div className="space-y-2">
            {paper.references.map((ref, index) => (
              <div key={index} className="flex gap-2">
                <span className="pt-2 font-mono text-gray-500">{index + 1}.</span>
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => {
                    const next = [...paper.references];
                    next[index] = e.target.value;
                    setPaper({ ...paper, references: next });
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Yılmaz, A. (2003). Başlık. Dergi, 12(3), 45-60."
                />
                <button
                  onClick={() =>
                    setPaper({
                      ...paper,
                      references: paper.references.filter((_, i) => i !== index),
                    })
                  }
                  className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
                >
                  🗑️
                </button>
              </div>
            ))}
            <button
              onClick={() => setPaper({ ...paper, references: [...paper.references, ''] })}
              className="w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-gray-600 transition hover:border-gray-400 hover:text-gray-700"
            >
              + Yeni Kaynak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
