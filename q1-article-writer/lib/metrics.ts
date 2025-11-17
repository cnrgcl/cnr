import { HumanizationMetrics } from '@/types';

/**
 * Calculate AI detection and humanization metrics
 * These are heuristic-based calculations
 */

export function calculateMetrics(text: string): HumanizationMetrics {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

  // Calculate sentence length variation (burstiness)
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const sentenceLengthVariance = sentenceLengths.reduce((acc, len) => {
    return acc + Math.pow(len - avgSentenceLength, 2);
  }, 0) / sentenceLengths.length;
  const sentenceLengthStdDev = Math.sqrt(sentenceLengthVariance);

  // Burstiness score (higher variance = more human-like)
  const burstinessScore = sentenceLengthStdDev / avgSentenceLength;
  const burstiness: 'low' | 'medium' | 'high' =
    burstinessScore > 0.5 ? 'high' : burstinessScore > 0.3 ? 'medium' : 'low';

  // Word diversity (perplexity proxy)
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const wordDiversity = uniqueWords.size / words.length;
  const perplexity: 'low' | 'medium' | 'high' =
    wordDiversity > 0.6 ? 'high' : wordDiversity > 0.4 ? 'medium' : 'low';

  // AI detection heuristics (lower is better)
  let aiDetectionScore = 50; // Base score

  // Reduce score for good burstiness
  if (burstinessScore > 0.5) aiDetectionScore -= 20;
  else if (burstinessScore > 0.3) aiDetectionScore -= 10;

  // Reduce score for high word diversity
  if (wordDiversity > 0.6) aiDetectionScore -= 15;
  else if (wordDiversity > 0.4) aiDetectionScore -= 8;

  // Check for transition words (natural writing)
  const transitionWords = [
    'however', 'moreover', 'furthermore', 'nevertheless', 'consequently',
    'therefore', 'thus', 'hence', 'additionally', 'alternatively',
    'specifically', 'notably', 'interestingly', 'importantly'
  ];
  const transitionCount = words.filter(w =>
    transitionWords.includes(w.toLowerCase().replace(/[,.]/, ''))
  ).length;
  const transitionRatio = transitionCount / sentences.length;
  if (transitionRatio > 0.15) aiDetectionScore -= 10;

  // Check for varied sentence starters
  const sentenceStarters = sentences
    .map(s => s.trim().split(/\s+/)[0]?.toLowerCase())
    .filter(Boolean);
  const uniqueStarters = new Set(sentenceStarters);
  const starterDiversity = uniqueStarters.size / sentenceStarters.length;
  if (starterDiversity > 0.7) aiDetectionScore -= 10;

  // Ensure score is in valid range
  aiDetectionScore = Math.max(0, Math.min(100, aiDetectionScore));

  // Human-like score (inverse of AI detection)
  const humanLikeScore = Math.round(100 - aiDetectionScore);

  // Academic quality heuristics
  let academicQuality = 60; // Base score

  // Check for academic vocabulary
  const academicWords = [
    'significant', 'substantial', 'demonstrate', 'indicate', 'suggest',
    'evidence', 'analysis', 'framework', 'methodology', 'findings',
    'implications', 'theoretical', 'empirical', 'comprehensive', 'systematic'
  ];
  const academicWordCount = words.filter(w =>
    academicWords.includes(w.toLowerCase().replace(/[,.]/, ''))
  ).length;
  const academicRatio = academicWordCount / words.length;
  if (academicRatio > 0.03) academicQuality += 15;
  else if (academicRatio > 0.02) academicQuality += 10;

  // Check for proper paragraph length
  const avgParagraphLength = paragraphs.reduce((acc, p) => {
    return acc + p.split(/\s+/).length;
  }, 0) / paragraphs.length;
  if (avgParagraphLength > 80 && avgParagraphLength < 200) academicQuality += 10;

  // Check sentence complexity
  if (avgSentenceLength > 15 && avgSentenceLength < 30) academicQuality += 15;

  academicQuality = Math.min(100, academicQuality);

  // Readability score (Flesch-Kincaid approximation)
  const syllableCount = estimateSyllables(text);
  const fleschScore = 206.835 -
    1.015 * (words.length / sentences.length) -
    84.6 * (syllableCount / words.length);
  const readabilityScore = Math.max(0, Math.min(100, Math.round(fleschScore)));

  return {
    aiDetectionScore: Math.round(aiDetectionScore),
    humanLikeScore,
    perplexity,
    burstiness,
    readabilityScore,
    academicQuality: Math.round(academicQuality),
  };
}

function estimateSyllables(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  let syllables = 0;

  words.forEach(word => {
    // Remove non-letters
    word = word.replace(/[^a-z]/g, '');
    if (word.length === 0) return;

    // Count vowel groups
    const vowelGroups = word.match(/[aeıioöuü]+/g);
    syllables += vowelGroups ? vowelGroups.length : 1;

    // Adjust for silent e
    if (word.endsWith('e')) syllables -= 1;

    // Ensure at least 1 syllable
    if (syllables < 1) syllables = 1;
  });

  return syllables;
}
