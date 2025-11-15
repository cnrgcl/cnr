# 🔥 Firebase Kurulum Rehberi - Adım Adım

Bu rehber Firebase'i sıfırdan kurmanız için hazırlanmıştır.

## 📋 İçindekiler

1. [Firebase Projesi Oluşturma](#1-firebase-projesi-oluşturma)
2. [Authentication Kurulumu](#2-authentication-kurulumu)
3. [Firestore Database Kurulumu](#3-firestore-database-kurulumu)
4. [Storage Kurulumu](#4-storage-kurulumu)
5. [Config Bilgilerini Alma](#5-config-bilgilerini-alma)
6. [Uygulamaya Entegrasyon](#6-uygulamaya-entegrasyon)

---

## 1. Firebase Projesi Oluşturma

### Adım 1.1: Firebase Console'a Giriş
1. Tarayıcınızda [https://console.firebase.google.com/](https://console.firebase.google.com/) adresine gidin
2. Google hesabınızla giriş yapın (Gmail hesabınız)

### Adım 1.2: Yeni Proje Oluştur
1. **"Proje Ekle"** (Add Project) butonuna tıklayın
2. **Proje Adı**: `seferi-app` (veya istediğiniz bir isim) yazın
3. **Devam Et** butonuna tıklayın
4. **Google Analytics**: İsterseniz devre dışı bırakın (şimdilik gerekli değil)
5. **"Proje Oluştur"** butonuna tıklayın
6. 30-60 saniye bekleyin, proje oluşturulsun
7. **"Devam Et"** butonuna tıklayın

✅ **Tebrikler!** Firebase projeniz hazır.

---

## 2. Authentication Kurulumu

### Adım 2.1: Authentication Sayfasına Git
1. Sol taraftaki menüden **"Build"** → **"Authentication"** seçin
2. **"Get started"** (Başlayın) butonuna tıklayın

### Adım 2.2: Email/Password Aktifleştir
1. Üstteki **"Sign-in method"** (Oturum açma yöntemi) sekmesine tıklayın
2. Listeden **"Email/Password"** bulun ve tıklayın
3. **İlk toggle'ı (Email/Password) AÇIK** yapın
4. İkinci toggle'ı (Email link) kapalı bırakın
5. **"Kaydet"** (Save) butonuna tıklayın

✅ **Email/Password authentication aktif!**

---

## 3. Firestore Database Kurulumu

### Adım 3.1: Firestore Oluştur
1. Sol menüden **"Build"** → **"Firestore Database"** seçin
2. **"Create database"** (Veritabanı oluştur) butonuna tıklayın

### Adım 3.2: Güvenlik Kuralları
1. **"Start in test mode"** (Test modunda başlat) seçeneğini seçin
   - ⚠️ **Dikkat**: Bu geliştirme içindir, production'da değiştireceğiz
2. **"Next"** (İleri) butonuna tıklayın

### Adım 3.3: Lokasyon Seç
1. Lokasyon seçin: **europe-west1** (Belçika) önerilir
2. **"Enable"** (Etkinleştir) butonuna tıklayın
3. Birkaç saniye bekleyin

### Adım 3.4: Güvenlik Kurallarını Güncelle
1. Firestore açıldığında, üstteki **"Rules"** (Kurallar) sekmesine tıklayın
2. Aşağıdaki kodu **tüm içeriği silin ve yapıştırın**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar: Herkes okuyabilir, sadece kendini yazabilir
    match /users/{userId} {
      allow read: if true;
      allow create, update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }

    // Fotoğraflar: Herkes okuyabilir, giriş yapanlar yazabilir
    match /photos/{photoId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
                            && request.auth.uid == resource.data.userId;
    }
  }
}
```

3. **"Publish"** (Yayınla) butonuna tıklayın
4. Onay penceresinde **"Publish"** tıklayın

✅ **Firestore Database hazır!**

---

## 4. Storage Kurulumu

### Adım 4.1: Storage Oluştur
1. Sol menüden **"Build"** → **"Storage"** seçin
2. **"Get started"** butonuna tıklayın

### Adım 4.2: Güvenlik Kuralları
1. **"Start in test mode"** seçeneğini seçin
2. **"Next"** butonuna tıklayın
3. Lokasyon **europe-west1** (Firestore ile aynı olmalı)
4. **"Done"** butonuna tıklayın

### Adım 4.3: Storage Kurallarını Güncelle
1. Üstteki **"Rules"** sekmesine tıklayın
2. Aşağıdaki kodu yapıştırın:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{userId}/{allPaths=**} {
      // Herkes fotoğrafları görüntüleyebilir
      allow read: if true;

      // Sadece giriş yapmış kullanıcı kendi klasörüne yükleyebilir
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024; // Max 5MB
    }
  }
}
```

3. **"Publish"** butonuna tıklayın

✅ **Storage hazır!**

---

## 5. Config Bilgilerini Alma

### Adım 5.1: Web App Ekle
1. Sol üstteki **⚙️ (Ayarlar)** ikonuna tıklayın
2. **"Project settings"** (Proje ayarları) seçin
3. **"Genel"** (General) sekmesinde aşağı kaydırın
4. **"Your apps"** (Uygulamalarınız) bölümünde **</>** (Web) ikonuna tıklayın

### Adım 5.2: App Kaydet
1. **App nickname**: `Seferi Web` yazın
2. **Firebase Hosting'i etkinleştir**: İşaretlemeyin (şimdilik gerek yok)
3. **"Register app"** (Uygulamayı kaydet) butonuna tıklayın

### Adım 5.3: Config Bilgilerini Kopyala
1. **"Use npm"** sekmesini tıklayın
2. Aşağıdaki gibi bir kod göreceksiniz:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "seferi-app.firebaseapp.com",
  projectId: "seferi-app",
  storageBucket: "seferi-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

3. **Bu bilgileri kopyalayın!** (Sonra kullanacağız)
4. **"Continue to console"** butonuna tıklayın

✅ **Config bilgileri hazır!**

---

## 6. Uygulamaya Entegrasyon

### Adım 6.1: Firebase Config Dosyasını Güncelle

1. Kod editöründe `src/services/firebase.ts` dosyasını açın
2. Kopyaladığınız config bilgilerini buraya yapıştırın:

**ÖNCESİ:**
```typescript
const firebaseConfig = {
  apiKey: "BURAYA_API_KEY_YAZIN",
  authDomain: "BURAYA_AUTH_DOMAIN_YAZIN",
  projectId: "BURAYA_PROJECT_ID_YAZIN",
  storageBucket: "BURAYA_STORAGE_BUCKET_YAZIN",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID_YAZIN",
  appId: "BURAYA_APP_ID_YAZIN"
};
```

**SONRASI:** (Örnek - kendi bilgilerinizi kullanın!)
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyA...",                              // Kendi bilgileriniz
  authDomain: "seferi-app.firebaseapp.com",
  projectId: "seferi-app",
  storageBucket: "seferi-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

3. Dosyayı **kaydedin** (Ctrl+S / Cmd+S)

✅ **Firebase entegre edildi!**

---

## 7. Test Etme

### Adım 7.1: Uygulamayı Çalıştır

```bash
npm start
# veya
npx expo start
```

### Adım 7.2: İlk Kullanıcıyı Oluştur
1. Uygulamayı açın (Expo Go veya emulator)
2. **"Kayıt Ol"** butonuna tıklayın
3. Örnek bilgiler:
   - **Ad**: Test Kullanıcı
   - **E-posta**: test@seferi.com
   - **Şifre**: test1234
4. **"Kayıt Ol"** butonuna tıklayın

### Adım 7.3: Firebase Console'da Kontrol
1. Firebase Console → **Authentication** → **Users** sekmesi
2. Oluşturduğunuz kullanıcıyı görmelisiniz!

✅ **HER ŞEY ÇALIŞIYOR!** 🎉

---

## 🔒 Güvenlik Notları

### ⚠️ ÖNEMLİ: Production İçin

Test modunda başladık, ancak uygulamayı yayınlamadan önce:

1. **Firestore Rules**: Test modundan çıkın, yukarıdaki kuralları kullanın
2. **Storage Rules**: Dosya boyutu limiti ekleyin (5MB)
3. **Email Verification**: Email doğrulaması ekleyin
4. **Rate Limiting**: Firebase App Check kullanın
5. **Environment Variables**: Config bilgilerini .env dosyasına taşıyın

---

## 📊 Firebase Console Kullanımı

### Verileri Görüntüleme

**Kullanıcıları Görmek:**
- Authentication → Users

**Fotoğrafları Görmek:**
- Firestore Database → Data sekmesi → `photos` collection

**Upload Edilen Dosyaları Görmek:**
- Storage → Files sekmesi → `photos/` klasörü

**Kullanım İstatistikleri:**
- Her servisin "Usage" sekmesi

---

## ❓ Sorun Giderme

### Hata: "Firebase: Error (auth/..."
- ✅ Authentication'ı etkinleştirdiniz mi?
- ✅ Email/Password yöntemini açtınız mı?

### Hata: "Missing or insufficient permissions"
- ✅ Firestore rules'u güncellediniz mi?
- ✅ Rules'u publish ettiniz mi?

### Hata: "Storage object not found"
- ✅ Storage'ı etkinleştirdiniz mi?
- ✅ Storage rules'u güncellediniz mi?

### Config bulunamıyor
- ✅ `firebase.ts` dosyasındaki tüm değerleri doldurdunuz mu?
- ✅ Tırnak işaretleri doğru mu?

---

## 🎓 Ekstra Kaynaklar

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security)
- [Expo + Firebase Guide](https://docs.expo.dev/guides/using-firebase/)

---

## ✅ Kontrol Listesi

Kurulumu tamamladıysanız işaretleyin:

- [ ] Firebase projesi oluşturuldu
- [ ] Authentication etkinleştirildi
- [ ] Email/Password yöntemi açık
- [ ] Firestore Database oluşturuldu
- [ ] Firestore Rules güncellendi
- [ ] Storage oluşturuldu
- [ ] Storage Rules güncellendi
- [ ] Config bilgileri kopyalandı
- [ ] `firebase.ts` dosyası güncellendi
- [ ] Uygulama test edildi
- [ ] İlk kullanıcı oluşturuldu

**Hepsi işaretli mi? Tebrikler! 🎉**

Artık Seferî uygulamanız tamamen çalışır durumda!
