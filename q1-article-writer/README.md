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

- **Düşük**: Hızlı üretim, temel doğallık
- **Orta**: Dengeli kalite ve hız
- **Yüksek**: Maksimum doğallık, AI detection'dan geçer ✅

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

Uygulama şu teknikleri kullanarak AI detection'dan geçer:

✅ **Cümle Varyasyonu**: Kısa, orta ve uzun cümleler karışımı
✅ **Doğal Geçişler**: "Ancak", "Öte yandan", "İlginç bir şekilde"
✅ **Bağlamsal Örnekler**: Gerçek dünya bağlantıları
✅ **Akademik Kişilik**: İnce kişisel akademik ses tonu
✅ **Stratejik Kusursuzluklar**: Doğal akış varyasyonları
✅ **Çeşitli Paragraf Yapıları**: Monotonluktan kaçınma

## 📊 Kalite Garantisi

- **AI Detection**: <%20 (Güvenli bölge)
- **Human-like**: >%70 (Doğal yazım)
- **Academic Quality**: >%70 (Q1 standartları)
- **Readability**: Optimal akademik seviye

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

1. **NotebookLM'i Etkili Kullanın**: Makalelerinizi NotebookLM'e yükleyin ve kapsamlı özetler alın
2. **Spesifik Olun**: Araştırma sorunuzu ne kadar spesifik yazarsanız, sonuç o kadar iyi olur
3. **Iterate Edin**: Farklı humanization seviyeleri ve ek bağlamlar deneyin
4. **Manuel Kontrol**: AI çıktısını her zaman gözden geçirin ve akademik standartlara uygunluğunu kontrol edin

---

**Made with ❤️ for Academic Researchers**
