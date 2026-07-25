# Bilimsel Araştırma Yazma Platformu

IMRAD formatında, **cümle cümle** planlanan ve yazılan bilimsel makale aracı.

## Temel fikir

Çoğu yazma aracı seni boş bir sayfayla baş başa bırakır. Bu araç tersini yapar:
makaleyi en küçük birimine kadar **önce planlarsın**, sonra her cümleyi kendi
yuvasında yazarsın.

```
Bölüm (düzenlenebilir)
└── Alt başlık (1.1, 1.2 ...)     → hedef paragraf sayısı
    └── Paragraf                   → tema + hedef cümle sayısı
        └── Cümle                  → retorik işlev + plan notu + metin + kaynak
```

## Kaynakça bağlantılı

Atıfları **cümle metnine elle yazmazsın**. Her cümleye kaynakçadan kaynak
bağlarsın, metin içi atıf otomatik oluşur:

```
yazdığın:   Bu alanda üç ana yaklaşım öne çıkmıştır.
bağladığın: Yılmaz, 2003
çıkan:      Bu alanda üç ana yaklaşım öne çıkmıştır (Yılmaz, 2003).
```

Atıf, APA'daki gibi cümle sonu noktalamasından önce yerleşir. Bir cümleye
birden fazla kaynak bağlanabilir: `(Yılmaz, 2003; Kaya, 2011)`.

Her kaynağın üç alanı vardır — **metin içi ad** ("Yılmaz", "Yılmaz vd."),
**yıl**, ve **tam kaynakça satırı**. Tam satırı yazıp alandan çıkınca ilk iki
alan boşsa otomatik tahmin edilir.

Kaynakça bölümü ayrıca şunları gösterir:
- her kaynağın kaç cümlede kullanıldığı ve **tam olarak nerede** (`1.1 · P2 · C3`)
- hiç kullanılmayan kaynaklar
- bilgisi eksik kaynaklar (atıfları `(?, t.y.)` olarak çıkacak olanlar)
- alfabetik sıralama düğmesi

Bir kaynağı silersen bağlı olduğu tüm cümlelerden bağlantısı da temizlenir —
kopuk atıf kalmaz.

## Bölümler düzenlenebilir

Yeni makale, sosyal bilimlerde yerleşik olan altı bölümle açılır:

**Giriş · Literatür Taraması · Yöntem · Bulgular · Tartışma · Sonuç**

Katı IMRAD'dan farkı: sosyal bilimlerde literatür taraması genelde ayrı bir
numaralı bölümdür ve sonuç, tartışmadan ayrılır.

**⚙️ Bölümleri düzenle** ile bölümleri yeniden adlandırabilir, sıralayabilir,
ekleyip silebilirsiniz. Her bölüme, cümlelere önerilecek **retorik işlev
kümesi** atanır — böylece eklediğiniz özel bir bölüm de (örn. "Sınırlılıklar")
uygun işlev listesini kullanır.

## Retorik işlev kütüphanesi

Her cümleye "bu cümle ne iş yapıyor" etiketi atanır. Giriş bölümü için etiketler
Swales'in **CARS** (Create A Research Space) modelini izler:

| Hamle | Örnek işlevler |
|---|---|
| 1. Alan kurma | konunun genel önemi, kavram tanımı, geçmiş çalışmaların özeti |
| 2. Boşluk açma | karşıt bulgu, eksik kalan yön, yöntemsel kısıt |
| 3. Boşluğu doldurma | çalışmanın amacı, hipotez, katkı beyanı, makalenin planı |

Literatür Taraması, Yöntem, Bulgular, Tartışma ve Sonuç bölümlerinin de kendi
işlev listeleri vardır (`lib/moves.ts`).

Tartışma bölümündeki **Sınırlılıklar** grubu, sosyal bilimler yazım
rehberlerinde yerleşik olan altı sınırlılık türünü ayrı ayrı listeler —
örneklem büyüklüğü, önceki araştırma eksikliği, ölçüm aracının kısıtı,
öz-bildirim verisi, erişim kısıtı, boylamsal katılımcı kaybı. Böylece
"sınırlılıklar" tek bir muğlak paragraf olmaktan çıkıp kontrol listesine
dönüşür.

## Özellikler

- **Cümle yuvaları** — hedef cümle sayısını gir, "⚡ hedefe kadar doldur" ile boş
  yuvaları aç, tek tek yaz
- **Kesin sayım** — cümleler ayrı nesneler olduğu için sayım tahmine dayanmaz
  ("vb.", "Dr.", "s. 45" gibi kısaltmalar sayımı bozmaz)
- **Cümle başına kaynak** — kaynakçaya bağlı, metin içi atıf otomatik üretilir
- **Paragraf önizleme** — cümleleri birleştirip paragrafı bütün olarak gör
- **Plan görünümü** — tüm makalenin cümle düzeyinde anahattı ve ilerleme durumu
- **JSON yedekleme / geri yükleme** — veri kaybına karşı
- **Word'e aktarma** — cümleler paragraflara birleştirilerek dışa aktarılır
- Otomatik kayıt (2 sn), TR/EN özet, anahtar kelimeler, kaynakça

## Kurulum

```bash
cd scientific-writer
npm install
npm run dev
```

`http://localhost:3001`

## Kullanım akışı

1. **Alt başlık ekle** → "1.1 Literatür Taraması", hedef 3 paragraf
2. **Paragraf ekle** → tema: "1990 sonrası yaklaşımların özeti", hedef 5 cümle
3. **⚡ hedefe kadar doldur** → 5 boş cümle yuvası açılır
4. Her yuva için **işlev seç** (örn. "Kavram tanımı") ve **plan notu** yaz
5. Planı bitirince cümleleri tek tek doldur
6. Her cümleye **🔗 kaynak bağla** — atıfı elle yazma
7. **📄 Word** ile son metni al, cilalamayı Word'de yap

## ⚠️ Veri saklama

Çalışman yalnızca tarayıcının `localStorage`'ında durur. Tarayıcı verilerini
temizlersen **silinir**. Düzenli olarak **💾 Yedekle** ile JSON dosyası indir —
**📂 Geri yükle** ile aynı dosyadan tam olarak geri dönebilirsin.

## Teknik

Next.js 15 · React 18 · TypeScript · Tailwind CSS · localStorage

Bölüm adlarını veya işlev listelerini değiştirmek için `lib/moves.ts` ve
`app/page.tsx` içindeki `newPaper()` fonksiyonunu düzenle.
