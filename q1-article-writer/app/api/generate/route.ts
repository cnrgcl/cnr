import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';
import { getHumanizationPrompt, getSectionPrompt, getRewritingPrompt, postProcessText } from '@/lib/humanization';
import { calculateMetrics } from '@/lib/metrics';
import { GenerationRequest, GenerationResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json();

    const {
      literatureSummaries,
      sectionType,
      articleTitle = 'Untitled Article',
      researchQuestion = '',
      additionalContext = '',
      humanizationLevel = 'high',
    } = body;

    if (!literatureSummaries || literatureSummaries.length === 0) {
      return NextResponse.json(
        { error: 'At least one literature summary is required' },
        { status: 400 }
      );
    }

    // Format literature summaries for the prompt
    const formattedLiterature = literatureSummaries
      .map(
        (lit, idx) => `
[${idx + 1}] ${lit.title}
Authors: ${lit.authors || 'N/A'}
Year: ${lit.year || 'N/A'}

Summary:
${lit.summary}

Key Findings:
${lit.keyFindings || 'N/A'}
${lit.citation ? `\nCitation: ${lit.citation}` : ''}
---
`
      )
      .join('\n');

    // Build the complete prompt
    const humanizationInstructions = getHumanizationPrompt(humanizationLevel);
    const sectionInstructions = getSectionPrompt(
      sectionType,
      formattedLiterature,
      articleTitle,
      researchQuestion,
      additionalContext
    );

    const fullPrompt = `${humanizationInstructions}

${sectionInstructions}

IMPORTANT REMINDERS:
- Write naturally and humanly
- Vary your sentence structures significantly
- Use the provided literature summaries as your knowledge base
- Cite sources naturally using author-year format when referencing the literature
- Make the writing flow smoothly and naturally
- Avoid AI-like patterns and perfect structures
- Write as if you're an experienced academic researcher

Now write the ${sectionType} section:`;

    // Call Claude API for initial generation
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      temperature: humanizationLevel === 'ultra' ? 0.9 : 0.8, // Higher temperature for ultra mode
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    // Extract the generated text
    let generatedText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Multi-pass rewriting for ULTRA mode
    if (humanizationLevel === 'ultra') {
      // Pass 1: Sentence Structure Variation
      const pass1Message = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 4096,
        temperature: 0.9,
        messages: [
          {
            role: 'user',
            content: getRewritingPrompt(generatedText, 1),
          },
        ],
      });

      generatedText = pass1Message.content[0].type === 'text'
        ? pass1Message.content[0].text
        : generatedText;

      // Pass 2: Natural Flow & Personality
      const pass2Message = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 4096,
        temperature: 0.85,
        messages: [
          {
            role: 'user',
            content: getRewritingPrompt(generatedText, 2),
          },
        ],
      });

      generatedText = pass2Message.content[0].type === 'text'
        ? pass2Message.content[0].text
        : generatedText;

      // Post-processing for final touches
      generatedText = postProcessText(generatedText);
    }

    // Calculate metrics
    const metrics = calculateMetrics(generatedText);

    // Prepare response
    const response: GenerationResponse = {
      content: generatedText,
      metrics,
      suggestions: generateSuggestions(metrics, humanizationLevel),
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: 500 }
    );
  }
}

function generateSuggestions(metrics: any, level: string): string[] {
  const suggestions: string[] = [];

  if (metrics.aiDetectionScore > 30) {
    suggestions.push('AI detection skoru yüksek. "Ultra" modunu deneyin veya "Yeniden üret" butonuna basın.');
  } else if (metrics.aiDetectionScore > 15) {
    suggestions.push('AI detection skoru orta seviyede. "Ultra" mode ile daha da düşürebilirsiniz.');
  } else if (metrics.aiDetectionScore <= 10) {
    suggestions.push('🎉 Mükemmel! AI detection skoru çok düşük - içerik tamamen insan benzeri!');
  }

  if (metrics.humanLikeScore < 60) {
    suggestions.push('İnsan benzeri skoru düşük. Humanization seviyesini "Ultra" olarak ayarlayın.');
  } else if (metrics.humanLikeScore >= 80) {
    suggestions.push('✨ Harika! İnsan benzeri skoru çok yüksek.');
  }

  if (metrics.burstiness === 'low') {
    suggestions.push('Cümle varyasyonu düşük. Ultra mode otomatik olarak bunu iyileştirir.');
  } else if (metrics.burstiness === 'high') {
    suggestions.push('✅ Mükemmel cümle varyasyonu - tamamen doğal!');
  }

  if (metrics.perplexity === 'low') {
    suggestions.push('Kelime çeşitliliği artırılabilir. Ultra mode daha zengin kelime dağarcığı kullanır.');
  } else if (metrics.perplexity === 'high') {
    suggestions.push('✅ Mükemmel kelime çeşitliliği!');
  }

  if (metrics.academicQuality < 70) {
    suggestions.push('Akademik kalite artırılabilir. Daha fazla akademik terminoloji ve referans ekleyin.');
  } else if (metrics.academicQuality >= 85) {
    suggestions.push('🎓 Mükemmel akademik kalite - Q1 standartlarına uygun!');
  }

  if (level === 'ultra' && metrics.aiDetectionScore <= 15 && metrics.humanLikeScore >= 75) {
    suggestions.push('🔥 ULTRA MODE BAŞARILI! Bu içerik AI detection testlerinden geçmelidir.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Mükemmel! İçerik yüksek kalitede ve doğal görünüyor.');
  }

  return suggestions;
}
