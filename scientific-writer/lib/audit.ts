import { Paper, Reference } from '@/types';
import { isReferenceIncomplete, referenceUsage } from './utils';

export type Severity = 'error' | 'warning' | 'info';

export interface Finding {
  id: string;
  severity: Severity;
  category: string;
  message: string;
  location: string;
  sectionId?: string;
  anchorId?: string;
}

/**
 * Bir bölümde bulunması beklenen hamleler. Her kayıt bir "en az biri" kümesi:
 * listedeki işlevlerden hiçbiri kullanılmamışsa eksik sayılır.
 */
const REQUIRED_MOVES: Record<string, { anyOf: string[]; label: string }[]> = {
  introduction: [
    { anyOf: ['onem', 'tanim', 'literatur-ozet', 'yerlesik-bulgu'], label: 'alan kurma' },
    { anyOf: ['celiski', 'bosluk', 'yontem-kisit', 'cevapsiz-soru'], label: 'boşluk açma' },
    { anyOf: ['amac'], label: 'çalışmanın amacı' },
    { anyOf: ['soru-hipotez'], label: 'araştırma sorusu / hipotez' },
  ],
  literature: [
    { anyOf: ['sentez', 'lit-bosluk'], label: 'sentez veya boşluğun gösterilmesi' },
  ],
  methods: [
    { anyOf: ['desen'], label: 'araştırma deseni' },
    { anyOf: ['evren', 'ornekleme', 'katilimci'], label: 'örneklem bilgisi' },
    { anyOf: ['arac'], label: 'veri toplama aracı' },
    { anyOf: ['analiz'], label: 'analiz tekniği' },
    { anyOf: ['etik'], label: 'etik onay' },
  ],
  results: [{ anyOf: ['ana-bulgu'], label: 'ana bulgu' }],
  discussion: [
    { anyOf: ['uyum', 'ceslime'], label: 'literatürle ilişkilendirme' },
    {
      anyOf: [
        'sinir-orneklem',
        'sinir-onceki',
        'sinir-olcum',
        'sinir-ozbildirim',
        'sinir-erisim',
        'sinir-boylamsal',
        'sinirlilik',
      ],
      label: 'sınırlılık',
    },
    { anyOf: ['gelecek'], label: 'gelecek araştırma önerisi' },
  ],
  conclusion: [
    { anyOf: ['arguman-tekrar', 'bulgu-sentez'], label: 'toparlama' },
    { anyOf: ['kapanis'], label: 'kapanış cümlesi' },
  ],
};

/** Kaynak beklenen işlevler — bunlar başkasının iddiasını aktarır. */
const NEEDS_CITATION = new Set([
  'literatur-ozet',
  'yerlesik-bulgu',
  'celiski',
  'yontem-kisit',
  'kuramsal-cerceve',
  'kronolojik',
  'tematik',
  'yontemsel-karsilastirma',
  'tartismali',
  'sentez',
  'uyum',
  'ceslime',
]);

/** Sosyal bilimlerde alışılmış paragraf uzunluğu üst sınırı. */
const LONG_PARAGRAPH = 10;

