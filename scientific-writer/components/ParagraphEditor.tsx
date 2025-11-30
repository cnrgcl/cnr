'use client';

import { Paragraph } from '@/types';
import { countWords, countSentences } from '@/lib/utils';
import { useState } from 'react';

interface ParagraphEditorProps {
  paragraph: Paragraph;
  index: number;
  total: number;
  onUpdate: (field: keyof Paragraph, value: string | number) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function ParagraphEditor({
  paragraph,
  index,
  total,
  onUpdate,
  onDelete,
  onMove,
}: ParagraphEditorProps) {
  const [showNotes, setShowNotes] = useState(false);
  const wordCount = countWords(paragraph.content);
  const sentenceCount = countSentences(paragraph.content);

  // Calculate completion percentage
  const sentenceProgress = paragraph.targetSentences > 0
    ? Math.min(100, (sentenceCount / paragraph.targetSentences) * 100)
    : 0;

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-md transition">
      {/* Header */}
      <div className="mb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <input
              type="text"
              value={paragraph.title}
              onChange={(e) => onUpdate('title', e.target.value)}
              className="text-lg font-semibold text-gray-900 border-none bg-transparent focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 w-full"
              placeholder="Paragraf başlığı..."
            />
          </div>
          <div className="flex gap-2 ml-4">
            {/* Move buttons */}
            <button
              onClick={() => onMove('up')}
              disabled={index === 0}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Yukarı taşı"
            >
              ⬆️
            </button>
            <button
              onClick={() => onMove('down')}
              disabled={index === total - 1}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Aşağı taşı"
            >
              ⬇️
            </button>
            {/* Delete button */}
            <button
              onClick={onDelete}
              className="px-2 py-1 text-red-600 hover:bg-red-100 rounded transition"
              title="Sil"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Theme and planning row */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              📋 Paragraf Teması/Amacı
            </label>
            <input
              type="text"
              value={paragraph.theme}
              onChange={(e) => onUpdate('theme', e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder="Örn: Geçmiş çalışmaların özeti"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              🎯 Hedef Cümle Sayısı
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={paragraph.targetSentences}
                onChange={(e) => onUpdate('targetSentences', parseInt(e.target.value) || 0)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              <span className={`text-sm font-medium ${
                sentenceCount >= paragraph.targetSentences && paragraph.targetSentences > 0
                  ? 'text-green-600'
                  : 'text-gray-600'
              }`}>
                {sentenceCount} / {paragraph.targetSentences}
                {sentenceCount >= paragraph.targetSentences && paragraph.targetSentences > 0 ? ' ✓' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {paragraph.targetSentences > 0 && (
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  sentenceProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${sentenceProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-3">
        <textarea
          value={paragraph.content}
          onChange={(e) => onUpdate('content', e.target.value)}
          className="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white"
          placeholder="Paragraf içeriğini buraya yazın..."
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">
            {sentenceCount} cümle • {wordCount} kelime • {paragraph.content.length} karakter
          </span>
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showNotes ? '📝 Notları Gizle' : '📝 Notlar'}
          </button>
        </div>
      </div>

      {/* Notes (collapsible) */}
      {showNotes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notlar (yalnızca sizin için)
          </label>
          <textarea
            value={paragraph.notes}
            onChange={(e) => onUpdate('notes', e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-y bg-yellow-50"
            placeholder="Bu paragraf için notlarınız, hatırlatmalarınız..."
          />
        </div>
      )}
    </div>
  );
}
