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
      group: 'Katkı ve kapanış',
      moves: [
        { id: 'kuramsal', label: 'Kuramsal katkı', hint: 'Alanyazına ne ekliyor' },
        { id: 'pratik', label: 'Uygulamaya dönük çıkarım', hint: 'Politika veya uygulama önerisi' },
        { id: 'sinirlilik', label: 'Sınırlılık', hint: 'Çalışmanın kabul edilen zayıf yönü' },
        { id: 'gelecek', label: 'Gelecek araştırma önerisi', hint: 'Bundan sonra ne çalışılmalı' },
        { id: 'sonuc', label: 'Sonuç cümlesi', hint: 'Makaleyi kapatan iddia' },
      ],
    },
  ],
};

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
