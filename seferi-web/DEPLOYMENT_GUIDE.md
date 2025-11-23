# 🚀 SEFERİ Web - Vercel Deployment Rehberi

Bu rehber, SEFERİ web uygulamasını Vercel'e deploy etmek için adım adım talimatlar içerir.

## ✅ Deployment Checklist

### Adım 1: Vercel'e Git
1. https://vercel.com adresine git
2. **Sign Up** veya **Login** yap (GitHub hesabınla gir)
3. GitHub hesabını bağla

### Adım 2: Yeni Proje Oluştur
1. Vercel Dashboard'da **"Add New..."** butonuna tıkla
2. **"Project"** seç
3. **cnr** repository'sini listeden bul ve seç

### Adım 3: ⚠️ ÖNEMLİ - Deployment Ayarları

**Bu ayarları yapmadan Deploy'a tıklama!**

#### Framework Preset
```
Next.js
```

#### Root Directory (ÇOK ÖNEMLİ!)
```
seferi-web
```
**Nasıl yapılır:** "Root Directory" yanındaki **Edit** veya **Browse** butonuna tıkla → `seferi-web` klasörünü seç

#### Git Branch
```
claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir
```
**Nasıl yapılır:** "Git Branch" dropdown'dan yukarıdaki branch'i seç

#### Build & Development Settings
Bunlar otomatik algılanmalı, ama kontrol et:
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### Adım 4: Environment Variables (Opsiyonel)

Demo mode aktif olduğu için Firebase olmadan çalışır. Ama isterseniz Firebase ekleyebilirsiniz:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Demo mode için gerekli değil!** Şimdilik boş bırakabilirsin.

### Adım 5: Deploy!
1. **Deploy** butonuna tıkla
2. Deployment tamamlanana kadar bekle (2-3 dakika)
3. Başarılı olursa yeşil ✅ işareti göreceksin

### Adım 6: Test Et
1. Vercel'in verdiği URL'i aç (örn: `seferi-web-xxx.vercel.app`)
2. Login sayfası açılacak
3. Demo hesabıyla giriş yap:
   - **Email:** `demo@seferi.app`
   - **Şifre:** `demo123`
4. Dashboard'u gör ve test et!

## 🐛 Sorun Giderme

### "Root Directory is not set" hatası
→ Root Directory'yi `seferi-web` olarak ayarla

### "Build failed" hatası
→ Branch'in doğru olduğundan emin ol: `claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir`

### "Module not found" hatası
→ Install Command'in `npm install` olduğundan emin ol

### Deployment başarılı ama sayfa açılmıyor
→ Vercel URL'ine git ve tarayıcı console'u aç (F12) → hatayı kontrol et

### Demo mode çalışmıyor
→ Tarayıcı console'da localStorage hatası olabilir. Incognito/Private mode'da dene.

## 📋 Deployment Özeti

| Ayar | Değer |
|------|-------|
| Framework | Next.js |
| Root Directory | `seferi-web` |
| Branch | `claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |

## 🎯 Deploy Sonrası

Deployment başarılı olduktan sonra:

1. ✅ URL'i al ve kaydet
2. ✅ Demo hesabıyla test et
3. ✅ Öğrencilerle paylaş
4. ✅ Feedback topla

## 🔄 Güncelleme Yapmak İçin

Kod değişikliği yaptıktan sonra:
1. Git push yap
2. Vercel otomatik olarak yeni deployment yapacak
3. 2-3 dakika içinde değişiklikler canlıya geçecek

## 📞 Yardım

Sorun yaşarsan:
1. Vercel deployment loglarını kontrol et
2. Bu rehberi tekrar oku
3. GitHub repo'nun doğru branch'de olduğundan emin ol

---

**Son Güncelleme:** 2025-11-22
**Versiyon:** 1.0
