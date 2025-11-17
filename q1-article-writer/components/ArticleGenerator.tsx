'use client';

import { useState } from 'react';
import { LiteratureSummary, GenerationResponse, ArticleSection } from '@/types';
import { Wand2, Download, Loader2 } from 'lucide-react';

interface Props {
  literatureSummaries: LiteratureSummary[];
  onGenerate: (response: GenerationResponse) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
}

export default function ArticleGenerator({ literatureSummaries, onGenerate, onGeneratingChange }: Props) {
  const [sectionType, setSectionType] = useState<ArticleSection['type']>('introduction');
  const [articleTitle, setArticleTitle] = useState('');
  const [researchQuestion, setResearchQuestion] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [humanizationLevel, setHumanizationLevel] = useState<'low' | 'medium' | 'high'>('high');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (literatureSummaries.length === 0) {
      alert('Lütfen en az bir literatür özeti ekleyin');
      return;
    }

    setIsGenerating(true);
    onGeneratingChange(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          literatureSummaries,
          sectionType,
          articleTitle,
          researchQuestion,
          additionalContext,
          humanizationLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Üretim başarısız oldu');
      }

      const data: GenerationResponse = await response.json();
      setGeneratedContent(data.content);
      onGenerate(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen API anahtarınızı kontrol edin.');
    } finally {
      setIsGenerating(false);
      onGeneratingChange(false);
    }
  };

  const handleExportWord = async () => {
    if (!generatedContent) return;

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: generatedContent,
          title: articleTitle || 'Academic Article',
        }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${articleTitle || 'article'}.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export başarısız oldu');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Makale Üretici
        </h2>
      </div>

      <div className="space-y-4">
        {/* Article Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Makale Başlığı
          </label>
          <input
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="Makalenizin başlığını girin"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Research Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Araştırma Sorusu
          </label>
          <textarea
            value={researchQuestion}
            onChange={(e) => setResearchQuestion(e.target.value)}
            placeholder="Ana araştırma sorunuzu yazın"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Section Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bölüm Tipi
          </label>
          <select
            value={sectionType}
            onChange={(e) => setSectionType(e.target.value as ArticleSection['type'])}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="introduction">Introduction (Giriş)</option>
            <option value="literature">Literature Review (Literatür Taraması)</option>
            <option value="methodology">Methodology (Metodoloji)</option>
            <option value="results">Results (Sonuçlar)</option>
            <option value="discussion">Discussion (Tartışma)</option>
            <option value="conclusion">Conclusion (Sonuç)</option>
          </select>
        </div>

        {/* Humanization Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            İnsanlaştırma Seviyesi
          </label>
          <select
            value={humanizationLevel}
            onChange={(e) => setHumanizationLevel(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="low">Düşük (Hızlı)</option>
            <option value="medium">Orta (Dengeli)</option>
            <option value="high">Yüksek (Maksimum Doğal)</option>
          </select>
        </div>

        {/* Additional Context */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ek Bağlam (Opsiyonel)
          </label>
          <textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Eklemek istediğiniz özel talimatlar veya detaylar"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || literatureSummaries.length === 0}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400
                     text-white font-medium py-2 px-4 rounded-md
                     flex items-center justify-center gap-2 transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Üretiliyor...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                İçerik Üret
              </>
            )}
          </button>

          {generatedContent && (
            <button
              onClick={handleExportWord}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4
                       rounded-md flex items-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Word
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
