import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

export async function POST(request: NextRequest) {
  try {
    const { content, title } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Split content into paragraphs
    const paragraphs = content.split('\n\n').filter((p: string) => p.trim());

    // Create document sections
    const docParagraphs = [];

    // Add title
    if (title) {
      docParagraphs.push(
        new Paragraph({
          text: title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        })
      );
    }

    // Add content paragraphs
    paragraphs.forEach((para: string) => {
      // Check if it's a heading (starts with #)
      if (para.trim().startsWith('#')) {
        const headingText = para.replace(/^#+\s*/, '').trim();
        docParagraphs.push(
          new Paragraph({
            text: headingText,
            heading: HeadingLevel.HEADING_1,
            spacing: {
              before: 240,
              after: 120,
            },
          })
        );
      } else {
        // Regular paragraph
        docParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: para.trim(),
                font: 'Times New Roman',
                size: 24, // 12pt
              }),
            ],
            spacing: {
              after: 200,
              line: 360, // 1.5 line spacing
            },
            alignment: AlignmentType.JUSTIFIED,
          })
        );
      }
    });

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440, // 1 inch
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: docParagraphs,
        },
      ],
    });

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc);

    // Return as downloadable file
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${title || 'article'}.docx"`,
      },
    });
  } catch (error: any) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to export document' },
      { status: 500 }
    );
  }
}
