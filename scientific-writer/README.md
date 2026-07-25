# Bilimsel Araştırma Yazma Platformu

IMRAD formatında, **cümle cümle** planlanan ve yazılan bilimsel makale aracı.

## Temel fikir

Çoğu yazma aracı seni boş bir sayfayla baş başa bırakır. Bu araç tersini yapar:
makaleyi en küçük birimine kadar **önce planlarsın**, sonra her cümleyi kendi
yuvasında yazarsın.

```
Bölüm (Giriş / Yöntem / Bulgular / Tartışma)
└── Alt başlık (1.1, 1.2 ...)     → hedef paragraf sayısı
    └── Paragraf                   → tema + hedef cümle sayısı
        └── Cümle                  → retorik işlev + plan notu + metin + kaynak
```

## Retorik işlev kütüphanesi

Her cümleye "bu cümle ne iş yapıyor" etiketi atanır. Giriş bölümü için etiketler
Swales'in **CARS** (Create A Research Space) modelini izler:

| Hamle | Örnek işlevler |
|---|---|
| 1. Alan kurma | konunun genel önemi, kavram tanımı, geçmiş çalışmaların özeti |
| 2. Boşluk açma | karşıt bulgu, eksik kalan yön, yöntemsel kısıt |
| 3. Boşluğu doldurma | çalışmanın amacı, hipotez, katkı beyanı, makalenin planı |

Yöntem, Bulgular ve Tartışma bölümlerinin de kendi işlev listeleri vardır
(`lib/moves.ts`).

## Özellikler

- **Cümle yuvaları** — hedef cümle sayısını gir, "⚡ hedefe kadar doldur" ile boş
  yuvaları aç, tek tek yaz
- **Kesin sayım** — cümleler ayrı nesneler olduğu için sayım tahmine dayanmaz
  ("vb.", "Dr.", "s. 45" gibi kısaltmalar sayımı bozmaz)
- **Cümle başına kaynak** — hangi iddianın hangi kaynağa dayandığı kaybolmaz
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
6. **📄 Word** ile son metni al, cilalamayı Word'de yap

## ⚠️ Veri saklama

Çalışman yalnızca tarayıcının `localStorage`'ında durur. Tarayıcı verilerini
temizlersen **silinir**. Düzenli olarak **💾 Yedekle** ile JSON dosyası indir —
**📂 Geri yükle** ile aynı dosyadan tam olarak geri dönebilirsin.

## Teknik

Next.js 15 · React 18 · TypeScript · Tailwind CSS · localStorage

Bölüm adlarını veya işlev listelerini değiştirmek için `lib/moves.ts` ve
`app/page.tsx` içindeki `newPaper()` fonksiyonunu düzenle.
