# 🗺️ SEFERİ - Web Platform

Ahlat'ı keşfeden turistlerin fotoğraf paylaşarak puan kazandığı, oyunlaştırma tabanlı web platformu.

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Firebase projesi (ücretsiz)

### Kurulum

1. **Bağımlılıkları yükle:**
```bash
npm install
```

2. **Firebase Configuration:**

`.env.local` dosyası oluştur (`.env.local.example` dosyasından kopyala):

```bash
cp .env.local.example .env.local
```

Firebase Console'dan ([https://console.firebase.google.com](https://console.firebase.google.com)) proje bilgilerini al ve `.env.local` dosyasına ekle:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
```

3. **Development server başlat:**
```bash
npm run dev
```

Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

## 📱 Özellikler

### ✅ Hazır Olanlar (v0.1 - MVP)

- ✅ **Authentication**
  - Email/password ile kayıt
  - Giriş/çıkış
  - Kullanıcı profili

- ✅ **Ana Dashboard**
  - Puan, seviye, streak gösterimi
  - Fotoğraf sayısı
  - Rozet görüntüleme
  - Quick actions (Kamera, Harita, Liderboard)

- ✅ **Firebase Entegrasyonu**
  - Firestore database
  - Firebase Auth
  - Firebase Storage (hazır)

- ✅ **Responsive UI**
  - Tailwind CSS
  - Mobile-first design
  - Dark mode hazır (opsiyonel)

### 🚧 Devam Edenler

- 🚧 Fotoğraf yükleme + GPS
- 🚧 Puanlama sistemi
- 🚧 Harita görünümü
- 🚧 Liderlik tablosu
- 🚧 Rozet sistemi
- 🚧 Görev sistemi

## 🛠️ Teknoloji Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **UI Components:** Custom components + React Hot Toast

### Backend
- **BaaS:** Firebase
  - Authentication (Email/Password)
  - Firestore Database
  - Cloud Storage
  - Cloud Functions (opsiyonel)

### Tools
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier (opsiyonel)

## 📂 Proje Yapısı

```
seferi-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (AuthProvider)
│   ├── page.tsx           # Ana sayfa (Dashboard)
│   ├── login/             # Login sayfası
│   ├── profile/           # Profil (yakında)
│   ├── camera/            # Fotoğraf yükleme (yakında)
│   ├── map/               # Harita (yakında)
│   └── leaderboard/       # Liderlik (yakında)
├── components/            # Reusable components
├── lib/                   # Utilities
│   ├── firebase.ts        # Firebase config
│   ├── auth-context.tsx   # Auth context provider
│   └── store.ts           # Zustand global state
├── types/                 # TypeScript types
│   └── index.ts           # User, Photo, POI, Badge, Quest
├── hooks/                 # Custom hooks
├── public/                # Static assets
└── .env.local.example     # Environment variables template
```

## 🔥 Firebase Setup

### 1. Firebase Projesi Oluştur

1. [Firebase Console](https://console.firebase.google.com/) git
2. "Add Project" tıkla
3. Proje adı gir (örn: "seferi-web")
4. "Create Project"

### 2. Authentication Aktifleştir

1. Sol menüden **Authentication** seç
2. "Get Started"
3. **Sign-in method** → **Email/Password** → **Enable**

### 3. Firestore Database Oluştur

1. Sol menüden **Firestore Database** seç
2. "Create database"
3. **Test mode** seç (şimdilik)
4. Location: **europe-west1** (Avrupa)
5. "Enable"

**Güvenlik Kuralları (Production için):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Storage Aktifleştir

1. Sol menüden **Storage** seç
2. "Get started"
3. **Test mode** seç
4. "Done"

### 5. Web App Config Al

1. Firebase Console → ⚙️ (Settings) → **Project settings**
2. "Your apps" bölümünde **</>** (Web) tıkla
3. App nickname gir: "Seferi Web"
4. "Register app"
5. **Firebase SDK snippet** → **Config** kopyala
6. `.env.local` dosyasına yapıştır

## 🎨 Özelleştirme

### Tailwind Config

`tailwind.config.ts` dosyasında renkleri ve temaları özelleştirebilirsin:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',  // Mavi
        secondary: '#8B5CF6', // Mor
      }
    }
  }
}
```

### Firebase Collections

`types/index.ts` dosyasında tüm Firestore collection type'ları tanımlı:

- `User` - Kullanıcı bilgileri
- `Photo` - Fotoğraflar
- `POI` - Keşif noktaları
- `Badge` - Rozetler
- `Quest` - Görevler

## 🐛 Sorun Giderme

### "Firebase not configured" Hatası

→ `.env.local` dosyasını oluştur ve Firebase config ekle

### "Module not found" Hatası

→ `npm install` çalıştır

### Port 3000 kullanımda

→ Farklı port kullan: `npm run dev -- -p 3001`

### TypeScript Hataları

→ `npm run build` çalıştır ve hataları gör

## 📝 Development Workflow

### 1. Yeni Sayfa Ekle

```typescript
// app/example/page.tsx
'use client';

export default function ExamplePage() {
  return <div>Yeni Sayfa</div>;
}
```

### 2. Yeni Component Ekle

```typescript
// components/MyComponent.tsx
export function MyComponent() {
  return <div>Component</div>;
}
```

### 3. Firebase Servisi Ekle

```typescript
// lib/my-service.ts
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getMyData() {
  const snapshot = await getDocs(collection(db, 'myCollection'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

## 🚢 Production Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabı oluştur
2. GitHub repo'yu bağla
3. Environment variables ekle (Firebase config)
4. Deploy!

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod
```

## 📊 Roadmap

### v0.2 (Sonraki Adım)
- [ ] Fotoğraf yükleme (Camera API)
- [ ] GPS konum (Geolocation API)
- [ ] Basit puanlama sistemi
- [ ] Profil sayfası

### v0.3
- [ ] Harita görünümü (MapBox)
- [ ] POI check-in
- [ ] Liderlik tablosu

### v0.4
- [ ] Rozet sistemi
- [ ] Görev sistemi (daily/weekly)
- [ ] Sosyal feed

### v1.0
- [ ] PWA desteği (offline mode)
- [ ] Push notifications
- [ ] AI görüntü tanıma
- [ ] Analytics dashboard

## 🤝 Katkıda Bulunma

1. Fork yap
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Commit yap (`git commit -m 'Add amazing feature'`)
4. Push yap (`git push origin feature/amazing-feature`)
5. Pull Request aç

## 📄 Lisans

MIT

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)

---

**Developed with ❤️ for Ahlat Tourism**

**Version:** 0.1.0 (MVP)
**Date:** 2025-11-22
