// Retorik işlev kütüphanesi.
// Giriş bölümü Swales'in CARS (Create A Research Space) modeline dayanır:
// alan kurma -> boşluk açma -> boşluğu doldurma.
// Diğer bölümler sosyal bilimler makalelerinde yerleşik sıralamayı izler.

export interface Move {
  id: string;
  label: string;
  hint: string;
}

export interface MoveGroup {
  group: string;
  moves: Move[];
}

export const MOVE_LIBRARY: Record<string, MoveGroup[]> = {
  introduction: [
    {
      group: '1. Alan kurma',
      moves: [
        { id: 'onem', label: 'Konunun genel önemi', hint: 'Alanın neden önemli olduğunu kuran açılış cümlesi' },
        { id: 'tanim', label: 'Kavram tanımı', hint: 'Merkezi kavramın nasıl tanımlandığı' },
        { id: 'literatur-ozet', label: 'Geçmiş çalışmaların özeti', hint: 'Alanda ne yapılmış — kronolojik veya tematik' },
        { id: 'yerlesik-bulgu', label: 'Yerleşik bulgunun aktarımı', hint: 'Üzerinde uzlaşılan bulgu' },
      ],
    },
    {
      group: '2. Boşluk açma',
      moves: [
        { id: 'celiski', label: 'Karşıt bulgu / çelişki', hint: 'Literatürdeki tutarsızlık' },
        { id: 'bosluk', label: 'Eksik kalan yön (boşluk)', hint: 'Henüz çalışılmamış olan' },
        { id: 'yontem-kisit', label: 'Yöntemsel kısıt', hint: 'Önceki çalışmaların yöntem sorunu' },
        { id: 'cevapsiz-soru', label: 'Cevaplanmamış soru', hint: 'Literatürün yanıtlamadığı soru' },
      ],
    },
    {
      group: '3. Boşluğu doldurma',
      moves: [
        { id: 'amac', label: 'Çalışmanın amacı', hint: '"Bu çalışmanın amacı ...dır."' },
        { id: 'soru-hipotez', label: 'Araştırma sorusu / hipotez', hint: 'Test edilecek önerme' },
        { id: 'yontem-tanit', label: 'Yöntemin kısa tanıtımı', hint: 'Nasıl yapıldığının bir cümlelik özeti' },
        { id: 'kapsam', label: 'Kapsam ve sınırlar', hint: 'Neyi kapsıyor, neyi kapsamıyor' },
        { id: 'katki', label: 'Katkı beyanı', hint: 'Bu çalışma alana ne katıyor' },
        { id: 'plan', label: 'Makalenin planı', hint: '"İzleyen bölümde ..."' },
      ],
    },
  ],

  literature: [
    {
      group: 'Kapsam',
      moves: [
        { id: 'tarama-olcut', label: 'Tarama ölçütleri', hint: 'Hangi veri tabanları, hangi yıllar, hangi dahil etme ölçütü' },
        { id: 'kuramsal-cerceve', label: 'Kuramsal çerçeve', hint: 'Çalışmayı hangi kuram üzerine kuruyorsun' },
        { id: 'kavram-haritasi', label: 'Kavramların tanımlanması', hint: 'Alanda kavram nasıl kullanılıyor' },
      ],
    },
    {
      group: 'Alanyazının düzeni',
      moves: [
        { id: 'kronolojik', label: 'Kronolojik gelişim', hint: 'Alan zaman içinde nasıl değişmiş' },
        { id: 'tematik', label: 'Tematik küme', hint: 'Bir yaklaşımı paylaşan çalışmalar öbeği' },
        { id: 'yontemsel-karsilastirma', label: 'Yöntemsel karşılaştırma', hint: 'Çalışmalar hangi yöntemleri kullanmış' },
        { id: 'tartismali', label: 'Tartışmalı alan / karşıt görüşler', hint: 'Uzlaşılamayan nokta' },
      ],
    },
    {
      group: 'Kapanış',
      moves: [
        { id: 'sentez', label: 'Sentez', hint: 'Alanyazın toplamda ne söylüyor' },
        { id: 'lit-bosluk', label: 'Boşluğun gösterilmesi', hint: 'Bu taramanın ortaya çıkardığı eksik' },
        { id: 'konumlandirma', label: 'Çalışmanın konumlandırılması', hint: 'Senin çalışman bu tabloda nerede duruyor' },
      ],
    },
  ],

  methods: [
    {
      group: 'Desen ve örneklem',
      moves: [
        { id: 'desen', label: 'Araştırma deseni', hint: 'Nitel / nicel / karma, kesitsel / boylamsal' },
        { id: 'evren', label: 'Evren ve örneklem', hint: 'Kimler üzerinde çalışıldı' },
        { id: 'ornekleme', label: 'Örnekleme yöntemi', hint: 'Seçkisiz, amaçlı, kartopu vb.' },
        { id: 'katilimci', label: 'Katılımcı özellikleri', hint: 'Yaş, cinsiyet, eğitim dağılımı' },
      ],
    },
    {
      group: 'Veri toplama',
      moves: [
        { id: 'arac', label: 'Veri toplama aracı', hint: 'Ölçek, görüşme formu, gözlem' },
        { id: 'gecerlik', label: 'Geçerlik ve güvenirlik', hint: 'Cronbach alfa, uzman görüşü' },
        { id: 'islem', label: 'İşlem / uygulama süreci', hint: 'Veri nasıl ve ne zaman toplandı' },
        { id: 'etik', label: 'Etik onay', hint: 'Kurul adı, karar tarihi ve sayısı' },
      ],
    },
    {
      group: 'Analiz',
      moves: [
        { id: 'analiz', label: 'Analiz tekniği', hint: 'Hangi test, hangi yazılım' },
        { id: 'varsayim', label: 'Varsayım kontrolü', hint: 'Normallik, varyans homojenliği' },
      ],
    },
  ],

  results: [
    {
      group: 'Sunum',
      moves: [
        { id: 'betimsel', label: 'Betimsel istatistik', hint: 'Ortalama, standart sapma, frekans' },
        { id: 'yonlendirme', label: 'Tabloya/şekle yönlendirme', hint: '"Tablo 1\'de görüldüğü üzere..."' },
        { id: 'ana-bulgu', label: 'Ana bulgunun sunumu', hint: 'Araştırma sorusuna doğrudan cevap' },
        { id: 'anlamlilik', label: 'Anlamlılık belirtimi', hint: 'p değeri, etki büyüklüğü' },
      ],
    },
    {
      group: 'Karşılaştırma',
      moves: [
        { id: 'karsilastirma', label: 'Gruplar arası karşılaştırma', hint: 'Fark var mı, hangi yönde' },
        { id: 'iliski', label: 'İlişki / korelasyon', hint: 'Değişkenler arası bağıntı' },
        { id: 'ikincil', label: 'İkincil / beklenmedik bulgu', hint: 'Planlanmamış ama kayda değer' },
        { id: 'bulgu-ozet', label: 'Bulgu özeti', hint: 'Alt bölümü kapatan toparlama' },
      ],
    },
  ],

  discussion: [
    {
      group: 'Yorumlama',
      moves: [
        { id: 'hatirlatma', label: 'Ana bulgunun hatırlatılması', hint: 'Tartışmayı açan özet' },
        { id: 'uyum', label: 'Literatürle uyumlu sonuç', hint: '"Bu bulgu X ile örtüşmektedir."' },
        { id: 'ceslime', label: 'Literatürle çelişen sonuç', hint: '"Ancak Y\'nin bulgusundan ayrışmaktadır."' },
        { id: 'aciklama', label: 'Olası açıklama / yorum', hint: 'Bulgu neden böyle çıkmış olabilir' },
      ],
    },
    {
      group: 'Katkı',
      moves: [
        { id: 'kuramsal', label: 'Kuramsal katkı', hint: 'Alanyazına ne ekliyor' },
        { id: 'pratik', label: 'Uygulamaya dönük çıkarım', hint: 'Politika veya uygulama önerisi' },
      ],
    },
    {
      // Sınırlılık türleri sosyal bilimler yazım rehberlerinde yerleşik bir
      // listedir; her biri ayrı bir cümleyi hak eder.
      group: 'Sınırlılıklar',
      moves: [
        { id: 'sinir-orneklem', label: 'Örneklem büyüklüğü', hint: 'Küçük örneklem sonucun genellenebilirliğini sınırlar' },
        { id: 'sinir-onceki', label: 'Önceki araştırma eksikliği', hint: 'Dayanılacak kuramsal/görgül temelin zayıflığı' },
        { id: 'sinir-olcum', label: 'Ölçüm aracının kısıtı', hint: 'Veri toplama biçiminin analizi sınırladığı nokta' },
        { id: 'sinir-ozbildirim', label: 'Öz-bildirim verisi', hint: 'Seçici hatırlama, abartma, atıf yanlılığı' },
        { id: 'sinir-erisim', label: 'Erişim kısıtı', hint: 'Kişi, kurum veya belgeye erişimin sınırlı kalması' },
        { id: 'sinir-boylamsal', label: 'Boylamsal etki / katılımcı kaybı', hint: 'Zaman içinde örneklem erimesi' },
        { id: 'sinirlilik', label: 'Diğer sınırlılık', hint: 'Yukarıdakilere girmeyen zayıf yön' },
      ],
    },
    {
      group: 'Kapanış',
      moves: [
        { id: 'gelecek', label: 'Gelecek araştırma önerisi', hint: 'Bundan sonra ne çalışılmalı' },
        { id: 'sonuc', label: 'Tartışmayı kapatan cümle', hint: 'Bölümü toparlayan iddia' },
      ],
    },
  ],

  conclusion: [
    {
      group: 'Toparlama',
      moves: [
        { id: 'arguman-tekrar', label: 'Ana argümanın yeniden ifadesi', hint: 'Girişteki iddiayı bulgular ışığında yeniden söyle' },
        { id: 'bulgu-sentez', label: 'Bulguların sentezi', hint: 'Yeni veri sunmadan toplamı bağla' },
      ],
    },
    {
      group: 'Önem',
      moves: [
        { id: 'so-what', label: 'Neden önemli ("ne olmuş?")', hint: 'Okur bu çalışmadan ne çıkarmalı' },
        { id: 'son-katki', label: 'Alana katkının özeti', hint: 'Bilgi birikimine eklenen' },
        { id: 'son-pratik', label: 'Politika / uygulama çıkarımı', hint: 'Kim, ne yapmalı' },
      ],
    },
    {
      group: 'Kapanış',
      moves: [
        { id: 'son-gelecek', label: 'Gelecek araştırma yönü', hint: 'Açık kalan soru' },
        { id: 'kapanis', label: 'Kapanış vurgusu', hint: 'Makaleyi bitiren cümle' },
      ],
    },
  ],
};

/** Bir bölüme atanabilecek işlev kümeleri. */
export const MOVE_SET_OPTIONS: { id: string; label: string }[] = [
  { id: 'introduction', label: 'Giriş işlevleri' },
  { id: 'literature', label: 'Literatür taraması işlevleri' },
  { id: 'methods', label: 'Yöntem işlevleri' },
  { id: 'results', label: 'Bulgular işlevleri' },
  { id: 'discussion', label: 'Tartışma işlevleri' },
  { id: 'conclusion', label: 'Sonuç işlevleri' },
];

export function getMovesForSection(sectionId: string): MoveGroup[] {
  return MOVE_LIBRARY[sectionId] ?? [];
}

export function findMoveLabel(sectionId: string, moveId: string): string {
  for (const group of getMovesForSection(sectionId)) {
    const found = group.moves.find((m) => m.id === moveId);
    if (found) return found.label;
  }
  return moveId;
}
