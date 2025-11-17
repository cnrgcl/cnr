/**
 * AI Humanization Prompts and Strategies
 *
 * Bu modül, AI tarafından üretilen içeriği insanlaştırmak için
 * gelişmiş prompt mühendisliği stratejileri içerir.
 */

export function getHumanizationPrompt(level: 'low' | 'medium' | 'high' | 'ultra'): string {
  const baseInstructions = `
You are an expert academic writer who writes in a naturally human way. Your writing MUST be completely undetectable by AI detection tools.

CRITICAL HUMANIZATION RULES:
1. Vary sentence length significantly (mix short, medium, and long sentences)
2. Use natural transitions and connecting phrases
3. Include subtle imperfections (not grammatical errors, but natural variations)
4. Avoid overly perfect or robotic phrasing
5. Use contextual examples and real-world connections
6. Write with a subtle personal academic voice
7. Employ natural paragraph flow with varied structures
8. Use domain-specific terminology naturally, not forcefully
9. Include thoughtful nuances and qualifications in arguments
10. Avoid repetitive sentence structures
11. Write as a human researcher would - with natural flow, occasional tangents, and organic idea development
12. Never be too polished or perfect - humans have natural writing rhythms
`;

  const levelSpecific = {
    low: `
HUMANIZATION LEVEL: LOW (Fast)
- Focus on basic sentence variation
- Natural paragraph breaks
- Minimal processing time
`,
    medium: `
HUMANIZATION LEVEL: MEDIUM (Balanced)
- Moderate sentence variation and complexity
- Natural transitions between ideas
- Balanced academic tone with subtle personality
- Some strategic imperfections in flow
`,
    high: `
HUMANIZATION LEVEL: HIGH (Maximum Natural)
- Extensive sentence structure variation
- Rich, natural transitions and connective tissue
- Strategic use of rhetorical questions and narrative elements
- Subtle academic personality and voice
- Natural digressions and clarifications
- Varied paragraph lengths and structures
- Contextual examples and real-world grounding
- Thoughtful hedging and qualification of claims
- Natural emphasis and de-emphasis patterns

ADVANCED TECHNIQUES:
- Start some sentences with dependent clauses
- Use occasional parenthetical asides
- Employ varied citation integration styles
- Include natural meta-discourse ("It is worth noting that...", "Interestingly,")
- Vary the rhythm and cadence of prose
- Use strategic repetition for emphasis (but avoid monotonous patterns)
- Include subtle complexity variations within paragraphs
`,
    ultra: `
HUMANIZATION LEVEL: ULTRA (AI Detection = 0%)

🎯 GOAL: Create text that is COMPLETELY INDISTINGUISHABLE from human academic writing.

ULTRA-ADVANCED HUMANIZATION TECHNIQUES:

1. SENTENCE STRUCTURE CHAOS (Good Chaos):
   - Mix extremely short sentences (3-5 words) with very long ones (30+ words)
   - Start sentences in unexpected ways: "Though...", "While...", "Despite...", "Given that..."
   - Occasionally use fragments for emphasis. Like this.
   - Vary punctuation: use semicolons, em-dashes, parentheses naturally
   - Some sentences should feel slightly awkward but academically acceptable

2. HUMAN THINKING PATTERNS:
   - Include natural thought progressions: "Initially... however... ultimately..."
   - Show uncertainty where appropriate: "appears to", "seems to suggest", "may indicate"
   - Use hedging language: "arguably", "to some extent", "relatively"
   - Add qualifiers and nuance: "not necessarily", "in most cases", "generally speaking"
   - Think aloud: "It is worth considering whether...", "One might argue that..."

3. ORGANIC FLOW & IMPERFECTIONS:
   - Let ideas develop naturally, not in perfect logical steps
   - Include tangential but relevant observations
   - Circle back to earlier points with "As mentioned earlier" or "Returning to..."
   - Use varied transition words (don't always use the same ones)
   - Some paragraphs short (2-3 sentences), others longer (6-8 sentences)

4. PERSONALITY & VOICE:
   - Inject subtle academic personality (cautious, thoughtful, analytical)
   - Use occasional informal academic phrases: "notably", "strikingly", "curiously"
   - Show genuine engagement with the material
   - Express tentative conclusions: "this suggests", "evidence points to"
   - Acknowledge complexity: "the picture is more nuanced", "this raises questions"

5. RHYTHM & PACING:
   - Vary paragraph openings drastically
   - Don't make every paragraph the same length
   - Use lists sparingly and irregularly
   - Break up dense sections with shorter, punchier paragraphs
   - Create natural breathing room in the text

6. STRATEGIC "IMPERFECTIONS":
   - Occasionally place modifiers in unexpected (but correct) positions
   - Use some passive voice (but not too much)
   - Include complex nested clauses sometimes
   - Vary the rhythm: fast-slow-fast-slow
   - Don't be too consistent in anything

7. CITATION INTEGRATION VARIETY:
   - "According to Smith (2020)..."
   - "Research suggests that... (Jones, 2019)"
   - "As demonstrated by..."
   - "Smith and colleagues (2020) found..."
   - "Recent work (Smith, 2020; Jones, 2019) indicates..."

8. META-DISCOURSE (Natural Academic Voice):
   - "It is important to note that..."
   - "This raises an interesting question..."
   - "Surprisingly,..."
   - "One cannot ignore..."
   - "This finding aligns with..."
   - "Interestingly enough,..."

9. COGNITIVE COMPLEXITY MARKERS:
   - Show reasoning process: "If X, then Y, but given Z..."
   - Use conditional statements: "should this prove accurate..."
   - Acknowledge counterarguments: "while some might argue..., evidence suggests..."
   - Express causal relationships in varied ways

10. ANTI-AI PATTERNS:
    - Never be too perfect or polished
    - Avoid overly smooth transitions (sometimes be slightly abrupt)
    - Don't use the same sentence patterns repeatedly
    - Resist the urge to be comprehensive in every sentence
    - Write like you're thinking, not like you're executing a template
    - Include human-like "messiness" in idea development

ABSOLUTE RULES FOR ULTRA MODE:
❌ NO perfect parallel structures throughout
❌ NO consistent sentence lengths
❌ NO overly smooth, polished prose
❌ NO robotic listing of points
❌ NO template-like patterns
✅ YES to natural chaos and organic development
✅ YES to human-like thinking patterns
✅ YES to subtle imperfections and irregularities
✅ YES to personal academic voice
✅ YES to complexity that mirrors human thought
`,
  };

  return baseInstructions + levelSpecific[level];
}

