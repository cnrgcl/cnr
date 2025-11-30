'use client';

import { Subsection, Paragraph } from '@/types';
import { generateId } from '@/lib/utils';
import ParagraphEditor from './ParagraphEditor';
import { useState } from 'react';

interface SubsectionEditorProps {
  subsection: Subsection;
  sectionId: string;
  index: number;
  total: number;
  onUpdate: (subsectionId: string, updates: Partial<Subsection>) => void;
  onDelete: (subsectionId: string) => void;
  onMove: (subsectionId: string, direction: 'up' | 'down') => void;
}

export default function SubsectionEditor({
  subsection,
  sectionId,
  index,
  total,
  onUpdate,
  onDelete,
  onMove,
}: SubsectionEditorProps) {
  const [collapsed, setCollapsed] = useState(false);

  const addParagraph = () => {
    const newParagraph: Paragraph = {
      id: generateId(),
      title: `Paragraf ${subsection.paragraphs.length + 1}`,
      content: '',
      notes: '',
      theme: '',
      targetSentences: 0,
    };
    onUpdate(subsection.id, {
      paragraphs: [...subsection.paragraphs, newParagraph],
    });
  };

  const updateParagraph = (paragraphId: string, field: keyof Paragraph, value: string | number) => {
    onUpdate(subsection.id, {
      paragraphs: subsection.paragraphs.map(p =>
        p.id === paragraphId ? { ...p, [field]: value } : p
      ),
    });
  };

  const deleteParagraph = (paragraphId: string) => {
    if (!confirm('Bu paragrafı silmek istediğinizden emin misiniz?')) return;
    onUpdate(subsection.id, {
      paragraphs: subsection.paragraphs.filter(p => p.id !== paragraphId),
    });
  };

  const moveParagraph = (paragraphId: string, direction: 'up' | 'down') => {
    const idx = subsection.paragraphs.findIndex(p => p.id === paragraphId);
    if (
      (direction === 'up' && idx === 0) ||
      (direction === 'down' && idx === subsection.paragraphs.length - 1)
    ) {
      return;
    }

    const newParagraphs = [...subsection.paragraphs];
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newParagraphs[idx], newParagraphs[newIdx]] = [newParagraphs[newIdx], newParagraphs[idx]];

    onUpdate(subsection.id, { paragraphs: newParagraphs });
  };

  const progress = subsection.targetParagraphs > 0
    ? Math.min(100, (subsection.paragraphs.length / subsection.targetParagraphs) * 100)
    : 0;

  return (
    <div className="border-2 border-blue-200 rounded-lg p-4 mb-4 bg-white">
      {/* Subsection Header */}
      <div className="mb-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-500 hover:text-gray-700"
            >
              {collapsed ? '▶' : '▼'}
            </button>
            <input
              type="text"
              value={subsection.title}
              onChange={(e) => onUpdate(subsection.id, { title: e.target.value })}
              className="text-xl font-bold text-blue-900 border-none bg-transparent focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 flex-1"
              placeholder={`${index + 1}. Alt başlık...`}
            />
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => onMove(subsection.id, 'up')}
              disabled={index === 0}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Yukarı taşı"
            >
              ⬆️
            </button>
            <button
              onClick={() => onMove(subsection.id, 'down')}
              disabled={index === total - 1}
              className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              title="Aşağı taşı"
            >
              ⬇️
            </button>
            <button
              onClick={() => {
                if (confirm('Bu alt başlığı ve tüm paragraflarını silmek istediğinizden emin misiniz?')) {
                  onDelete(subsection.id);
                }
              }}
              className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
              title="Sil"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Target paragraphs and progress */}
        <div className="flex items-center gap-4 ml-8">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">
              🎯 Hedef Paragraf:
            </label>
            <input
              type="number"
              min="0"
              value={subsection.targetParagraphs}
              onChange={(e) => onUpdate(subsection.id, { targetParagraphs: parseInt(e.target.value) || 0 })}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className={`text-sm font-medium ${
              subsection.paragraphs.length >= subsection.targetParagraphs && subsection.targetParagraphs > 0
                ? 'text-green-600'
                : 'text-gray-600'
            }`}>
              {subsection.paragraphs.length} / {subsection.targetParagraphs}
              {subsection.paragraphs.length >= subsection.targetParagraphs && subsection.targetParagraphs > 0 ? ' ✓' : ''}
            </span>
          </div>

          {subsection.targetParagraphs > 0 && (
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paragraphs */}
      {!collapsed && (
        <div className="ml-8 mt-4">
          {subsection.paragraphs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p>Henüz paragraf eklenmedi</p>
              <button
                onClick={addParagraph}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ➕ İlk Paragrafı Ekle
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {subsection.paragraphs.map((paragraph, pIndex) => (
                  <ParagraphEditor
                    key={paragraph.id}
                    paragraph={paragraph}
                    index={pIndex}
                    total={subsection.paragraphs.length}
                    onUpdate={(field, value) => updateParagraph(paragraph.id, field, value)}
                    onDelete={() => deleteParagraph(paragraph.id)}
                    onMove={(direction) => moveParagraph(paragraph.id, direction)}
                  />
                ))}
              </div>
              <button
                onClick={addParagraph}
                className="w-full mt-4 px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:text-blue-700 transition"
              >
                ➕ Yeni Paragraf Ekle
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
