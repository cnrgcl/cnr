'use client';

import { useState } from 'react';
import { Paragraph, Sentence, Reference } from '@/types';
import {
  emptySentence,
  countWords,
  assembleParagraph,
  writtenSentenceCount,
} from '@/lib/utils';
import SentenceEditor from './SentenceEditor';

interface ParagraphEditorProps {
  paragraph: Paragraph;
  moveSet: string;
  index: number;
  total: number;
  references: Reference[];
  onUpdate: (updates: Partial<Paragraph>) => void;
  onCreateReference: () => string;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function ParagraphEditor({
  paragraph,
  moveSet,
  index,
  total,
  references,
  onUpdate,
  onCreateReference,
  onDelete,
  onMove,
}: ParagraphEditorProps) {
  const [showNotes, setShowNotes] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const planned = paragraph.sentences.length;
  const written = writtenSentenceCount(paragraph);
  const target = paragraph.targetSentences;
  const progress = target > 0 ? Math.min(100, (written / target) * 100) : 0;
  const complete = target > 0 && written >= target;

  const wordCount = countWords(paragraph.sentences.map((s) => s.text).join(' '));
  const citedCount = paragraph.sentences.filter((s) => s.citations.length > 0).length;

  const addSentence = () => onUpdate({ sentences: [...paragraph.sentences, emptySentence()] });

  /** Hedef sayıya kadar boş cümle yuvası açar. */
  const fillSlots = () => {
    const missing = target - paragraph.sentences.length;
    if (missing <= 0) return;
    onUpdate({
      sentences: [
        ...paragraph.sentences,
        ...Array.from({ length: missing }, () => emptySentence()),
      ],
    });
  };

  const updateSentence = (
    sentenceId: string,
    field: keyof Sentence,
    value: string | string[]
  ) => {
    onUpdate({
      sentences: paragraph.sentences.map((s) =>
        s.id === sentenceId ? { ...s, [field]: value } : s
      ),
    });
  };

  const deleteSentence = (sentenceId: string) => {
    onUpdate({ sentences: paragraph.sentences.filter((s) => s.id !== sentenceId) });
  };

  const moveSentence = (sentenceId: string, direction: 'up' | 'down') => {
    const idx = paragraph.sentences.findIndex((s) => s.id === sentenceId);
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= paragraph.sentences.length) return;

    const next = [...paragraph.sentences];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    onUpdate({ sentences: next });
  };

  return (
    <div id={paragraph.id} className="scroll-mt-24 rounded-lg border border-gray-300 bg-gray-50 p-4">
      {/* Başlık satırı */}
      <div className="mb-2 flex items-start gap-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-1 text-gray-500 hover:text-gray-700"
        >
          {collapsed ? '▶' : '▼'}
        </button>

        <span className="mt-1 rounded bg-gray-700 px-2 py-0.5 text-xs font-bold text-white">
          P{index + 1}
        </span>

        <input
          type="text"
          value={paragraph.theme}
          onChange={(e) => onUpdate({ theme: e.target.value })}
          className="flex-1 rounded border-none bg-transparent px-2 py-1 font-semibold text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paragrafın teması — bu paragraf ne anlatacak?"
        />

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onMove('up')}
            disabled={index === 0}
            className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
            title="Yukarı taşı"
          >
            ⬆️
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={index === total - 1}
            className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
            title="Aşağı taşı"
          >
            ⬇️
          </button>
          <button
            onClick={() => {
              if (confirm('Bu paragrafı ve tüm cümlelerini silmek istediğinize emin misiniz?')) {
                onDelete();
              }
            }}
            className="rounded px-2 py-1 text-red-600 hover:bg-red-100"
            title="Sil"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Hedef ve ilerleme */}
      <div className="mb-3 ml-8 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          🎯 Hedef cümle:
          <input
            type="number"
            min="0"
            value={target}
            onChange={(e) => onUpdate({ targetSentences: parseInt(e.target.value) || 0 })}
            className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <span className={`text-sm font-medium ${complete ? 'text-green-600' : 'text-gray-600'}`}>
          {written} yazıldı / {planned} planlandı
          {target > 0 ? ` / ${target} hedef` : ''}
          {complete ? ' ✓' : ''}
        </span>

        {target > 0 && (
          <div className="h-2 w-32 rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full transition-all ${complete ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <span className="text-sm text-gray-500">{wordCount} kelime</span>
        {planned > 0 && (
          <span className="text-sm text-gray-500">🔗 {citedCount}/{planned} cümle kaynaklı</span>
        )}

        <button
          onClick={() => setShowNotes(!showNotes)}
          className="ml-auto text-sm text-blue-600 hover:text-blue-700"
        >
          {showNotes ? '📝 Notu gizle' : '📝 Not'}
        </button>
      </div>

      {showNotes && (
        <div className="mb-3 ml-8">
          <textarea
            value={paragraph.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            rows={2}
            className="w-full resize-y rounded border border-gray-300 bg-yellow-50 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500"
            placeholder="Bu paragrafla ilgili hatırlatmalar, okunacak kaynaklar..."
          />
        </div>
      )}

      {/* Cümleler */}
      {!collapsed && (
        <div className="ml-8">
          {paragraph.sentences.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white py-6 text-center">
              <p className="mb-3 text-sm text-gray-500">Henüz cümle planlanmadı</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={addSentence}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                >
                  ➕ Cümle ekle
                </button>
                {target > 0 && (
                  <button
                    onClick={fillSlots}
                    className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                  >
                    ⚡ {target} boş yuva aç
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {paragraph.sentences.map((sentence, sIndex) => (
                  <SentenceEditor
                    key={sentence.id}
                    sentence={sentence}
                    moveSet={moveSet}
                    index={sIndex}
                    total={paragraph.sentences.length}
                    references={references}
                    onUpdate={(field, value) => updateSentence(sentence.id, field, value)}
                    onCreateReference={onCreateReference}
                    onDelete={() => deleteSentence(sentence.id)}
                    onMove={(direction) => moveSentence(sentence.id, direction)}
                  />
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={addSentence}
                  className="flex-1 rounded-lg border-2 border-dashed border-blue-300 px-4 py-2 text-sm text-blue-600 transition hover:border-blue-400 hover:text-blue-700"
                >
                  ➕ Cümle ekle
                </button>
                {target > paragraph.sentences.length && (
                  <button
                    onClick={fillSlots}
                    className="rounded-lg border-2 border-dashed border-gray-400 px-4 py-2 text-sm text-gray-600 transition hover:border-gray-500"
                  >
                    ⚡ Hedefe kadar doldur ({target - paragraph.sentences.length})
                  </button>
                )}
              </div>

              {/* Birleştirilmiş önizleme — atıflarıyla birlikte */}
              {written > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    👁️ Paragrafı bütün olarak gör
                  </summary>
                  <p className="mt-2 rounded border border-gray-200 bg-white p-3 text-justify text-sm leading-relaxed text-gray-800">
                    {assembleParagraph(paragraph, references)}
                  </p>
                </details>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
