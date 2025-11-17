import { NextRequest, NextResponse } from 'next/server';
import { anthropic, MODEL } from '@/lib/anthropic';
import { getHumanizationPrompt, getSectionPrompt } from '@/lib/humanization';
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

    // Call Claude API
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      temperature: 0.8, // Higher temperature for more variation
      messages: [
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
    });

    // Extract the generated text
    const generatedText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Calculate metrics
    const metrics = calculateMetrics(generatedText);

    // Prepare response
    const response: GenerationResponse = {
      content: generatedText,
      metrics,
      suggestions: generateSuggestions(metrics),
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

function generateSuggestions(metrics: any): string[] {
  const suggestions: string[] = [];

  if (metrics.aiDetectionScore > 30) {
    suggestions.push('AI detection skoru yüksek. "Yeniden üret" butonuna basarak daha doğal bir versiyon alabilirsiniz.');
  }

  if (metrics.humanLikeScore < 60) {
    suggestions.push('İnsan benzeri skoru düşük. Humanization seviyesini "Yüksek" olarak ayarlayın.');
  }

  if (metrics.burstiness === 'low') {
    suggestions.push('Cümle varyasyonu düşük. Manuel olarak bazı cümleleri uzatıp kısaltabilirsiniz.');
  }

  if (metrics.perplexity === 'low') {
    suggestions.push('Kelime çeşitliliği artırılabilir. Bazı kelimeleri sinonimlerle değiştirin.');
  }

  if (metrics.academicQuality < 70) {
    suggestions.push('Akademik kalite artırılabilir. Daha fazla akademik terminoloji ve referans ekleyin.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Mükemmel! İçerik yüksek kalitede ve doğal görünüyor.');
  }

  return suggestions;
}