export function getSectionPrompt(
  sectionType: string,
  literatureSummaries: string,
  articleTitle: string,
  researchQuestion: string,
  additionalContext: string
): string {
  const sectionPrompts = {
    introduction: `
Write a compelling INTRODUCTION section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Literature Context:
${literatureSummaries}

Additional Context:
${additionalContext}

INTRODUCTION REQUIREMENTS:
- Start with a broad context and narrow down to the specific research gap
- Clearly establish the importance and relevance of the topic
- Reference key literature naturally (use the provided summaries)
- Articulate the research problem and objectives
- Preview the article structure briefly
- Length: 800-1200 words
- Use natural, engaging academic prose
- Avoid clichés like "In today's world" or "Since the dawn of time"
`,
    literature: `
Write a comprehensive LITERATURE REVIEW section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Literature Summaries:
${literatureSummaries}

Additional Context:
${additionalContext}

LITERATURE REVIEW REQUIREMENTS:
- Organize by themes or chronologically (choose what fits best)
- Synthesize findings across studies, don't just summarize each one
- Identify patterns, contradictions, and gaps in the literature
- Build a narrative that leads to your research gap
- Critically analyze the methodologies and findings
- Show how different studies relate to each other
- Length: 1500-2500 words
- Use varied citation integration styles
- Create smooth transitions between topics
`,
    methodology: `
Write a detailed METHODOLOGY section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Context from Literature:
${literatureSummaries}

Additional Context:
${additionalContext}

METHODOLOGY REQUIREMENTS:
- Describe research design and approach
- Justify methodological choices with reference to literature
- Detail data collection procedures
- Explain sampling strategy and criteria
- Describe analytical techniques
- Address reliability and validity considerations
- Discuss ethical considerations if relevant
- Length: 1000-1500 words
- Be specific and replicable, but maintain natural prose
- Explain the "why" behind methodological choices
`,
    results: `
Write a clear and comprehensive RESULTS section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Research Context:
${literatureSummaries}

Additional Context:
${additionalContext}

RESULTS REQUIREMENTS:
- Present findings in a logical, organized manner
- Use subheadings to organize different result categories
- Describe patterns and trends in the data
- Reference tables and figures naturally (even if not yet created)
- Report both expected and unexpected findings
- Use appropriate statistical language where relevant
- Avoid interpretation (save for Discussion)
- Length: 1200-2000 words
- Maintain objectivity while being engaging
`,
    discussion: `
Write an insightful DISCUSSION section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Literature Context:
${literatureSummaries}

Additional Context:
${additionalContext}

DISCUSSION REQUIREMENTS:
- Interpret the findings in relation to research question
- Connect results back to the literature reviewed
- Explain how findings confirm, contradict, or extend previous research
- Discuss theoretical and practical implications
- Acknowledge limitations honestly
- Suggest directions for future research
- Avoid overstating conclusions
- Length: 1500-2000 words
- Balance confidence with appropriate hedging
- Create rich connections between ideas
`,
    conclusion: `
Write a strong CONCLUSION section for an academic article.

Article Title: ${articleTitle}
Research Question: ${researchQuestion}

Research Context:
${literatureSummaries}

Additional Context:
${additionalContext}

CONCLUSION REQUIREMENTS:
- Summarize key findings and their significance
- Restate the main contribution to the field
- Highlight theoretical and practical implications
- Acknowledge key limitations
- Suggest concrete directions for future research
- End with a broader perspective on the field
- Length: 600-900 words
- Provide closure while opening future possibilities
- Avoid introducing new information
`,
  };

  return sectionPrompts[sectionType as keyof typeof sectionPrompts] || sectionPrompts.introduction;
}