export function auditPaper(paper: Paper): Finding[] {
  const findings: Finding[] = [];
  let counter = 0;
  const add = (f: Omit<Finding, 'id'>) => findings.push({ ...f, id: `f${counter++}` });

  paper.sections.forEach((section, sIdx) => {
    const sectionSentences = section.subsections.flatMap((sub) =>
      sub.paragraphs.flatMap((p) => p.sentences)
    );

    // Boş bölümü denetleme — yeni makalede her şeyi hata olarak göstermemek için.
    if (sectionSentences.length === 0) return;

    // 1) Bölümde beklenen hamleler var mı?
    const usedMoves = new Set(sectionSentences.map((s) => s.move).filter(Boolean));
    (REQUIRED_MOVES[section.moveSet] ?? []).forEach((req) => {
      if (!req.anyOf.some((m) => usedMoves.has(m))) {
        add({
          severity: 'warning',
          category: 'eksik-hamle',
          message: `"${req.label}" işlevini gören hiçbir cümle yok`,
          location: `${sIdx + 1}. ${section.name}`,
          sectionId: section.id,
        });
      }
    });

    section.subsections.forEach((sub, subIdx) => {
      const subLabel = `${sIdx + 1}.${subIdx + 1} ${sub.title}`;

      if (sub.targetParagraphs > 0 && sub.paragraphs.length < sub.targetParagraphs) {
        add({
          severity: 'info',
          category: 'hedef',
          message: `${sub.paragraphs.length}/${sub.targetParagraphs} paragraf — hedefin altında`,
          location: subLabel,
          sectionId: section.id,
        });
      }

      sub.paragraphs.forEach((para, pIdx) => {
        const written = para.sentences.filter((s) => s.text.trim());
        const paraLabel = `${subLabel} · P${pIdx + 1}`;

        // Hiç yazılmamış paragrafı denetleme.
        if (written.length === 0) return;

        if (!para.theme.trim()) {
          add({
            severity: 'warning',
            category: 'plan',
            message: 'Paragrafın teması yazılmamış',
            location: paraLabel,
            sectionId: section.id,
            anchorId: para.id,
          });
        }

        if (para.targetSentences > 0 && written.length > para.targetSentences) {
          add({
            severity: 'info',
            category: 'hedef',
            message: `${written.length} cümle yazıldı, hedef ${para.targetSentences} idi`,
            location: paraLabel,
            sectionId: section.id,
            anchorId: para.id,
          });
        }

        if (written.length > LONG_PARAGRAPH) {
          add({
            severity: 'info',
            category: 'uzunluk',
            message: `${written.length} cümle — paragraf uzun, bölmeyi düşünün`,
            location: paraLabel,
            sectionId: section.id,
            anchorId: para.id,
          });
        }

        para.sentences.forEach((sentence, senIdx) => {
          if (!sentence.text.trim()) return;
          const senLabel = `${paraLabel} · C${senIdx + 1}`;

          if (!sentence.move) {
            add({
              severity: 'warning',
              category: 'etiketsiz',
              message: 'Cümlenin retorik işlevi seçilmemiş',
              location: senLabel,
              sectionId: section.id,
              anchorId: para.id,
            });
          }

          if (NEEDS_CITATION.has(sentence.move) && sentence.citations.length === 0) {
            add({
              severity: 'error',
              category: 'kaynaksiz-iddia',
              message: 'Başkasının bulgusunu aktaran cümlede kaynak yok',
              location: senLabel,
              sectionId: section.id,
              anchorId: para.id,
            });
          }

          // Sonuç bölümüne yeni kaynak sokmamak yerleşik bir beklentidir.
          if (section.moveSet === 'conclusion' && sentence.citations.length > 0) {
            add({
              severity: 'info',
              category: 'sonucta-atif',
              message: 'Sonuç bölümünde atıf var — genelde yeni kaynak girilmez',
              location: senLabel,
              sectionId: section.id,
              anchorId: para.id,
            });
          }
        });
      });
    });
  });

  // 2) Kaynakça bütünlüğü
  paper.references.forEach((ref: Reference) => {
    if (isReferenceIncomplete(ref)) {
      add({
        severity: 'warning',
        category: 'kaynak-eksik',
        message: `Kaynağın bilgileri eksik: ${ref.full.trim() || '(boş kayıt)'}`,
        location: 'Kaynakça',
      });
    }
    if (referenceUsage(paper, ref.id) === 0) {
      add({
        severity: 'info',
        category: 'kaynak-kullanilmiyor',
        message: `Hiçbir cümlede kullanılmıyor: ${ref.full.trim() || '(boş kayıt)'}`,
        location: 'Kaynakça',
      });
    }
  });

  // 3) Özet
  const hasContent = paper.sections.some((s) =>
    s.subsections.some((sub) => sub.paragraphs.some((p) => p.sentences.some((x) => x.text.trim())))
  );
  if (hasContent && !paper.abstractTR.trim()) {
    add({ severity: 'info', category: 'ozet', message: 'Türkçe özet boş', location: 'Özet' });
  }
  if (hasContent && paper.keywordsTR.length === 0) {
    add({ severity: 'info', category: 'ozet', message: 'Anahtar kelime girilmemiş', location: 'Özet' });
  }

  const order: Severity[] = ['error', 'warning', 'info'];
  return findings.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));
}

export function countBySeverity(findings: Finding[]): Record<Severity, number> {
  return {
    error: findings.filter((f) => f.severity === 'error').length,
    warning: findings.filter((f) => f.severity === 'warning').length,
    info: findings.filter((f) => f.severity === 'info').length,
  };
}
