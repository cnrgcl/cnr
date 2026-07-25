'use client';

import { useState, useEffect, useRef } from 'react';
import { Paper, Subsection, Reference } from '@/types';
import SubsectionEditor from '@/components/SubsectionEditor';
import { findMoveLabel, MOVE_SET_OPTIONS } from '@/lib/moves';
import { auditPaper, countBySeverity, Finding, Severity } from '@/lib/audit';
import {
  generateId,
  countWords,
  savePaper,
  loadPaper,
  assembleParagraph,
  writtenSentenceCount,
  exportPaperAsJSON,
  importPaperFromJSON,
  emptyReference,
  guessReferenceFields,
  isReferenceIncomplete,
  inTextLabel,
  referenceUsage,
  referenceLocations,
  sortReferences,
  allSentences,
  WORDS_PER_SENTENCE,
} from '@/lib/utils';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function newPaper(): Paper {
  return {
    id: generateId(),
    title: 'Yeni Bilimsel Makale',
    abstractTR: '',
    abstractEN: '',
    keywordsTR: [],
    keywordsEN: [],
    // Sosyal bilimlerde yerleşik düzen: literatür taraması ve sonuç ayrı
    // bölümlerdir. Bölümler sonradan eklenip çıkarılabilir.
    sections: [
      { id: 'introduction', name: 'Giriş', moveSet: 'introduction', subsections: [] },
      { id: 'literature', name: 'Literatür Taraması', moveSet: 'literature', subsections: [] },
      { id: 'methods', name: 'Yöntem', moveSet: 'methods', subsections: [] },
      { id: 'results', name: 'Bulgular', moveSet: 'results', subsections: [] },
      { id: 'discussion', name: 'Tartışma', moveSet: 'discussion', subsections: [] },
      { id: 'conclusion', name: 'Sonuç', moveSet: 'conclusion', subsections: [] },
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
  const [showAudit, setShowAudit] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  const [expandedRef, setExpandedRef] = useState<string | null>(null);
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

  // Aktif bölüm silinmiş olabilir; ilk bölüme düş.
  const currentSection =
    paper.sections.find((s) => s.id === activeSection) ?? paper.sections[0];

  // ---- istatistikler ----
  const allParagraphs = paper.sections.flatMap((s) =>
    s.subsections.flatMap((sub) => sub.paragraphs)
  );
  const sentences = allSentences(paper);
  const plannedSentences = sentences.length;
  const writtenSentences = allParagraphs.reduce((n, p) => n + writtenSentenceCount(p), 0);
  const targetSentences = allParagraphs.reduce((n, p) => n + p.targetSentences, 0);
  const totalWords = allParagraphs.reduce(
    (n, p) => n + countWords(p.sentences.map((s) => s.text).join(' ')),
    0
  );
  const citedSentences = sentences.filter((s) => s.citations.length > 0).length;
  const unusedRefs = paper.references.filter((r) => referenceUsage(paper, r.id) === 0);
  const incompleteRefs = paper.references.filter(isReferenceIncomplete);

  const findings = auditPaper(paper);
  const findingCounts = countBySeverity(findings);

  /** Bulgunun işaret ettiği yere git. */
  const jumpTo = (finding: Finding) => {
    if (finding.sectionId) setActiveSection(finding.sectionId);
    setShowAudit(false);
    if (finding.anchorId) {
      setTimeout(() => {
        document
          .getElementById(finding.anchorId!)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }
  };

  // ---- kaynakça işlemleri ----
  const createReference = (): string => {
    const ref = emptyReference();
    setPaper((prev) => ({ ...prev!, references: [...prev!.references, ref] }));
    return ref.id;
  };

  const updateReference = (refId: string, updates: Partial<Reference>) => {
    setPaper((prev) => ({
      ...prev!,
      references: prev!.references.map((r) => (r.id === refId ? { ...r, ...updates } : r)),
    }));
  };

  /** Tam satır yazılıp alandan çıkılınca boş kalan alanları tahminle doldurur. */
  const autofillReference = (refId: string) => {
    setPaper((prev) => ({
      ...prev!,
      references: prev!.references.map((r) => {
        if (r.id !== refId || !r.full.trim()) return r;
        if (r.inText.trim() && r.year.trim()) return r;
        const guess = guessReferenceFields(r.full);
        return {
          ...r,
          inText: r.inText.trim() || guess.inText,
          year: r.year.trim() || guess.year,
        };
      }),
    }));
  };

  /** Kaynağı siler ve bağlı olduğu tüm cümlelerden bağlantısını kaldırır. */
  const deleteReference = (refId: string) => {
    const usage = referenceUsage(paper, refId);
    if (usage > 0) {
      const ok = confirm(
        `Bu kaynak ${usage} cümlede kullanılıyor. Silinirse o cümlelerdeki bağlantılar da kaldırılacak. Devam edilsin mi?`
      );
      if (!ok) return;
    }

    setPaper((prev) => ({
      ...prev!,
      references: prev!.references.filter((r) => r.id !== refId),
      sections: prev!.sections.map((section) => ({
        ...section,
        subsections: section.subsections.map((sub) => ({
          ...sub,
          paragraphs: sub.paragraphs.map((para) => ({
            ...para,
            sentences: para.sentences.map((s) => ({
              ...s,
              citations: s.citations.filter((id) => id !== refId),
            })),
          })),
        })),
      })),
    }));
  };

  // ---- bölüm işlemleri ----
  const addSection = () => {
    const section = {
      id: generateId(),
      name: 'Yeni Bölüm',
      moveSet: '',
      subsections: [],
    };
    setPaper((prev) => ({ ...prev!, sections: [...prev!.sections, section] }));
    setActiveSection(section.id);
  };

  const updateSection = (sectionId: string, updates: { name?: string; moveSet?: string }) => {
    setPaper((prev) => ({
      ...prev!,
      sections: prev!.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)),
    }));
  };

  const deleteSection = (sectionId: string) => {
    const section = paper.sections.find((s) => s.id === sectionId)!;
    const paraCount = section.subsections.reduce((n, sub) => n + sub.paragraphs.length, 0);
    const warning =
      paraCount > 0
        ? `"${section.name}" bölümünde ${section.subsections.length} alt başlık ve ${paraCount} paragraf var. Hepsi silinecek. Devam edilsin mi?`
        : `"${section.name}" bölümü silinsin mi?`;
    if (!confirm(warning)) return;

    setPaper((prev) => ({
      ...prev!,
      sections: prev!.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    setPaper((prev) => {
      const idx = prev!.sections.findIndex((s) => s.id === sectionId);
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev!.sections.length) return prev!;

      const next = [...prev!.sections];
      [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
      return { ...prev!, sections: next };
    });
  };

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
  .kaynak { text-indent: 0; padding-left: 1.25cm; }
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
          const text = assembleParagraph(para, paper.references);
          if (text) html += `<p>${escapeHtml(text)}</p>\n`;
        });
      });
    });

    if (paper.references.length) {
      html += `<h2>Kaynakça</h2>\n`;
      sortReferences(paper.references).forEach((ref) => {
        if (ref.full.trim()) {
          html += `<p class="kaynak">${escapeHtml(ref.full)}</p>\n`;
        }
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
      setPaper(await importPaperFromJSON(file));
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
              <div className="rounded-lg bg-indigo-50 p-4">
                <div className="text-sm text-gray-600">Kaynaklı cümle</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {citedSentences}/{plannedSentences}
                </div>
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
                                <span className={s.text.trim() ? 'text-green-600' : 'text-gray-300'}>
                                  {s.text.trim() ? '●' : '○'}
                                </span>
                                <span className="text-gray-500">{i + 1}.</span>
                                {s.move && (
                                  <span className="rounded bg-gray-100 px-1.5 text-gray-700">
                                    {findMoveLabel(section.moveSet, s.move)}
                                  </span>
                                )}
                                <span className="text-gray-600">
                                  {s.note || s.text.slice(0, 55)}
                                </span>
                                {s.citations.length > 0 && (
                                  <span className="text-blue-600">
                                    🔗{s.citations.length}
                                  </span>
                                )}
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

      {/* Denetim */}
      {showAudit && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">🔍 Denetim</h2>
              <button
                onClick={() => setShowAudit(false)}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                ✕ Kapat
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              Bu kontroller tamamen kural tabanlıdır — yapıya bakar, metni yorumlamaz. Boş
              bölümler ve yazılmamış paragraflar denetlenmez.
            </p>

            <div className="mb-5 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-red-50 p-3">
                <div className="text-xs text-gray-600">Eksik</div>
                <div className="text-2xl font-bold text-red-600">{findingCounts.error}</div>
              </div>
              <div className="rounded-lg bg-amber-50 p-3">
                <div className="text-xs text-gray-600">Dikkat</div>
                <div className="text-2xl font-bold text-amber-600">{findingCounts.warning}</div>
              </div>
              <div className="rounded-lg bg-gray-100 p-3">
                <div className="text-xs text-gray-600">Bilgi</div>
                <div className="text-2xl font-bold text-gray-600">{findingCounts.info}</div>
              </div>
            </div>

            {findings.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                <p className="text-lg">Sorun bulunamadı</p>
                <p className="mt-1 text-sm">
                  Henüz yazmaya başlamadıysanız bu beklenen bir sonuçtur.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {findings.map((f) => {
                  const style: Record<Severity, string> = {
                    error: 'border-red-300 bg-red-50',
                    warning: 'border-amber-300 bg-amber-50',
                    info: 'border-gray-200 bg-gray-50',
                  };
                  const icon: Record<Severity, string> = {
                    error: '⛔',
                    warning: '⚠️',
                    info: 'ℹ️',
                  };
                  const clickable = Boolean(f.sectionId);
                  return (
                    <li
                      key={f.id}
                      onClick={() => clickable && jumpTo(f)}
                      className={`rounded-lg border px-3 py-2 ${style[f.severity]} ${
                        clickable ? 'cursor-pointer hover:brightness-95' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span>{icon[f.severity]}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-800">{f.message}</p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {f.location}
                            {clickable && ' · git →'}
                          </p>
                        </div>
                        <span className="shrink-0 rounded bg-white/70 px-2 py-0.5 text-xs text-gray-600">
                          {f.category}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
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
                {citedSentences} kaynaklı • {totalWords} kelime
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
                onClick={() => setShowAudit(true)}
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700"
              >
                🔍 Denetim
                {findingCounts.error > 0 && (
                  <span className="rounded-full bg-red-500 px-2 text-xs font-bold">
                    {findingCounts.error}
                  </span>
                )}
                {findingCounts.error === 0 && findingCounts.warning > 0 && (
                  <span className="rounded-full bg-amber-400 px-2 text-xs font-bold text-amber-950">
                    {findingCounts.warning}
                  </span>
                )}
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
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-2">
            <nav className="flex flex-wrap">
              {paper.sections.map((section) => {
                const count = section.subsections.reduce(
                  (n, sub) => n + sub.paragraphs.reduce((m, p) => m + p.sentences.length, 0),
                  0
                );
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`border-b-2 px-5 py-4 text-sm font-medium transition ${
                      currentSection?.id === section.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {section.name}
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">{count}</span>
                  </button>
                );
              })}
            </nav>
            <button
              onClick={() => setShowSectionManager(!showSectionManager)}
              className="mr-2 rounded-lg bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-300"
            >
              ⚙️ Bölümleri düzenle
            </button>
          </div>

          {/* Bölüm yöneticisi */}
          {showSectionManager && (
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-sm text-gray-600">
                Bölümleri yeniden adlandırabilir, sıralayabilir, ekleyip silebilirsiniz. Her
                bölüm, cümlelere önerilecek retorik işlev kümesini seçer.
              </p>
              <div className="space-y-2">
                {paper.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="flex flex-wrap items-center gap-2 rounded border border-gray-200 bg-white p-2"
                  >
                    <span className="font-mono text-sm text-gray-400">{index + 1}.</span>
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => updateSection(section.id, { name: e.target.value })}
                      className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="Bölüm adı"
                    />
                    <select
                      value={section.moveSet}
                      onChange={(e) => updateSection(section.id, { moveSet: e.target.value })}
                      className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">— işlev kümesi yok —</option>
                      {MOVE_SET_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => moveSection(section.id, 'up')}
                      disabled={index === 0}
                      className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      title="Yukarı taşı"
                    >
                      ⬆️
                    </button>
                    <button
                      onClick={() => moveSection(section.id, 'down')}
                      disabled={index === paper.sections.length - 1}
                      className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      title="Aşağı taşı"
                    >
                      ⬇️
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="rounded bg-red-500 px-2 py-1 text-sm text-white transition hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addSection}
                className="mt-3 w-full rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-gray-600 transition hover:border-gray-400 hover:text-gray-700"
              >
                + Yeni Bölüm
              </button>
            </div>
          )}

          <div className="p-6">
            {!currentSection ? (
              <div className="py-12 text-center text-gray-500">
                <p className="mb-2 text-lg">Hiç bölüm yok</p>
                <p className="text-sm">
                  &quot;⚙️ Bölümleri düzenle&quot; ile bölüm ekleyin
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{currentSection.name}</h2>
                  <button
                    onClick={() => addSubsection(currentSection.id)}
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
                      moveSet={currentSection.moveSet}
                      index={index}
                      total={currentSection.subsections.length}
                      references={paper.references}
                      onUpdate={(subId, updates) =>
                        updateSubsection(currentSection.id, subId, updates)
                      }
                      onCreateReference={createReference}
                      onDelete={(subId) => deleteSubsection(currentSection.id, subId)}
                      onMove={(subId, dir) => moveSubsection(currentSection.id, subId, dir)}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* Kaynakça */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold">
              Kaynakça{' '}
              <span className="text-sm font-normal text-gray-500">
                ({paper.references.length} kaynak)
              </span>
            </h2>
            {paper.references.length > 1 && (
              <button
                onClick={() => setPaper({ ...paper, references: sortReferences(paper.references) })}
                className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-300"
              >
                🔤 Alfabetik sırala
              </button>
            )}
          </div>

          {/* Uyarılar */}
          {(unusedRefs.length > 0 || incompleteRefs.length > 0) && (
            <div className="mb-4 space-y-2">
              {incompleteRefs.length > 0 && (
                <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  ⚠ {incompleteRefs.length} kaynağın bilgileri eksik. Metin içi ad ve yıl
                  doldurulmazsa atıf <em>(?, t.y.)</em> olarak çıkar.
                </div>
              )}
              {unusedRefs.length > 0 && (
                <div className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  ℹ️ {unusedRefs.length} kaynak hiçbir cümlede kullanılmıyor.
                </div>
              )}
            </div>
          )}

          <div className="space-y-3">
            {paper.references.map((ref, index) => {
              const usage = referenceUsage(paper, ref.id);
              const incomplete = isReferenceIncomplete(ref);
              const expanded = expandedRef === ref.id;

              return (
                <div
                  key={ref.id}
                  className={`rounded-lg border p-3 ${
                    incomplete ? 'border-amber-300 bg-amber-50/50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm text-gray-400">{index + 1}.</span>

                    <input
                      type="text"
                      value={ref.inText}
                      onChange={(e) => updateReference(ref.id, { inText: e.target.value })}
                      className="w-44 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="metin içi ad"
                      title="Metin içinde görünecek ad: Yılmaz / Yılmaz ve Kaya / Yılmaz vd."
                    />
                    <input
                      type="text"
                      value={ref.year}
                      onChange={(e) => updateReference(ref.id, { year: e.target.value })}
                      className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="yıl"
                    />

                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      → ({inTextLabel(ref)})
                    </span>

                    <button
                      onClick={() => setExpandedRef(expanded ? null : ref.id)}
                      className={`rounded px-2 py-1 text-xs ${
                        usage > 0
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                      title="Kullanıldığı yerleri göster"
                    >
                      {usage > 0 ? `🔗 ${usage} cümlede` : 'kullanılmıyor'}
                    </button>

                    <button
                      onClick={() => deleteReference(ref.id)}
                      className="ml-auto rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>

                  <input
                    type="text"
                    value={ref.full}
                    onChange={(e) => updateReference(ref.id, { full: e.target.value })}
                    onBlur={() => autofillReference(ref.id)}
                    className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Yılmaz, A. (2003). Makalenin başlığı. Dergi Adı, 12(3), 45-60."
                  />

                  {expanded && (
                    <div className="mt-2 rounded bg-gray-50 px-3 py-2 text-xs text-gray-600">
                      {usage > 0 ? (
                        <>
                          <span className="font-medium">Kullanıldığı yerler: </span>
                          {referenceLocations(paper, ref.id).join(' · ')}
                          <div className="mt-1 text-gray-400">
                            (bölüm.altbaşlık · paragraf · cümle)
                          </div>
                        </>
                      ) : (
                        'Bu kaynak henüz hiçbir cümleye bağlanmamış.'
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={createReference}
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
