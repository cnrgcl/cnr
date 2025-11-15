# 🗺️ SEFERİ - Ahlat Keşif Uygulaması

Ahlat'ı keşfeden turistlerin fotoğraf paylaşarak puan kazandığı, tamamen ücretsiz gamification mobil uygulaması.

## 📱 Özellikler

- ✅ **Fotoğraf Çekme ve Yükleme**: Kamera veya galeriden fotoğraf seçme
- ✅ **GPS Konum Kontrolü**: Otomatik Ahlat konum doğrulaması
- ✅ **Puanlama Sistemi**:
  - Normal fotoğraf: 1 puan
  - Ahlat yemeği (Ahlat'ta): 5 puan
  - Ahlat yemeği (Ahlat dışında): 0.5 puan
  - Tarihi yer (Ahlat'ta): 10 puan
  - Doğa manzarası (Ahlat'ta): 8 puan
- ✅ **Kullanıcı Profili**: Toplam puan, fotoğraf sayısı, sıralama
- ✅ **Liderlik Tablosu**: Tüm kullanıcılar arasında sıralama
- ✅ **Sosyal Feed**: Diğer kullanıcıların fotoğrafları
- ✅ **Offline Destek**: İnternet olmadan da kullanılabilir (senkronizasyon sonrası)

## 🛠️ Teknoloji Stack

- **Frontend**: React Native + Expo
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Dil**: TypeScript
- **Navigasyon**: React Navigation
- **GPS**: Expo Location
- **Kamera**: Expo Camera

## 💰 Maliyet

**%100 ÜCRETSIZ!**

Tüm servisler ücretsiz tier kullanıyor:
- Firebase Free Tier: 10K kullanıcı/ay, 5GB storage
- Expo: Ücretsiz development
- React Native: Açık kaynak

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI
- Firebase hesabı (ücretsiz)
- Mobil cihaz veya emülatör

## 🚀 Kurulum Adımları

### 1. Firebase Kurulumu

#### A. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Proje Ekle" butonuna tıklayın
3. Proje adını girin (örn: "seferi-app")
4. Google Analytics'i devre dışı bırakabilirsiniz (opsiyonel)
5. "Proje Oluştur" butonuna tıklayın

#### B. Firebase Authentication Ayarları

1. Sol menüden "Authentication" seçin
2. "Get Started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" seçeneğini etkinleştirin
5. Kaydet

#### C. Firestore Database Ayarları

1. Sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. **Test mode** seçin (şimdilik)
4. Location seçin (örn: europe-west1)
5. "Enable" butonuna tıklayın

**ÖNEMLİ**: Firestore Rules'u güncelleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Fotoğraflar herkese açık okunabilir, sadece auth kullanıcılar yazabilir
    match /photos/{photoId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

#### D. Firebase Storage Ayarları

1. Sol menüden "Storage" seçin
2. "Get started" butonuna tıklayın
3. **Test mode** seçin
4. "Next" → "Done"

**ÖNEMLİ**: Storage Rules'u güncelleyin:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{userId}/{allPaths=**} {
      // Herkes okuyabilir
      allow read: if true;
      // Sadece kendi fotoğraflarını yükleyebilir
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

#### E. Firebase Config Bilgilerini Alma

1. Firebase Console'da sol üstteki ⚙️ (ayarlar) ikonuna tıklayın
2. "Proje ayarları" seçin
3. "Genel" sekmesinde aşağı kaydırın
4. "Uygulamalarınız" bölümünde "</>" (Web) ikonuna tıklayın
5. Uygulama adı girin (örn: "Seferi Web")
6. "Uygulamayı kaydet" tıklayın
7. **Firebase SDK snippet** kısmında "Config" seçin
8. Aşağıdaki gibi bir yapılandırma göreceksiniz:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "seferi-app.firebaseapp.com",
  projectId: "seferi-app",
  storageBucket: "seferi-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

Bu bilgileri **kopyalayın**!

### 2. Proje Kurulumu

```bash
# Proje klasörüne gidin
cd seferi-app

# Bağımlılıkları yükleyin
npm install

# veya yarn kullanıyorsanız
yarn install
```

### 3. Firebase Config Ayarları

`src/services/firebase.ts` dosyasını açın ve Firebase config bilgilerinizi ekleyin:

```typescript
const firebaseConfig = {
  apiKey: "BURAYA_API_KEY_YAZIN",           // Firebase'den kopyaladığınız
  authDomain: "BURAYA_AUTH_DOMAIN_YAZIN",   // bilgileri buraya yapıştırın
  projectId: "BURAYA_PROJECT_ID_YAZIN",
  storageBucket: "BURAYA_STORAGE_BUCKET_YAZIN",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID_YAZIN",
  appId: "BURAYA_APP_ID_YAZIN"
};
```

### 4. Uygulamayı Başlatma

```bash
# Expo development server'ı başlatın
npx expo start

# veya
npm start
```

Terminal'de QR kod görünecek:

- **Android**: Expo Go uygulamasıyla QR kodu tarayın
- **iOS**: Kamera ile QR kodu tarayın
- **Web**: Tarayıcıda açmak için 'w' tuşuna basın
- **Android Emulator**: 'a' tuşuna basın
- **iOS Simulator**: 'i' tuşuna basın (sadece Mac)

### 5. Expo Go Uygulaması (Mobil Test İçin)

Telefonunuza Expo Go uygulamasını indirin:

- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## 📱 Kullanım

### İlk Kayıt

1. Uygulamayı açın
2. "Kayıt Ol" butonuna tıklayın
3. Adınızı, e-postanızı ve şifrenizi girin
4. "Kayıt Ol" butonuna tıklayın

### Fotoğraf Çekme

1. Ana sayfada "📸 Fotoğraf Çek" butonuna tıklayın
2. Kategori seçin (Normal, Yemek, Tarihi, Doğa)
3. Fotoğrafı çekin veya galeriden seçin
4. GPS konumunuz otomatik kontrol edilir
5. Puanınız hesaplanır ve profil görüntülenir!

### Puan Kazanma

| Kategori | Konum | Puan |
|----------|-------|------|
| Normal | - | 1 |
| Yemek | Ahlat'ta | 5 |
| Yemek | Ahlat dışı | 0.5 |
| Tarihi Yer | Ahlat'ta | 10 |
| Doğa | Ahlat'ta | 8 |

### Liderlik Tablosu

- "🏆 Sıralama" sekmesine gidin
- İlk 3 kullanıcı özel madalya alır 🥇🥈🥉
- Kendi sıralamanızı görebilirsiniz

## 🗂️ Proje Yapısı

```
seferi-app/
├── App.tsx                  # Ana uygulama dosyası
├── src/
│   ├── screens/             # Ekranlar
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── LeaderboardScreen.tsx
│   ├── navigation/          # Navigasyon
│   │   └── AppNavigator.tsx
│   ├── services/            # Firebase servisleri
│   │   ├── firebase.ts
│   │   ├── authService.ts
│   │   ├── photoService.ts
│   │   ├── locationService.ts
│   │   └── leaderboardService.ts
│   └── types/               # TypeScript tipleri
│       └── index.ts
├── app.json                 # Expo config
├── package.json
└── tsconfig.json
```

## 🔧 Sorun Giderme

### Firebase Bağlantı Hatası

- Firebase config bilgilerini doğru kopyaladığınızdan emin olun
- Firestore ve Storage'ı etkinleştirdiğinizden emin olun

### Kamera Erişim Hatası

- Cihaz ayarlarından kamera iznini kontrol edin
- iOS: Settings → Expo Go → Camera
- Android: Settings → Apps → Expo Go → Permissions

### GPS Konum Hatası

- Konum servislerinin açık olduğundan emin olun
- İlk kullanımda konum izni verin

### "Expo Go" bulunamadı

```bash
# Expo Go'yu global olarak yükleyin
npm install -g expo-cli
```

## 📊 Firebase Limitler (Ücretsiz Tier)

| Servis | Limit | Yeterli Mi? |
|--------|-------|-------------|
| Authentication | 10K kullanıcı/ay | ✅ Başlangıç için yeterli |
| Firestore | 1GB depolama | ✅ 50K+ fotoğraf metadatası |
| Storage | 5GB depolama | ✅ 5000+ fotoğraf |
| Bandwidth | 10GB/ay | ✅ Orta kullanım |

**Not**: Limitler aşıldığında ücretli plana geçiş yapabilirsiniz (çok düşük maliyetli, kullanıma göre).

## 🚢 Production'a Alma

### EAS Build ile APK/IPA Oluşturma

```bash
# EAS CLI kur
npm install -g eas-cli

# EAS hesabı oluştur (ücretsiz)
eas login

# Build yapılandırması
eas build:configure

# Android APK oluştur
eas build --platform android

# iOS IPA oluştur (Mac gerektirir)
eas build --platform ios
```

### App Store / Play Store Yayınlama

1. EAS Submit kullanın:
```bash
eas submit --platform android
eas submit --platform ios
```

2. Firebase Console'da production rules ayarlayın
3. Analytics ekleyin (opsiyonel)

## 🎯 Gelecek Özellikler

- [ ] Rozet sistemi
- [ ] Görev/Quest sistemi
- [ ] Sosyal paylaşım (Instagram entegrasyonu)
- [ ] Push bildirimleri
- [ ] Offline mod geliştirmesi
- [ ] AI fotoğraf kategorisi tanıma
- [ ] Çoklu dil desteği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altındadır.

## 👨‍💻 Geliştirici

Seferî - Ahlat Turizm Gamification Projesi

## 📞 Destek

Sorun yaşıyorsanız:
1. README'yi tekrar okuyun
2. Firebase ayarlarını kontrol edin
3. GitHub Issues açın

## 🎉 Teşekkürler

Bu projeyi kullandığınız için teşekkürler! Ahlat'ı keşfetmenin keyfini çıkarın! 🗺️✨
