'use client';

import { useState } from 'react';
import { Subsection, Paragraph, Reference } from '@/types';
import { emptyParagraph, writtenSentenceCount } from '@/lib/utils';
import ParagraphEditor from './ParagraphEditor';

interface SubsectionEditorProps {
  subsection: Subsection;
  moveSet: string;
  index: number;
  total: number;
  references: Reference[];
  onUpdate: (subsectionId: string, updates: Partial<Subsection>) => void;
  onCreateReference: () => string;
  onDelete: (subsectionId: string) => void;
  onMove: (subsectionId: string, direction: 'up' | 'down') => void;
}

export default function SubsectionEditor({
  subsection,
  moveSet,
  index,
  total,
  references,
  onUpdate,
  onCreateReference,
  onDelete,
  onMove,
}: SubsectionEditorProps) {
  const [collapsed, setCollapsed] = useState(false);

  const addParagraph = () => {
    onUpdate(subsection.id, { paragraphs: [...subsection.paragraphs, emptyParagraph()] });
  };

  const updateParagraph = (paragraphId: string, updates: Partial<Paragraph>) => {
    onUpdate(subsection.id, {
      paragraphs: subsection.paragraphs.map((p) =>
        p.id === paragraphId ? { ...p, ...updates } : p
      ),
    });
  };

  const deleteParagraph = (paragraphId: string) => {
    onUpdate(subsection.id, {
      paragraphs: subsection.paragraphs.filter((p) => p.id !== paragraphId),
    });
  };

  const moveParagraph = (paragraphId: string, direction: 'up' | 'down') => {
    const idx = subsection.paragraphs.findIndex((p) => p.id === paragraphId);
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= subsection.paragraphs.length) return;

    const next = [...subsection.paragraphs];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    onUpdate(subsection.id, { paragraphs: next });
  };

  const target = subsection.targetParagraphs;
  const progress = target > 0 ? Math.min(100, (subsection.paragraphs.length / target) * 100) : 0;
  const complete = target > 0 && subsection.paragraphs.length >= target;

  const totalSentences = subsection.paragraphs.reduce((sum, p) => sum + p.sentences.length, 0);
  const writtenSentences = subsection.paragraphs.reduce(
    (sum, p) => sum + writtenSentenceCount(p),
    0
  );

  return (
    <div className="mb-4 rounded-lg border-2 border-blue-200 bg-white p-4">
      {/* Alt başlık satırı */}
      <div className="mb-3">
        <div className="mb-2 flex items-start gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-1 text-gray-500 hover:text-gray-700"
          >
            {collapsed ? '▶' : '▼'}
          </button>

          <input
            type="text"
            value={subsection.title}
            onChange={(e) => onUpdate(subsection.id, { title: e.target.value })}
            className="flex-1 rounded border-none bg-transparent px-2 py-1 text-xl font-bold text-blue-900 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`${index + 1}. Alt başlık...`}
          />

          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => onMove(subsection.id, 'up')}
              disabled={index === 0}
              className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
              title="Yukarı taşı"
            >
              ⬆️
            </button>
            <button
              onClick={() => onMove(subsection.id, 'down')}
              disabled={index === total - 1}
              className="rounded px-2 py-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30"
              title="Aşağı taşı"
            >
              ⬇️
            </button>
            <button
              onClick={() => {
                if (confirm('Bu alt başlığı ve altındaki her şeyi silmek istediğinize emin misiniz?')) {
                  onDelete(subsection.id);
                }
              }}
              className="rounded px-2 py-1 text-red-600 hover:bg-red-100"
              title="Sil"
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="ml-8 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            🎯 Hedef paragraf:
            <input
              type="number"
              min="0"
              value={target}
              onChange={(e) =>
                onUpdate(subsection.id, { targetParagraphs: parseInt(e.target.value) || 0 })
              }
              className="w-16 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <span className={`text-sm font-medium ${complete ? 'text-green-600' : 'text-gray-600'}`}>
            {subsection.paragraphs.length} / {target} paragraf{complete ? ' ✓' : ''}
          </span>

          {target > 0 && (
            <div className="h-2 w-32 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full transition-all ${complete ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <span className="text-sm text-gray-500">
            {writtenSentences} / {totalSentences} cümle yazıldı
          </span>
        </div>
      </div>

      {/* Paragraflar */}
      {!collapsed && (
        <div className="ml-8">
          {subsection.paragraphs.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center">
              <p className="mb-2 text-gray-500">Henüz paragraf eklenmedi</p>
              <button
                onClick={addParagraph}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                ➕ İlk paragrafı ekle
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {subsection.paragraphs.map((paragraph, pIndex) => (
                  <ParagraphEditor
                    key={paragraph.id}
                    paragraph={paragraph}
                    moveSet={moveSet}
                    index={pIndex}
                    total={subsection.paragraphs.length}
                    references={references}
                    onUpdate={(updates) => updateParagraph(paragraph.id, updates)}
                    onCreateReference={onCreateReference}
                    onDelete={() => deleteParagraph(paragraph.id)}
                    onMove={(direction) => moveParagraph(paragraph.id, direction)}
                  />
                ))}
              </div>
              <button
                onClick={addParagraph}
                className="mt-4 w-full rounded-lg border-2 border-dashed border-blue-300 px-4 py-2 text-blue-600 transition hover:border-blue-400 hover:text-blue-700"
              >
                ➕ Yeni paragraf ekle
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
