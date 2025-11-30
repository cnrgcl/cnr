'use client';

import { Section } from '@/types';
import { countWords } from '@/lib/utils';

interface SectionViewProps {
  section: Section;
}

export default function SectionView({ section }: SectionViewProps) {
  const totalWords = section.paragraphs.reduce((sum, p) => sum + countWords(p.content), 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{section.name}</h3>
        <span className="text-sm text-gray-600">
          {section.paragraphs.length} paragraf • {totalWords} kelime
        </span>
      </div>

      <div className="space-y-4">
        {section.paragraphs.map((para, index) => (
          <div key={para.id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {index + 1}. {para.title}
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {para.content.substring(0, 200)}
              {para.content.length > 200 ? '...' : ''}
            </p>
            <span className="text-xs text-gray-500 mt-1 block">
              {countWords(para.content)} kelime
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
