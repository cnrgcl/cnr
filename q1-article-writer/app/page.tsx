'use client';

import { useState } from 'react';
import LiteratureInput from '@/components/LiteratureInput';
import ArticleGenerator from '@/components/ArticleGenerator';
import MetricsDashboard from '@/components/MetricsDashboard';
import { LiteratureSummary, GenerationResponse } from '@/types';
import { FileText, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
  const [literatureSummaries, setLiteratureSummaries] = useState<LiteratureSummary[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GenerationResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Q1 Article Writer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                AI destekli, insanlaştırılmış akademik makale yazımı
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                1. NotebookLM Özetleri
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Literatür özetlerinizi NotebookLM'den kopyalayıp yapıştırın
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                2. AI İnsanlaştırma
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              %100 doğal, AI detection'dan geçen içerik üretimi
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                3. Export
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Word veya PDF formatında makalenizi indirin
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Literature Input */}
          <div className="lg:col-span-1">
            <LiteratureInput
              summaries={literatureSummaries}
              onSummariesChange={setLiteratureSummaries}
            />
          </div>

          {/* Right Column - Article Generator & Results */}
          <div className="lg:col-span-2 space-y-6">
            <ArticleGenerator
              literatureSummaries={literatureSummaries}
              onGenerate={(response) => {
                setGeneratedContent(response);
                setIsGenerating(false);
              }}
              onGeneratingChange={setIsGenerating}
            />

            {generatedContent && (
              <>
                <MetricsDashboard metrics={generatedContent.metrics} />

                {/* Generated Content Display */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Üretilen İçerik
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                      {generatedContent.content}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
