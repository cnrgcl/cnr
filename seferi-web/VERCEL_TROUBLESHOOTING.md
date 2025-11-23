# 🚨 Vercel 404 Hatası - Adım Adım Çözüm

## 📋 Kontrol Listesi

404 hatası alıyorsanız, bu adımları **sırayla** takip edin:

---

## ✅ ADIM 1: Vercel Dashboard'da Proje Ayarlarını Kontrol Et

### 1.1 Vercel'e Git
1. https://vercel.com adresine git
2. Giriş yap
3. SEFERİ projenizi bulup tıkla

### 1.2 Settings → General
**Root Directory** ayarını kontrol et:

```
Root Directory: seferi-web
```

⚠️ **ÖNEMLİ:** Eğer boşsa veya farklıysa:
1. **Edit** butonuna tıkla
2. **Browse** butonuna tıkla
3. `seferi-web` klasörünü seç
4. **Save** tıkla

### 1.3 Settings → Git
**Production Branch** ayarını kontrol et:

```
Production Branch: claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir
```

⚠️ **ÖNEMLİ:** Eğer farklıysa:
1. **Edit** butonuna tıkla
2. Yukarıdaki branch ismini kopyala-yapıştır
3. **Save** tıkla

---

## ✅ ADIM 2: Build & Development Settings'i Kontrol Et

Settings → General → Build & Development Settings:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

Hepsi doğruysa **geç**.
Yanlışsa **Edit** → düzelt → **Save**

---

## ✅ ADIM 3: Yeni Deployment Başlat

İki seçenek var:

### Seçenek A: Otomatik Redeploy (Önerilen)
1. **Deployments** sekmesine git
2. En son deployment'ı bul (SUCCESS veya FAILED olabilir)
3. Sağ taraftaki **...** (üç nokta) menüsüne tıkla
4. **Redeploy** seç
5. **Use existing Build Cache** kutusunun **işaretini kaldır** ✅ BU ÖNEMLİ!
6. **Redeploy** butonuna tıkla

### Seçenek B: Yeni Commit ile Deploy
Terminal'den:
```bash
cd seferi-web
git pull origin claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir
```

Vercel otomatik yeni deployment başlatacak.

---

## ✅ ADIM 4: Build Log'ları İzle

1. **Deployments** sekmesinde
2. En son deployment'a tıkla
3. **Building** aşamasını izle
4. Hata varsa kırmızı mesajları oku

### Başarılı Build Görüntüsü:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)
○ /
○ /login
```

---

## ✅ ADIM 5: Deployment URL'ini Test Et

Build başarılı olduktan sonra:

1. **Visit** butonuna tıkla veya URL'i aç
2. Login sayfası açılmalı
3. Şu bilgilerle giriş yap:
   - Email: `demo@seferi.app`
   - Şifre: `demo123`

---

## 🐛 Hala 404 Alıyorsanız

### Durum 1: Build FAILED
**Log'da hata mesajı varsa:**
- Hatayı tam olarak kopyala
- Bana gönder
- Birlikte çözeriz

### Durum 2: Build SUCCESS ama 404
**Muhtemel sebepler:**

#### A) Root Directory yanlış
```bash
# Vercel Settings → General → Root Directory
# Şu değer OLMALI: seferi-web
```

Düzelt:
1. Settings → General
2. Root Directory → Edit
3. Browse → `seferi-web` seç
4. Save
5. Deployments → Redeploy (cache'siz)

#### B) Branch yanlış
```bash
# Vercel Settings → Git → Production Branch
# Şu değer OLMALI: claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir
```

Düzelt:
1. Settings → Git
2. Production Branch → Edit
3. Branch ismini kopyala-yapıştır
4. Save
5. Deployments → Redeploy

#### C) Output Directory yanlış
```bash
# Vercel Settings → General → Output Directory
# Şu değer OLMALI: .next
```

Düzelt:
1. Settings → General → Build & Development Settings
2. Output Directory: `.next`
3. Save
4. Deployments → Redeploy (cache'siz)

---

## 🔄 TEMİZ BAŞTAN BAŞLA (Son Çare)

Eğer hiçbir şey işe yaramazsa:

### 1. Projeyi Sil
1. Vercel'de projenin Settings sayfasına git
2. En alta scroll et
3. **Delete Project** kısmında **Delete** butonuna tıkla
4. Projeyi sil

### 2. Yeni Proje Oluştur
1. Vercel Dashboard → **Add New...** → **Project**
2. **cnr** repo'sunu seç
3. **Import** tıkla
4. Şu ayarları YAP:

```
Project Name: seferi-web
Framework Preset: Next.js
Root Directory: seferi-web (Browse ile seç!)
Branch: claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir

Build Settings:
  Build Command: npm run build
  Output Directory: .next
  Install Command: npm install
```

5. Environment Variables: BOŞ BIRAK (Demo mode için gerekli değil)
6. **Deploy** tıkla
7. Build'i izle
8. Başarılı olunca **Visit** tıkla
9. Demo hesapla giriş yap

---

## 📸 Ekran Görüntüleri İste

Hala çalışmazsa, şu ekran görüntülerini at:

1. **Vercel Settings → General** (Root Directory gözüksün)
2. **Vercel Settings → Git** (Production Branch gözüksün)
3. **Vercel Deployments** (En son deployment'ın durumu)
4. **Build Log** (ERROR mesajları varsa)

---

## ✅ Başarılı Deployment Kontrol

Deployment başarılıysa:

```
Status: Ready
URL: https://seferi-web-xxx.vercel.app
```

URL'i aç → Login sayfası → `demo@seferi.app` / `demo123` → Dashboard ✅

---

**Son Güncelleme:** 2025-11-22
**Versiyon:** 2.0
