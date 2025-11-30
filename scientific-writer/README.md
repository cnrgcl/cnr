# Bilimsel Araştırma Yazma Platformu

IMRAD formatında detaylı bilimsel makale yazma aracı.

## Özellikler

### ✅ Temel Yapı
- **IMRAD Formatı**: Introduction (Giriş), Methods (Yöntem), Results (Bulgular), Discussion (Tartışma)
- **Özet/Abstract**: Türkçe ve İngilizce özet desteği
- **Anahtar Kelimeler**: TR ve EN anahtar kelime yönetimi
- **Kaynakça**: Sınırsız kaynak ekleme

### ✅ Paragraf Yönetimi
- Her bölüm için sınırsız paragraf ekleme
- Paragraf başlığı + içerik + notlar
- Paragrafları yukarı/aşağı taşıma
- Paragraf silme
- Her paragraf için:
  - Kelime sayacı
  - Karakter sayacı
  - Özel notlar alanı

### ✅ Otomasyonlar
- **Otomatik Kaydetme**: Her 2 saniyede bir otomatik kaydeder
- **Manuel Kaydetme**: İstediğiniz zaman kaydet butonu
- **Toplam Kelime Sayısı**: Tüm makale için toplam kelime
- **Bölüm İstatistikleri**: Her bölüm için paragraf sayısı

### ✅ Dışa Aktarma
- **Word (.doc)**: Microsoft Word formatında dışa aktarma
- HTML formatında, Word'de açılabilir
- Tüm formatlamayı korur

### ✅ Kullanıcı Deneyimi
- Modern, temiz arayüz
- Responsive tasarım
- Kolay navigasyon
- Bölümler arası hızlı geçiş

## Kurulum

```bash
cd scientific-writer
npm install
npm run dev
```

Tarayıcınızda `http://localhost:3001` adresini açın.

## Kullanım

### 1. Başlık ve Özet
- Makale başlığını en üstten düzenleyin
- Türkçe ve İngilizce özet yazın
- Anahtar kelimeleri virgülle ayırarak ekleyin

### 2. IMRAD Bölümleri
- Üstteki sekmelere tıklayarak bölümler arası geçiş yapın
- Her bölüm için "Yeni Paragraf Ekle" butonuna tıklayın
- Paragraf başlığı ve içeriğini doldurun

### 3. Paragraf Yönetimi
- ⬆️⬇️ butonları ile paragrafları sıralayın
- 🗑️ butonu ile paragraf silin
- 📝 butonu ile paragraf notları ekleyin

### 4. Kaynakça
- En altta kaynakça bölümünden kaynak ekleyin
- Kaynakları düzenleyin veya silin

### 5. Kaydetme ve Dışa Aktarma
- 💾 Kaydet: Manuel kaydetme (otomatik kaydetme de aktif)
- 📄 Word'e Aktar: .doc formatında indirir

## Veri Saklama

Tüm veriler tarayıcınızın `localStorage`'ında saklanır. Bu sayede:
- İnternet bağlantısı gerektirmez
- Verileriniz tamamen sizde kalır
- Tarayıcıyı kapatıp açsanız bile veriler korunur

**DİKKAT**: Tarayıcı verilerini temizlerseniz makaleniz silinir. Düzenli olarak Word'e aktararak yedek alın!

## Teknik Detaylar

- **Framework**: Next.js 15
- **UI**: React 18 + Tailwind CSS
- **Language**: TypeScript
- **Storage**: LocalStorage

## Geliştirme

```bash
# Geliştirme modu
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## Özelleştirme

Bölüm isimlerini veya sayısını değiştirmek için `app/page.tsx` dosyasındaki `SECTION_NAMES` ve `sections` array'ini düzenleyin.

## Lisans

Kişisel kullanım için geliştirilmiştir.
