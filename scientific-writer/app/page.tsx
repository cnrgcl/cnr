'use client';

import { useState, useEffect } from 'react';
import { Paper, Section, Subsection, Paragraph } from '@/types';
import SubsectionEditor from '@/components/SubsectionEditor';
import { generateId, countWords, countSentences, savePaper, loadPaper } from '@/lib/utils';

export default function Home() {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [lastSaved, setLastSaved] = useState<string>('');
  const [showOutline, setShowOutline] = useState(false);

  // Initialize or load paper
  useEffect(() => {
    const loaded = loadPaper();
    if (loaded) {
      setPaper(loaded);
      setLastSaved(new Date(loaded.updatedAt).toLocaleTimeString('tr-TR'));
    } else {
      // Create new paper with subsection structure
      const newPaper: Paper = {
        id: generateId(),
        title: 'Yeni Bilimsel Makale',
        abstractTR: '',
        abstractEN: '',
        keywordsTR: [],
        keywordsEN: [],
        sections: [
          { id: 'introduction', name: 'Giriş (Introduction)', subsections: [] },
          { id: 'methods', name: 'Yöntem (Methods)', subsections: [] },
          { id: 'results', name: 'Bulgular (Results)', subsections: [] },
          { id: 'discussion', name: 'Tartışma (Discussion)', subsections: [] },
        ],
        references: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPaper(newPaper);
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (paper) {
      const timer = setTimeout(() => {
        const updated = { ...paper, updatedAt: new Date().toISOString() };
        savePaper(updated);
        setLastSaved(new Date().toLocaleTimeString('tr-TR'));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [paper]);

  if (!paper) return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;

  const currentSection = paper.sections.find(s => s.id === activeSection)!;

  const addSubsection = (sectionId: string) => {
    const section = paper.sections.find(s => s.id === sectionId)!;
    const newSubsection: Subsection = {
      id: generateId(),
      title: `${section.subsections.length + 1}. Alt Başlık`,
      targetParagraphs: 0,
      paragraphs: [],
    };

    setPaper(prev => ({
      ...prev!,
      sections: prev!.sections.map(s =>
        s.id === sectionId
          ? { ...s, subsections: [...s.subsections, newSubsection] }
          : s
      ),
    }));
  };

  const updateSubsection = (sectionId: string, subsectionId: string, updates: Partial<Subsection>) => {
    setPaper(prev => ({
      ...prev!,
      sections: prev!.sections.map(s =>
        s.id === sectionId
          ? {
              ...s,
              subsections: s.subsections.map(sub =>
                sub.id === subsectionId ? { ...sub, ...updates } : sub
              ),
            }
          : s
      ),
    }));
  };

  const deleteSubsection = (sectionId: string, subsectionId: string) => {
    setPaper(prev => ({
      ...prev!,
      sections: prev!.sections.map(s =>
        s.id === sectionId
          ? { ...s, subsections: s.subsections.filter(sub => sub.id !== subsectionId) }
          : s
      ),
    }));
  };

  const moveSubsection = (sectionId: string, subsectionId: string, direction: 'up' | 'down') => {
    setPaper(prev => {
      const section = prev!.sections.find(s => s.id === sectionId)!;
      const index = section.subsections.findIndex(sub => sub.id === subsectionId);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === section.subsections.length - 1)
      ) {
        return prev!;
      }

      const newSubsections = [...section.subsections];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newSubsections[index], newSubsections[newIndex]] = [newSubsections[newIndex], newSubsections[index]];

      return {
        ...prev!,
        sections: prev!.sections.map(s =>
          s.id === sectionId ? { ...s, subsections: newSubsections } : s
        ),
      };
    });
  };

  const getTotalWords = () => {
    return paper.sections.reduce((total, section) => {
      return total + section.subsections.reduce((secTotal, subsection) => {
        return secTotal + subsection.paragraphs.reduce((subTotal, p) => {
          return subTotal + countWords(p.content);
        }, 0);
      }, 0);
    }, 0);
  };

  const getTotalSentences = () => {
    return paper.sections.reduce((total, section) => {
      return total + section.subsections.reduce((secTotal, subsection) => {
        return secTotal + subsection.paragraphs.reduce((subTotal, p) => {
          return subTotal + countSentences(p.content);
        }, 0);
      }, 0);
    }, 0);
  };

  const exportToWord = () => {
    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${paper.title}</title>
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { text-align: center; font-size: 16pt; margin-bottom: 30px; }
    h2 { font-size: 14pt; margin-top: 30px; margin-bottom: 15px; font-weight: bold; }
    h3 { font-size: 13pt; margin-top: 20px; margin-bottom: 10px; font-weight: bold; }
    h4 { font-size: 12pt; margin-top: 15px; margin-bottom: 8px; font-weight: bold; }
    p { text-align: justify; margin-bottom: 10px; }
    .abstract { margin: 20px 0; padding: 15px; border: 1px solid #ccc; }
    .keywords { margin: 10px 0; font-style: italic; }
  </style>
</head>
<body>
  <h1>${paper.title}</h1>

  <div class="abstract">
    <h2>Özet</h2>
    <p>${paper.abstractTR}</p>
    <p class="keywords"><strong>Anahtar Kelimeler:</strong> ${paper.keywordsTR.join(', ')}</p>
  </div>

  <div class="abstract">
    <h2>Abstract</h2>
    <p>${paper.abstractEN}</p>
    <p class="keywords"><strong>Keywords:</strong> ${paper.keywordsEN.join(', ')}</p>
  </div>
`;

    paper.sections.forEach((section, sIndex) => {
      html += `\n  <h2>${sIndex + 1}. ${section.name}</h2>\n`;
      section.subsections.forEach((subsection, subIndex) => {
        html += `  <h3>${sIndex + 1}.${subIndex + 1}. ${subsection.title}</h3>\n`;
        subsection.paragraphs.forEach(para => {
          if (para.title && para.title !== `Paragraf ${subsection.paragraphs.indexOf(para) + 1}`) {
            html += `  <h4>${para.title}</h4>\n`;
          }
          html += `  <p>${para.content}</p>\n`;
        });
      });
    });

    if (paper.references.length > 0) {
      html += `\n  <h2>Kaynakça</h2>\n`;
      paper.references.forEach((ref, i) => {
        html += `  <p>${i + 1}. ${ref}</p>\n`;
      });
    }

    html += `</body>\n</html>`;

    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${paper.title.replace(/\s+/g, '_')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Outline view component
  const OutlineView = () => {
    const totalParagraphs = paper.sections.reduce((total, section) =>
      total + section.subsections.reduce((secTotal, subsection) =>
        secTotal + subsection.paragraphs.length, 0), 0);

    const totalTargetParagraphs = paper.sections.reduce((total, section) =>
      total + section.subsections.reduce((secTotal, subsection) =>
        secTotal + subsection.targetParagraphs, 0), 0);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📋 Makale Planı</h2>
          <button
            onClick={() => setShowOutline(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ✕ Kapat
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Toplam Paragraf</div>
            <div className="text-2xl font-bold text-blue-600">
              {totalParagraphs} / {totalTargetParagraphs || '∞'}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Toplam Cümle</div>
            <div className="text-2xl font-bold text-green-600">{getTotalSentences()}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Toplam Kelime</div>
            <div className="text-2xl font-bold text-purple-600">{getTotalWords()}</div>
          </div>
        </div>

        {paper.sections.map((section, sIndex) => (
          <div key={section.id} className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">
              {sIndex + 1}. {section.name}
            </h3>
            {section.subsections.length === 0 ? (
              <p className="text-gray-500 ml-6">Alt başlık eklenmemiş</p>
            ) : (
              section.subsections.map((subsection, subIndex) => {
                const subProgress = subsection.targetParagraphs > 0
                  ? Math.min(100, (subsection.paragraphs.length / subsection.targetParagraphs) * 100)
                  : 0;

                return (
                  <div key={subsection.id} className="ml-6 mb-4 border-l-4 border-blue-300 pl-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">
                        {sIndex + 1}.{subIndex + 1}. {subsection.title}
                      </h4>
                      <span className="text-sm text-gray-600">
                        {subsection.paragraphs.length} / {subsection.targetParagraphs} paragraf
                        {subsection.targetParagraphs > 0 && subProgress >= 100 ? ' ✓' : ''}
                      </span>
                    </div>
                    {subsection.paragraphs.map((para, pIndex) => {
                      const sentenceCount = countSentences(para.content);
                      const sentenceProgress = para.targetSentences > 0
                        ? Math.min(100, (sentenceCount / para.targetSentences) * 100)
                        : 0;

                      return (
                        <div key={para.id} className="ml-6 mb-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              • {para.title}
                              {para.theme && (
                                <span className="ml-2 text-xs italic text-gray-500">
                                  ({para.theme})
                                </span>
                              )}
                            </span>
                            <span className={`text-xs ${
                              para.targetSentences > 0 && sentenceProgress >= 100
                                ? 'text-green-600 font-medium'
                                : 'text-gray-500'
                            }`}>
                              {sentenceCount}{para.targetSentences > 0 ? ` / ${para.targetSentences}` : ''} cümle
                              {para.targetSentences > 0 && sentenceProgress >= 100 ? ' ✓' : ''}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Outline Modal */}
      {showOutline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <OutlineView />
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <input
                type="text"
                value={paper.title}
                onChange={(e) => setPaper({ ...paper, title: e.target.value })}
                className="text-2xl font-bold text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Son kayıt: {lastSaved} • {getTotalSentences()} cümle • {getTotalWords()} kelime
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOutline(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                📋 Plan Görünümü
              </button>
              <button
                onClick={() => {
                  const updated = { ...paper, updatedAt: new Date().toISOString() };
                  savePaper(updated);
                  setLastSaved(new Date().toLocaleTimeString('tr-TR'));
                  alert('Kaydedildi!');
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                💾 Kaydet
              </button>
              <button
                onClick={exportToWord}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                📄 Word'e Aktar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Abstract Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Özet / Abstract</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Türkçe Özet ({countWords(paper.abstractTR)} kelime)
            </label>
            <textarea
              value={paper.abstractTR}
              onChange={(e) => setPaper({ ...paper, abstractTR: e.target.value })}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Türkçe özet yazınız..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              English Abstract ({countWords(paper.abstractEN)} kelime)
            </label>
            <textarea
              value={paper.abstractEN}
              onChange={(e) => setPaper({ ...paper, abstractEN: e.target.value })}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your English abstract..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Anahtar Kelimeler (virgülle ayırın)
              </label>
              <input
                type="text"
                value={paper.keywordsTR.join(', ')}
                onChange={(e) => setPaper({ ...paper, keywordsTR: e.target.value.split(',').map(k => k.trim()).filter(k => k) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="kelime1, kelime2, kelime3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (separate with commas)
              </label>
              <input
                type="text"
                value={paper.keywordsEN.join(', ')}
                onChange={(e) => setPaper({ ...paper, keywordsEN: e.target.value.split(',').map(k => k.trim()).filter(k => k) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="word1, word2, word3"
              />
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {paper.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {section.name}
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {section.subsections.length}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Active Section Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentSection.name}
              </h2>
              <button
                onClick={() => addSubsection(activeSection)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                ➕ Yeni Alt Başlık Ekle
              </button>
            </div>

            {currentSection.subsections.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">Henüz alt başlık eklenmedi</p>
                <p className="text-sm">Yukarıdaki butona tıklayarak alt başlık ekleyin</p>
              </div>
            ) : (
              <div className="space-y-6">
                {currentSection.subsections.map((subsection, index) => (
                  <SubsectionEditor
                    key={subsection.id}
                    subsection={subsection}
                    sectionId={activeSection}
                    index={index}
                    total={currentSection.subsections.length}
                    onUpdate={(subId, updates) => updateSubsection(activeSection, subId, updates)}
                    onDelete={(subId) => deleteSubsection(activeSection, subId)}
                    onMove={(subId, direction) => moveSubsection(activeSection, subId, direction)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* References Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Kaynakça</h2>
          <div className="space-y-2">
            {paper.references.map((ref, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-gray-500 font-mono">{index + 1}.</span>
                <input
                  type="text"
                  value={ref}
                  onChange={(e) => {
                    const newRefs = [...paper.references];
                    newRefs[index] = e.target.value;
                    setPaper({ ...paper, references: newRefs });
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Kaynak bilgisi..."
                />
                <button
                  onClick={() => {
                    const newRefs = paper.references.filter((_, i) => i !== index);
                    setPaper({ ...paper, references: newRefs });
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            ))}
            <button
              onClick={() => setPaper({ ...paper, references: [...paper.references, ''] })}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition"
            >
              + Yeni Kaynak Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
