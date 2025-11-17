'use client';

import { HumanizationMetrics } from '@/types';
import { Activity, TrendingUp, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  metrics: HumanizationMetrics;
}

export default function MetricsDashboard({ metrics }: Props) {
  const getScoreColor = (score: number, inverse: boolean = false) => {
    if (inverse) {
      // For AI detection (lower is better)
      if (score < 20) return 'text-green-600 dark:text-green-400';
      if (score < 40) return 'text-yellow-600 dark:text-yellow-400';
      return 'text-red-600 dark:text-red-400';
    } else {
      // For quality scores (higher is better)
      if (score >= 70) return 'text-green-600 dark:text-green-400';
      if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
      return 'text-red-600 dark:text-red-400';
    }
  };

  const getStatusIcon = (score: number, inverse: boolean = false) => {
    const isGood = inverse ? score < 20 : score >= 70;
    return isGood ? (
      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
    ) : (
      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    );
  };

  const getPerplexityColor = (level: string) => {
    if (level === 'high') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (level === 'medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Kalite Metrikleri
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* AI Detection Score */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              AI Detection
            </span>
            {getStatusIcon(metrics.aiDetectionScore, true)}
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.aiDetectionScore, true)}`}>
            {metrics.aiDetectionScore}%
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                metrics.aiDetectionScore < 20
                  ? 'bg-green-600'
                  : metrics.aiDetectionScore < 40
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${100 - metrics.aiDetectionScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {metrics.aiDetectionScore < 20 && '✓ Güvenli'}
            {metrics.aiDetectionScore >= 20 && metrics.aiDetectionScore < 40 && '⚠ Dikkat'}
            {metrics.aiDetectionScore >= 40 && '✗ Risk'}
          </p>
        </div>

        {/* Human-like Score */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              İnsan Benzeri
            </span>
            {getStatusIcon(metrics.humanLikeScore)}
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.humanLikeScore)}`}>
            {metrics.humanLikeScore}%
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                metrics.humanLikeScore >= 70
                  ? 'bg-green-600'
                  : metrics.humanLikeScore >= 50
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${metrics.humanLikeScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Doğallık skoru
          </p>
        </div>

        {/* Academic Quality */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Akademik Kalite
            </span>
            {getStatusIcon(metrics.academicQuality)}
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.academicQuality)}`}>
            {metrics.academicQuality}%
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                metrics.academicQuality >= 70
                  ? 'bg-green-600'
                  : metrics.academicQuality >= 50
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
              }`}
              style={{ width: `${metrics.academicQuality}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Q1 standartları
          </p>
        </div>

        {/* Readability */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Okunabilirlik
            </span>
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(metrics.readabilityScore)}`}>
            {metrics.readabilityScore}%
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all"
              style={{ width: `${metrics.readabilityScore}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Flesch-Kincaid
          </p>
        </div>

        {/* Perplexity */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Perplexity
            </span>
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPerplexityColor(metrics.perplexity)}`}>
              {metrics.perplexity.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Kelime çeşitliliği
          </p>
        </div>

        {/* Burstiness */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Burstiness
            </span>
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPerplexityColor(metrics.burstiness)}`}>
              {metrics.burstiness.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Cümle varyasyonu
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <p className="text-sm text-indigo-900 dark:text-indigo-200">
          <strong>Özet:</strong>{' '}
          {metrics.aiDetectionScore < 20 && metrics.humanLikeScore >= 70
            ? '✓ Mükemmel! İçerik hem doğal hem de AI detection testlerinden geçebilir.'
            : metrics.aiDetectionScore < 40
            ? '⚠ İyi durumda. Bazı küçük düzenlemeler yapılabilir.'
            : '⚠ İçeriğin daha fazla insanlaştırılması önerilir.'}
        </p>
      </div>
    </div>
  );
}
