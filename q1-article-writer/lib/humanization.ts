/**
 * AI Humanization Prompts and Strategies
 *
 * Bu modül, AI tarafından üretilen içeriği insanlaştırmak için
 * gelişmiş prompt mühendisliği stratejileri içerir.
 */

export function getHumanizationPrompt(level: 'low' | 'medium' | 'high'): string {
  const baseInstructions = `
You are an expert academic writer who writes in a naturally human way. Your writing must pass AI detection tools.

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