/**
 * Get rewriting prompt for multi-pass humanization
 */
export function getRewritingPrompt(originalText: string, passNumber: number): string {
  return `
You are rewriting academic text to make it MORE HUMAN and LESS DETECTABLE by AI detection tools.

PASS ${passNumber} - FOCUS: ${passNumber === 1 ? 'Sentence Structure Variation' : 'Natural Flow & Personality'}

ORIGINAL TEXT:
${originalText}

REWRITING INSTRUCTIONS:

${passNumber === 1 ? `
PASS 1 - SENTENCE STRUCTURE VARIATION:
- Drastically vary sentence lengths (some very short, some very long)
- Start sentences in different ways each time
- Mix simple and complex sentence structures
- Add occasional sentence fragments for emphasis
- Use different punctuation patterns (semicolons, em-dashes, parentheses)
- Break up any repetitive patterns
` : `
PASS 2 - NATURAL FLOW & PERSONALITY:
- Add natural academic voice and personality
- Include hedging language and qualifiers
- Add meta-discourse markers ("Interestingly,", "Notably,", etc.)
- Create more organic transitions between ideas
- Add subtle tangents and elaborations
- Make it feel like a human thinking through ideas
- Remove any remaining AI-like smoothness
`}

CRITICAL:
- Maintain all factual content and academic integrity
- Keep the same references and citations
- Preserve the core argument and structure
- Only change HOW it's expressed, not WHAT is expressed
- Make it sound like a real human academic wrote it

Rewrite the text now:`;
}

/**
 * Post-processing to add final human touches
 */
export function postProcessText(text: string): string {
  let processed = text;

  // Add varied spacing between paragraphs (some single, some double line breaks)
  processed = processed.replace(/\n\n\n+/g, '\n\n');

  // Ensure some paragraphs have irregular lengths by occasionally combining short ones
  const paragraphs = processed.split('\n\n');
  const finalParagraphs: string[] = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const wordCount = para.split(/\s+/).length;

    // Occasionally combine very short paragraphs (< 30 words) with next one
    if (wordCount < 30 && i < paragraphs.length - 1 && Math.random() > 0.6) {
      finalParagraphs.push(para + ' ' + paragraphs[i + 1]);
      i++; // Skip next paragraph since we combined it
    } else {
      finalParagraphs.push(para);
    }
  }

  return finalParagraphs.join('\n\n');
}
