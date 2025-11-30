'use client';

import { Section } from '@/types';
import { countWords } from '@/lib/utils';

interface SectionViewProps {
  section: Section;
}

export default function SectionView({ section }: SectionViewProps) {
  const totalWords = section.subsections.reduce((sum, subsection) =>
    sum + subsection.paragraphs.reduce((subSum, p) => subSum + countWords(p.content), 0), 0);

  const totalParagraphs = section.subsections.reduce((sum, subsection) =>
    sum + subsection.paragraphs.length, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">{section.name}</h3>
        <span className="text-sm text-gray-600">
          {section.subsections.length} alt başlık • {totalParagraphs} paragraf • {totalWords} kelime
        </span>
      </div>

      <div className="space-y-4">
        {section.subsections.map((subsection, subIndex) => (
          <div key={subsection.id} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">
              {subIndex + 1}. {subsection.title}
            </h4>
            {subsection.paragraphs.map((para, pIndex) => (
              <div key={para.id} className="ml-4 mb-2">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-medium">{para.title}:</span>{' '}
                  {para.content.substring(0, 150)}
                  {para.content.length > 150 ? '...' : ''}
                </p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {countWords(para.content)} kelime
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
