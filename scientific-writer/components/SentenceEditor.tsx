'use client';

import { Sentence } from '@/types';
import { getMovesForSection } from '@/lib/moves';
import { countWords } from '@/lib/utils';

interface SentenceEditorProps {
  sentence: Sentence;
  sectionId: string;
  index: number;
  total: number;
  onUpdate: (field: keyof Sentence, value: string) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function SentenceEditor({
  sentence,
  sectionId,
  index,
  total,
  onUpdate,
  onDelete,
  onMove,
}: SentenceEditorProps) {
  const groups = getMovesForSection(sectionId);
  const written = sentence.text.trim().length > 0;

  const activeHint = groups
    .flatMap((g) => g.moves)
    .find((m) => m.id === sentence.move)?.hint;

  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        written ? 'border-green-300 bg-green-50/40' : 'border-gray-200 bg-white'
      }`}
    >
      {/* Üst satır: numara, işlev, kaynak, kontroller */}
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            written ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {index + 1}
        </span>

        <select
          value={sentence.move}
          onChange={(e) => onUpdate('move', e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">— işlev seç —</option>
          {groups.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.moves.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <input
          type="text"
          value={sentence.citation}
          onChange={(e) => onUpdate('citation', e.target.value)}
          className="w-40 shrink-0 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="kaynak (Yılmaz, 2003)"
        />

        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onMove('up')}
            disabled={index === 0}
            className="rounded px-1.5 py-1 text-xs text-gray-500 hover:bg-gray-200 disabled:opacity-25"
            title="Yukarı"
          >
            ▲
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={index === total - 1}
            className="rounded px-1.5 py-1 text-xs text-gray-500 hover:bg-gray-200 disabled:opacity-25"
            title="Aşağı"
          >
            ▼
          </button>
          <button
            onClick={onDelete}
            className="rounded px-1.5 py-1 text-xs text-red-500 hover:bg-red-100"
            title="Cümleyi sil"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Plan notu */}
      <input
        type="text"
        value={sentence.note}
        onChange={(e) => onUpdate('note', e.target.value)}
        className="mt-2 w-full rounded border border-dashed border-gray-300 bg-gray-50 px-2 py-1 text-xs text-gray-600 focus:ring-2 focus:ring-blue-400"
        placeholder={activeHint ? `plan — ${activeHint}` : 'plan — bu cümle ne diyecek?'}
      />

      {/* Gerçek cümle */}
      <textarea
        value={sentence.text}
        onChange={(e) => onUpdate('text', e.target.value)}
        rows={2}
        className="mt-1 w-full resize-y rounded border border-gray-300 px-2 py-1 text-sm leading-relaxed focus:ring-2 focus:ring-blue-500"
        placeholder="Cümleyi buraya yazın..."
      />

      {written && (
        <div className="mt-1 text-right text-xs text-gray-500">
          {countWords(sentence.text)} kelime
        </div>
      )}
    </div>
  );
}
