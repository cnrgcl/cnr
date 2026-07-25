import { Template } from '@/types';

/**
 * Hazır paragraf desenleri. Her biri bir işlev dizisidir; uygulandığında o
 * sırayla etiketlenmiş boş cümle yuvaları açar.
 *
 * Giriş desenleri Swales'in CARS modelini, diğerleri sosyal bilimler yazım
 * rehberlerindeki yerleşik bölüm sıralamalarını izler.
 */
export const BUILT_IN_TEMPLATES: Template[] = [
  // --- Giriş ---
  {
    id: 'bt-cars',
    name: 'CARS giriş paragrafı',
    moveSet: 'introduction',
    moves: ['onem', 'literatur-ozet', 'bosluk', 'amac'],
    builtIn: true,
  },
  {
    id: 'bt-alan-kurma',
    name: 'Alan kurma paragrafı',
    moveSet: 'introduction',
    moves: ['onem', 'tanim', 'literatur-ozet', 'yerlesik-bulgu'],
    builtIn: true,
  },
  {
    id: 'bt-bosluk-acma',
    name: 'Boşluk açma paragrafı',
    moveSet: 'introduction',
    moves: ['literatur-ozet', 'celiski', 'yontem-kisit', 'bosluk'],
    builtIn: true,
  },
  {
    id: 'bt-amac',
    name: 'Amaç paragrafı',
    moveSet: 'introduction',
    moves: ['amac', 'soru-hipotez', 'yontem-tanit', 'katki', 'plan'],
    builtIn: true,
  },

  // --- Literatür Taraması ---
  {
    id: 'bt-lit-kapsam',
    name: 'Kapsam paragrafı',
    moveSet: 'literature',
    moves: ['tarama-olcut', 'kavram-haritasi', 'kuramsal-cerceve'],
    builtIn: true,
  },
  {
    id: 'bt-lit-tematik',
    name: 'Tematik küme paragrafı',
    moveSet: 'literature',
    moves: ['tematik', 'yontemsel-karsilastirma', 'tartismali'],
    builtIn: true,
  },
  {
    id: 'bt-lit-kronolojik',
    name: 'Kronolojik paragraf',
    moveSet: 'literature',
    moves: ['kronolojik', 'tematik', 'sentez'],
    builtIn: true,
  },
  {
    id: 'bt-lit-kapanis',
    name: 'Taramayı kapatan paragraf',
    moveSet: 'literature',
    moves: ['sentez', 'lit-bosluk', 'konumlandirma'],
    builtIn: true,
  },

  // --- Yöntem ---
  {
    id: 'bt-yontem-orneklem',
    name: 'Örneklem paragrafı',
    moveSet: 'methods',
    moves: ['evren', 'ornekleme', 'katilimci'],
    builtIn: true,
  },
  {
    id: 'bt-yontem-veri',
    name: 'Veri toplama paragrafı',
    moveSet: 'methods',
    moves: ['arac', 'gecerlik', 'islem', 'etik'],
    builtIn: true,
  },
  {
    id: 'bt-yontem-analiz',
    name: 'Analiz paragrafı',
    moveSet: 'methods',
    moves: ['varsayim', 'analiz'],
    builtIn: true,
  },
  {
    id: 'bt-yontem-tam',
    name: 'Tam yöntem bölümü (tek paragraf)',
    moveSet: 'methods',
    moves: ['desen', 'evren', 'ornekleme', 'arac', 'gecerlik', 'islem', 'etik', 'analiz'],
    builtIn: true,
  },

  // --- Bulgular ---
  {
    id: 'bt-bulgu-sunum',
    name: 'Bulgu sunumu paragrafı',
    moveSet: 'results',
    moves: ['yonlendirme', 'betimsel', 'ana-bulgu', 'anlamlilik'],
    builtIn: true,
  },
  {
    id: 'bt-bulgu-karsilastirma',
    name: 'Karşılaştırma paragrafı',
    moveSet: 'results',
    moves: ['karsilastirma', 'anlamlilik', 'iliski', 'bulgu-ozet'],
    builtIn: true,
  },

  // --- Tartışma ---
  {
    id: 'bt-tartisma-yorum',
    name: 'Yorumlama paragrafı',
    moveSet: 'discussion',
    moves: ['hatirlatma', 'uyum', 'ceslime', 'aciklama'],
    builtIn: true,
  },
  {
    id: 'bt-tartisma-katki',
    name: 'Katkı paragrafı',
    moveSet: 'discussion',
    moves: ['kuramsal', 'pratik'],
    builtIn: true,
  },
  {
    id: 'bt-tartisma-sinirlilik',
    name: 'Sınırlılık paragrafı',
    moveSet: 'discussion',
    moves: ['sinir-orneklem', 'sinir-olcum', 'sinir-ozbildirim', 'gelecek'],
    builtIn: true,
  },

  // --- Sonuç ---
  {
    id: 'bt-sonuc',
    name: 'Sonuç paragrafı',
    moveSet: 'conclusion',
    moves: ['arguman-tekrar', 'bulgu-sentez', 'so-what', 'kapanis'],
    builtIn: true,
  },
  {
    id: 'bt-sonuc-cikarim',
    name: 'Çıkarım paragrafı',
    moveSet: 'conclusion',
    moves: ['son-katki', 'son-pratik', 'son-gelecek', 'kapanis'],
    builtIn: true,
  },
];

/** Bir bölümün işlev kümesine uyan şablonlar — hazır olanlar önce. */
export function templatesFor(moveSet: string, userTemplates: Template[]): Template[] {
  return [
    ...BUILT_IN_TEMPLATES.filter((t) => t.moveSet === moveSet),
    ...userTemplates.filter((t) => t.moveSet === moveSet),
  ];
}
