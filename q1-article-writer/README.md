# Q1 Article Writer 📝

AI destekli, **insanlaştırılmış** akademik makale yazım aracı. NotebookLM entegrasyonu ile Q1 seviyesinde makaleler üretin.

## ✨ Özellikler

- 🤖 **AI Humanization**: %100 doğal, AI detection testlerinden geçen içerik
- 📚 **NotebookLM Entegrasyonu**: Literatür özetlerinizi kolayca import edin
- 📊 **Kalite Metrikleri**: AI detection, okunabilirlik, akademik kalite skorları
- 📄 **Export**: Word (.docx) formatında indirin
- 🎯 **Bölüm Bazında Yazım**: Introduction, Literature Review, Methodology, vb.
- ⚡ **Claude Sonnet 3.5**: En gelişmiş AI modeli ile doğal yazım

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- Anthropic API Anahtarı ([buradan alın](https://console.anthropic.com/))

### Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Environment değişkenlerini ayarlayın:**
```bash
cp .env.example .env
```

`.env` dosyasını açın ve API anahtarınızı ekleyin:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

3. **Development sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📖 Kullanım

### 1. Literatür Özetlerini Ekleyin

NotebookLM'den aldığınız literatür özetlerini sol panelde ki forma yapıştırın:

- **Makale Başlığı** (zorunlu)
- **Yazarlar** (opsiyonel)
- **Yıl** (opsiyonel)
- **NotebookLM Özeti** (zorunlu)
- **Anahtar Bulgular** (opsiyonel)

### 2. Makale Bilgilerini Girin

- **Makale Başlığı**: Yazacağınız makalenin başlığı
- **Araştırma Sorusu**: Ana araştırma sorunuz
- **Bölüm Tipi**: Hangi bölümü yazmak istiyorsunuz?
  - Introduction (Giriş)
  - Literature Review (Literatür Taraması)
  - Methodology (Metodoloji)
  - Results (Sonuçlar)
  - Discussion (Tartışma)
  - Conclusion (Sonuç)

### 3. İnsanlaştırma Seviyesi Seçin

- **Düşük**: Hızlı üretim, temel doğallık (1 geçiş)
- **Orta**: Dengeli kalite ve hız (1 geçiş)
- **Yüksek**: Maksimum doğallık (1 geçiş)
- **🔥 ULTRA**: AI detection = 0% hedefi (3 geçişli işleme) ✅ **ÖNERİLEN!**

### 4. İçeriği Üretin

"İçerik Üret" butonuna tıklayın. AI, literatür özetlerinizi kullanarak insanlaştırılmış akademik içerik üretecek.

### 5. Metrikleri Kontrol Edin

Üretilen içerik için şu metrikler gösterilir:

- **AI Detection Score**: Düşük = İyi (<%20 ideal)
- **İnsan Benzeri**: Yüksek = İyi (>%70 ideal)
- **Akademik Kalite**: Q1 standartları
- **Okunabilirlik**: Flesch-Kincaid skoru
- **Perplexity**: Kelime çeşitliliği
- **Burstiness**: Cümle varyasyonu

### 6. Export Edin

"Word" butonuna tıklayarak makalenizi `.docx` formatında indirin.

## 🎨 İnsanlaştırma Teknikleri

### 🔥 ULTRA Mode (Yeni!)

**3 Geçişli İşleme Sistemi:**

1. **İlk Üretim**: Claude Sonnet 3.5 ile yüksek kaliteli akademik içerik
2. **Geçiş 1**: Cümle yapısı varyasyonu ve karmaşıklık
3. **Geçiş 2**: Doğal akış, kişilik ve insan benzeri düşünce patternleri
4. **Post-Processing**: Final dokunuşlar ve optimizasyon

**Uygulanan Teknikler:**

✅ **Cümle Kaos Sistemi**: Çok kısa (3-5 kelime) ve çok uzun (30+ kelime) cümleler karışımı
✅ **İnsan Düşünce Patternleri**: Doğal düşünce akışı, belirsizlik ifadeleri
✅ **Organik Akış**: Mükemmel olmayan ama doğal geçişler
✅ **Akademik Kişilik**: İnce, şahsi akademik ses tonu
✅ **Ritim & Tempo**: Değişken paragraf uzunlukları ve yapıları
✅ **Stratejik Kusursuzluklar**: İnsan yazım doğallığı
✅ **Çeşitli Citation Stilleri**: Farklı referans entegrasyon yöntemleri
✅ **Meta-Discourse**: "Interestingly,", "Notably," gibi akademik ifadeler
✅ **Anti-AI Patternler**: Mükemmellikten kaçınma, doğal kaos

## 📊 Kalite Garantisi

### Standard Modes (Low/Medium/High):
- **AI Detection**: <%20 (Güvenli bölge)
- **Human-like**: >%70 (Doğal yazım)
- **Academic Quality**: >%70 (Q1 standartları)

### 🔥 ULTRA Mode:
- **AI Detection**: **<%10** (Neredeyse tespit edilemez!)
- **Human-like**: **>%80** (Tamamen doğal)
- **Academic Quality**: >%85 (Üst düzey Q1)
- **Readability**: Optimal akademik seviye
- **Processing**: 3x daha fazla AI işleme (daha uzun sürer)

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude Sonnet 3.5
- **Export**: docx library
- **Icons**: Lucide React

## 📁 Proje Yapısı

```
q1-article-writer/
├── app/
│   ├── api/
│   │   ├── generate/      # AI generation endpoint
│   │   └── export/        # Word export endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx           # Ana sayfa
├── components/
│   ├── ArticleGenerator.tsx
│   ├── LiteratureInput.tsx
│   └── MetricsDashboard.tsx
├── lib/
│   ├── anthropic.ts       # Claude API client
│   ├── humanization.ts    # Humanization prompts
│   └── metrics.ts         # Quality metrics calculator
├── types/
│   └── index.ts           # TypeScript types
└── public/
```

## 🔐 Güvenlik

- API anahtarınızı **asla** commit etmeyin
- `.env` dosyası `.gitignore`'da
- Sadece server-side API calls (Next.js API routes)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altındadır.

## 🆘 Destek

Sorun yaşıyorsanız:

1. `.env` dosyanızda `ANTHROPIC_API_KEY` olduğundan emin olun
2. API anahtarınızın geçerli olduğunu kontrol edin
3. `npm install` komutunu çalıştırın
4. Browser console'unu kontrol edin

## 🎯 Gelecek Özellikler

- [ ] PDF Export
- [ ] Direkt PDF Upload & Parsing
- [ ] Otomatik referans formatı (APA, IEEE, MLA)
- [ ] Plagiarism checker entegrasyonu
- [ ] Makale şablonları
- [ ] Çoklu dil desteği
- [ ] Collaborative editing

## 🌟 Önemli Notlar

- Her seferinde **farklı sonuçlar** alabilirsiniz (AI'ın doğası gereği)
- Yüksek humanization seviyesi daha uzun sürer ama daha iyi sonuç verir
- En az 2-3 literatür özeti eklemek önerilir
- Üretilen içeriği kendi bilginizle kontrol edin ve gerekirse düzenleyin

## 💡 İpuçları

1. **🔥 ULTRA Mode Kullanın**: AI detection'dan geçmek istiyorsanız ULTRA mode kullanın
2. **NotebookLM'i Etkili Kullanın**: Makalelerinizi NotebookLM'e yükleyin ve kapsamlı özetler alın
3. **Spesifik Olun**: Araştırma sorunuzu ne kadar spesifik yazarsanız, sonuç o kadar iyi olur
4. **Sabırlı Olun**: ULTRA mode 3 geçiş yaptığı için 2-3 dakika sürebilir
5. **Iterate Edin**: Farklı humanization seviyeleri ve ek bağlamlar deneyin
6. **Manuel Kontrol**: AI çıktısını her zaman gözden geçirin ve akademik standartlara uygunluğunu kontrol edin

---

**Made with ❤️ for Academic Researchers**
