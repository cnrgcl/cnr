'use client';

import { useState } from 'react';
import { LiteratureSummary } from '@/types';
import { Plus, Trash2, BookMarked } from 'lucide-react';

interface Props {
  summaries: LiteratureSummary[];
  onSummariesChange: (summaries: LiteratureSummary[]) => void;
}

export default function LiteratureInput({ summaries, onSummariesChange }: Props) {
  const [newSummary, setNewSummary] = useState<Partial<LiteratureSummary>>({
    title: '',
    authors: '',
    year: '',
    summary: '',
    keyFindings: '',
  });

  const addSummary = () => {
    if (!newSummary.title || !newSummary.summary) {
      alert('Lütfen en az başlık ve özet giriniz');
      return;
    }

    const summary: LiteratureSummary = {
      id: Date.now().toString(),
      title: newSummary.title,
      authors: newSummary.authors || '',
      year: newSummary.year || '',
      summary: newSummary.summary,
      keyFindings: newSummary.keyFindings || '',
    };

    onSummariesChange([...summaries, summary]);
    setNewSummary({
      title: '',
      authors: '',
      year: '',
      summary: '',
      keyFindings: '',
    });
  };

  const removeSummary = (id: string) => {
    onSummariesChange(summaries.filter(s => s.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookMarked className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Literatür Özetleri
        </h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        NotebookLM'den aldığınız literatür özetlerini buraya ekleyin
      </p>

      {/* Input Form */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Makale Başlığı *"
          value={newSummary.title}
          onChange={(e) => setNewSummary({ ...newSummary, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Yazarlar"
            value={newSummary.authors}
            onChange={(e) => setNewSummary({ ...newSummary, authors: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Yıl"
            value={newSummary.year}
            onChange={(e) => setNewSummary({ ...newSummary, year: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <textarea
          placeholder="NotebookLM Özeti (ana bulgular, metodoloji, vb.) *"
          value={newSummary.summary}
          onChange={(e) => setNewSummary({ ...newSummary, summary: e.target.value })}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <textarea
          placeholder="Anahtar Bulgular (opsiyonel)"
          value={newSummary.keyFindings}
          onChange={(e) => setNewSummary({ ...newSummary, keyFindings: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <button
          onClick={addSummary}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4
                   rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Literatür Ekle
        </button>
      </div>

      {/* Summaries List */}
      {summaries.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Eklenen Literatürler ({summaries.length})
          </h3>
          {summaries.map((summary) => (
            <div
              key={summary.id}
              className="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {summary.title}
                  </h4>
                  {summary.authors && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {summary.authors} {summary.year && `(${summary.year})`}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeSummary(summary.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
