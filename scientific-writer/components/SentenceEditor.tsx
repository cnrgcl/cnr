'use client';

import { Sentence, Reference } from '@/types';
import { getMovesForSection } from '@/lib/moves';
import { countWords, inTextLabel, findReference, isReferenceIncomplete, renderSentence } from '@/lib/utils';

interface SentenceEditorProps {
  sentence: Sentence;
  moveSet: string;
  index: number;
  total: number;
  references: Reference[];
  onUpdate: (field: keyof Sentence, value: string | string[]) => void;
  onCreateReference: () => string;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
}

export default function SentenceEditor({
  sentence,
  moveSet,
  index,
  total,
  references,
  onUpdate,
  onCreateReference,
  onDelete,
  onMove,
}: SentenceEditorProps) {
  const groups = getMovesForSection(moveSet);
  const written = sentence.text.trim().length > 0;

  const activeHint = groups.flatMap((g) => g.moves).find((m) => m.id === sentence.move)?.hint;

  const linked = sentence.citations
    .map((id) => findReference(references, id))
    .filter((r): r is Reference => Boolean(r));

  const available = references.filter((r) => !sentence.citations.includes(r.id));

  const link = (refId: string) => onUpdate('citations', [...sentence.citations, refId]);
  const unlink = (refId: string) =>
    onUpdate('citations', sentence.citations.filter((id) => id !== refId));

  const handlePick = (value: string) => {
    if (!value) return;
    if (value === '__new__') {
      link(onCreateReference());
    } else {
      link(value);
    }
  };

  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        written ? 'border-green-300 bg-green-50/40' : 'border-gray-200 bg-white'
      }`}
    >
      {/* Üst satır: numara, işlev, kontroller */}
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
        placeholder="Cümleyi buraya yazın (atıfı elle yazmayın, aşağıdan bağlayın)..."
      />

      {/* Kaynak bağlama */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-gray-500">🔗 Kaynak:</span>

        {linked.map((ref) => {
          const incomplete = isReferenceIncomplete(ref);
          return (
            <span
              key={ref.id}
              title={incomplete ? 'Bu kaynağın bilgileri eksik — Kaynakça bölümünden tamamlayın' : ref.full}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                incomplete
                  ? 'border border-amber-400 bg-amber-50 text-amber-800'
                  : 'border border-blue-300 bg-blue-50 text-blue-800'
              }`}
            >
              {incomplete && '⚠ '}
              {inTextLabel(ref)}
              <button
                onClick={() => unlink(ref.id)}
                className="text-current opacity-50 hover:opacity-100"
                title="Bağlantıyı kaldır"
              >
                ✕
              </button>
            </span>
          );
        })}

        {linked.length === 0 && <span className="text-xs text-gray-400">yok</span>}

        <select
          value=""
          onChange={(e) => handlePick(e.target.value)}
          className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-xs text-gray-600 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">＋ bağla</option>
          {available.length > 0 && (
            <optgroup label="Kaynakçadan">
              {available.map((ref) => (
                <option key={ref.id} value={ref.id}>
                  {ref.full.trim() ? `${inTextLabel(ref)} — ${ref.full.slice(0, 50)}` : inTextLabel(ref)}
                </option>
              ))}
            </optgroup>
          )}
          <optgroup label="Yeni">
            <option value="__new__">＋ Yeni kaynak oluştur…</option>
          </optgroup>
        </select>
      </div>

      {/* Atıflı önizleme */}
      {written && linked.length > 0 && (
        <p className="mt-2 rounded border border-gray-200 bg-white px-2 py-1 text-xs italic text-gray-600">
          {renderSentence(sentence, references)}
        </p>
      )}

      {written && (
        <div className="mt-1 text-right text-xs text-gray-500">
          {countWords(sentence.text)} kelime
        </div>
      )}
    </div>
  );
}
