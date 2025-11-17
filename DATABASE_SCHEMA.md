# 🗄️ SEFERİ - Firebase Firestore Database Schema

## Detaylı Collection Yapısı

---

## 📁 Collections Overview

```
firestore/
├── users/
├── photos/
├── pois/
├── badges/
├── quests/
├── userBadges/
├── userQuests/
├── coupons/
├── userCoupons/
├── comments/
├── likes/
├── followers/
├── leaderboards/
└── systemConfig/
```

---

## 👤 1. users Collection

**Path:** `/users/{userId}`

```typescript
interface User {
  // Temel Bilgiler
  id: string;                    // Firebase Auth UID
  email: string;
  displayName: string;
  photoURL?: string;             // Profil fotoğrafı

  // İstatistikler
  points: number;                // Toplam puan
  level: number;                 // Seviye (1-100)
  xp: number;                    // points ile aynı (şimdilik)
  photoCount: number;            // Toplam fotoğraf sayısı

  // Gamification
  streak: number;                // Ardışık gün sayısı
  maxStreak: number;             // En yüksek streak
  lastPhotoDate: Timestamp;      // Son fotoğraf tarihi (streak için)
  badges: string[];              // Badge ID'leri array
  completedQuests: string[];     // Tamamlanan görev ID'leri

  // Sosyal
  following: number;             // Takip ettiği kişi sayısı
  followers: number;             // Takipçi sayısı
  totalLikes: number;            // Aldığı toplam beğeni

  // POI
  visitedPOIs: string[];         // Ziyaret edilen POI ID'leri
  poiCheckIns: number;           // Toplam check-in sayısı

  // Referral
  referralCode: string;          // Davet kodu (unique)
  referredBy?: string;           // Kim davet etti (userId)
  referralCount: number;         // Kaç kişi davet etti

  // Metadata
  createdAt: Timestamp;
  lastActive: Timestamp;
  version: string;               // "1.0.0"

  // Ayarlar
  settings: {
    notifications: {
      push: boolean;
      email: boolean;
      newFollower: boolean;
      newLike: boolean;
      newComment: boolean;
      levelUp: boolean;
      badgeUnlocked: boolean;
      nearbyPOI: boolean;
      streakReminder: boolean;
    };
    privacy: {
      profilePublic: boolean;
      showInLeaderboard: boolean;
    };
    language: "tr" | "en";
  };
}
```

**Indexes:**
- `points` (desc) - Liderboard için
- `level` (desc)
- `referralCode` (asc) - Davet kodu arama

---

## 📸 2. photos Collection

**Path:** `/photos/{photoId}`

```typescript
interface Photo {
  id: string;
  userId: string;                // Fotoğrafı çeken

  // Görsel
  imageUrl: string;              // Firebase Storage URL
  thumbnailUrl?: string;         // Küçük boyut (opsiyonel)

  // Kategori ve Konum
  category: "normal" | "food" | "historical" | "nature" | "culture" | "accommodation";
  location: {
    lat: number;
    lng: number;
    address?: string;            // Reverse geocoding (opsiyonel)
    isInAhlat: boolean;          // Ahlat boundary içinde mi?
  };

  // POI İlişkisi
  poiId?: string;                // İlişkili POI (varsa)
  isCheckIn: boolean;            // POI check-in mi?
  businessTag?: string;          // İşletme tag (yemek için)

  // Puanlama
  points: number;                // Bu fotoğraftan kazanılan puan
  bonusPoints: number;           // Bonus puanlar (combo, ilk keşif, vb.)
  bonusReasons: string[];        // ["first_discovery", "night_bonus", "combo_5x"]

  // Sosyal
  likes: number;                 // Toplam beğeni
  comments: number;              // Toplam yorum

  // Hashtag ve Açıklama
  caption?: string;              // Kullanıcı açıklaması
  hashtags: string[];            // ["#ahlat", "#seferi"]

  // Metadata
  createdAt: Timestamp;
  uploadedAt: Timestamp;

  // Moderasyon (opsiyonel - v2)
  isApproved: boolean;           // Default: true
  isFlagged: boolean;
  flagReasons: string[];
}
```

**Indexes:**
- `userId` (asc), `createdAt` (desc) - Kullanıcı fotoğrafları
- `createdAt` (desc) - Feed için
- `likes` (desc), `createdAt` (desc) - Trend fotoğraflar
- `poiId` (asc) - POI'ye ait fotoğraflar
- `category` (asc), `createdAt` (desc)

---

## 📍 3. pois Collection

**Path:** `/pois/{poiId}`

```typescript
interface POI {
  id: string;

  // Temel Bilgiler
  name: string;
  nameEn?: string;
  description: string;
  tier: "A" | "B" | "C";         // Tier seviyesi
  category: "historical" | "nature" | "culture" | "food" | "accommodation";

  // Konum
  location: {
    lat: number;
    lng: number;
  };
  radius: number;                // Metre cinsinden (check-in için)
  address?: string;

  // Puanlama
  points: {
    firstCheckIn: number;        // İlk ziyaret
    repeat: number;              // Tekrar ziyaret
  };

  // Görsel
  imageUrl?: string;             // POI görseli
  thumbnailUrl?: string;

  // Bilgi
  bestTime?: string;             // "17:00-19:00"
  difficulty?: "easy" | "medium" | "hard";
  hashtags: string[];

  // İşletme Bilgisi (eğer işletme POI ise)
  isBusiness: boolean;
  businessInfo?: {
    type: "restaurant" | "hotel" | "cafe" | "shop";
    speciality?: string;         // "Ahlat Köftesi"
    openingHours?: string;
    phoneNumber?: string;
    qrCode?: string;             // QR kod check-in için
  };

  // İstatistikler
  checkIns: number;              // Toplam check-in sayısı
  uniqueVisitors: number;        // Kaç farklı kişi ziyaret etti
  photoCount: number;            // Bu POI'de çekilen fotoğraf sayısı

  // Metadata
  createdAt: Timestamp;
  isActive: boolean;             // Aktif mi?
  adminNotes?: string;
}
```

**Indexes:**
- `tier` (asc), `category` (asc)
- `location` (geohash) - Yakınlık araması için (Firebase GeoFire kullanılacak)
- `checkIns` (desc) - Popüler POI'lar

---

## 🏆 4. badges Collection

**Path:** `/badges/{badgeId}`

```typescript
interface Badge {
  id: string;

  // Temel Bilgiler
  name: string;
  nameEn?: string;
  description: string;
  icon: string;                  // Emoji veya icon URL
  tier: "bronze" | "silver" | "gold" | "platinum" | "special";

  // Kategori
  category: "exploration" | "food" | "social" | "special" | "time";

  // Gereksinim
  requirement: {
    type: "poi_count" | "photo_count" | "specific_pois" | "food_variety" |
          "likes_received" | "referral_count" | "streak" | "time_based" | "custom";
    value: number | string[];    // Sayı veya POI ID array
    description: string;         // "10 farklı yer ziyaret et"
  };

  // Ödül
  bonusPoints?: number;          // Bu rozeti kazanınca bonus puan

  // Metadata
  rarity: "common" | "rare" | "epic" | "legendary";
  order: number;                 // Sıralama için
  isActive: boolean;
  createdAt: Timestamp;
}
```

**Önceden Tanımlı Rozetler (15 adet):**

```typescript
const PREDEFINED_BADGES = [
  {
    id: "badge_explorer_1",
    name: "Gezgin 🥉",
    requirement: { type: "poi_count", value: 10 },
    tier: "bronze"
  },
  {
    id: "badge_explorer_2",
    name: "Kaşif 🥈",
    requirement: { type: "poi_count", value: 25 },
    tier: "silver"
  },
  {
    id: "badge_explorer_3",
    name: "Seyyah 🥇",
    requirement: { type: "poi_count", value: 50 },
    tier: "gold"
  },
  {
    id: "badge_sefiri",
    name: "Ahlat'ın Sefiri 💎",
    requirement: {
      type: "specific_pois",
      value: ["poi_001", "poi_002", "poi_003", "poi_004", "poi_005", "poi_006"]
    },
    tier: "platinum"
  },
  {
    id: "badge_foodie_1",
    name: "Gurme 🍴",
    requirement: { type: "food_variety", value: 5 },
    tier: "bronze"
  },
  {
    id: "badge_foodie_2",
    name: "Şef 👨‍🍳",
    requirement: { type: "food_variety", value: 10 },
    tier: "silver"
  },
  {
    id: "badge_foodie_3",
    name: "Damak Tadı Ustası 🌟",
    requirement: { type: "custom", value: "all_local_foods" },
    tier: "gold"
  },
  {
    id: "badge_influencer",
    name: "Influencer 📸",
    requirement: { type: "likes_received", value: 100 },
    tier: "silver"
  },
  {
    id: "badge_viral",
    name: "Viral 🔥",
    requirement: { type: "likes_received", value: 500 },
    tier: "gold"
  },
  {
    id: "badge_community",
    name: "Topluluk Lideri 👥",
    requirement: { type: "referral_count", value: 5 },
    tier: "silver"
  },
  {
    id: "badge_sunrise",
    name: "Gün Doğumu Avcısı 🌅",
    requirement: { type: "time_based", value: "5_photos_05_06" },
    tier: "special"
  },
  {
    id: "badge_night_owl",
    name: "Gece Kuşu 🌙",
    requirement: { type: "time_based", value: "10_photos_22_00" },
    tier: "special"
  },
  {
    id: "badge_loyal",
    name: "Sadık Turist 📅",
    requirement: { type: "streak", value: 7 },
    tier: "gold"
  },
  {
    id: "badge_festival",
    name: "Festival Rozeti 🎭",
    requirement: { type: "custom", value: "festival_participation" },
    tier: "special"
  },
  {
    id: "badge_beta_tester",
    name: "Beta Tester 🏆",
    requirement: { type: "custom", value: "first_100_users" },
    tier: "legendary"
  }
];
```

---

## 🎯 5. quests Collection

**Path:** `/quests/{questId}`

```typescript
interface Quest {
  id: string;

  // Temel Bilgiler
  title: string;
  description: string;
  icon?: string;

  // Tip ve Süre
  type: "daily" | "weekly" | "special";
  resetType?: "daily" | "weekly" | "manual"; // Otomatik reset

  // Gereksinim
  requirement: {
    type: "photo_upload" | "poi_visit" | "like_photos" | "comment" |
          "category_variety" | "restaurant_visit" | "referral" | "custom";
    target: number | string[];
    current?: number;            // User progress (userQuests'te tutulur aslında)
  };

  // Ödül
  reward: {
    points: number;
    badge?: string;              // Rozet ID (opsiyonel)
  };

  // Geçerlilik
  isActive: boolean;
  activeFrom?: Timestamp;
  activeTo?: Timestamp;

  // Metadata
  order: number;                 // Gösterim sırası
  createdAt: Timestamp;
  createdBy: "system" | "admin";
}
```

**Önceden Tanımlı Görevler:**

```typescript
// Günlük Görevler (her gün reset)
const DAILY_QUESTS = [
  {
    id: "daily_photo",
    title: "Günün Fotoğrafı ☀️",
    description: "Herhangi bir fotoğraf paylaş",
    requirement: { type: "photo_upload", target: 1 },
    reward: { points: 5 }
  },
  {
    id: "daily_explore",
    title: "Keşif Zamanı 📍",
    description: "Yeni bir yer keşfet",
    requirement: { type: "poi_visit", target: 1 },
    reward: { points: 10 }
  },
  {
    id: "daily_social_likes",
    title: "Sosyal Gezgin ❤️",
    description: "3 fotoğrafa beğeni",
    requirement: { type: "like_photos", target: 3 },
    reward: { points: 3 }
  },
  {
    id: "daily_social_comments",
    title: "Yorum Zamanı 💬",
    description: "2 yoruma yanıt ver",
    requirement: { type: "comment", target: 2 },
    reward: { points: 5 }
  },
  {
    id: "daily_random_category",
    title: "Rastgele Kategori 🎯",
    description: "Bugünün kategorisi: [random]",
    requirement: { type: "custom", target: ["random_category"] },
    reward: { points: 7 }
  }
];

// Haftalık Görevler (Pazartesi reset)
const WEEKLY_QUESTS = [
  {
    id: "weekly_variety",
    title: "Çeşitlilik Uzmanı 🗺️",
    description: "5 farklı kategori fotoğrafı paylaş",
    requirement: { type: "category_variety", target: 5 },
    reward: { points: 50 }
  },
  {
    id: "weekly_restaurants",
    title: "Gastronomi Turu 🍽️",
    description: "3 farklı restoran ziyaret et",
    requirement: { type: "restaurant_visit", target: 3 },
    reward: { points: 30 }
  },
  {
    id: "weekly_referral",
    title: "Arkadaşını Getir 👥",
    description: "Bir arkadaşını davet et",
    requirement: { type: "referral", target: 1 },
    reward: { points: 25 }
  },
  {
    id: "weekly_photo_count",
    title: "Fotoğraf Maratonu 📸",
    description: "10 fotoğraf paylaş",
    requirement: { type: "photo_upload", target: 10 },
    reward: { points: 40 }
  }
];
```

---

## 👤🏆 6. userBadges Collection

**Path:** `/userBadges/{userId}/badges/{badgeId}`

```typescript
interface UserBadge {
  userId: string;
  badgeId: string;

  // Progress
  progress: number;              // 0-100 arası yüzde
  isUnlocked: boolean;
  unlockedAt?: Timestamp;

  // Ekstra
  notifiedUser: boolean;         // Push notification gönderildi mi?
}
```

**Alternative (Subcollection yerine):**
Path: `/userBadges/{userBadgeId}`
- userBadgeId = `${userId}_${badgeId}`

---

## 👤🎯 7. userQuests Collection

**Path:** `/userQuests/{userId}/quests/{questId}`

```typescript
interface UserQuest {
  userId: string;
  questId: string;

  // Progress
  progress: number;              // Mevcut ilerleme (örn: 2/5)
  target: number;                // Hedef (örn: 5)
  isCompleted: boolean;
  completedAt?: Timestamp;
  isClaimed: boolean;            // Ödül alındı mı?
  claimedAt?: Timestamp;

  // Reset tracking
  lastResetAt: Timestamp;        // Son reset zamanı

  // Metadata
  updatedAt: Timestamp;
}
```

---

## 🎟️ 8. coupons Collection

**Path:** `/coupons/{couponId}`

```typescript
interface Coupon {
  id: string;

  // Temel Bilgiler
  title: string;
  description: string;
  icon?: string;

  // Kategori
  category: "food" | "accommodation" | "museum" | "tour" | "gift";
  businessName?: string;         // "Ahlat Köfte Salonu"

  // Değer
  discountType: "percentage" | "fixed" | "free_item";
  discountValue: number;         // 10, 15, 20 (% veya TL)

  // Maliyet
  pointCost: number;             // Kaç puanla alınır

  // Geçerlilik
  isActive: boolean;
  expiresAt?: Timestamp;
  maxUsagePerUser: number;       // Kullanıcı başına max kullanım
  totalStock?: number;           // Toplam stok (opsiyonel)
  remainingStock?: number;

  // QR Kod
  qrCodeTemplate?: string;       // QR kod şablonu

  // Metadata
  createdAt: Timestamp;
  usageCount: number;            // Toplam kullanım
}
```

---

## 👤🎟️ 9. userCoupons Collection

**Path:** `/userCoupons/{userCouponId}`

```typescript
interface UserCoupon {
  id: string;                    // Auto-generated
  userId: string;
  couponId: string;

  // Durum
  isUsed: boolean;
  usedAt?: Timestamp;
  purchasedAt: Timestamp;

  // QR Kod
  qrCode: string;                // Unique QR kod

  // Geçerlilik
  expiresAt?: Timestamp;

  // Kullanım
  usedAtBusiness?: string;       // Hangi işletmede kullanıldı
}
```

**Composite Index:**
- `userId` (asc), `isUsed` (asc), `purchasedAt` (desc)

---

## 💬 10. comments Collection

**Path:** `/comments/{commentId}`

```typescript
interface Comment {
  id: string;
  photoId: string;
  userId: string;                // Yorumu yapan

  // İçerik
  text: string;

  // Sosyal
  likes: number;

  // Metadata
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  isEdited: boolean;

  // Moderasyon
  isFlagged: boolean;
  isDeleted: boolean;
}
```

**Index:**
- `photoId` (asc), `createdAt` (desc)

---

## ❤️ 11. likes Collection

**Path:** `/likes/{likeId}`

```typescript
interface Like {
  id: string;                    // userId_photoId (composite)
  userId: string;
  photoId: string;
  createdAt: Timestamp;
}
```

**Index:**
- `photoId` (asc), `createdAt` (desc)
- `userId` (asc), `createdAt` (desc)

---

## 👥 12. followers Collection

**Path:** `/followers/{followId}`

```typescript
interface Follow {
  id: string;                    // followerId_followingId
  followerId: string;            // Takip eden
  followingId: string;           // Takip edilen
  createdAt: Timestamp;
}
```

**Index:**
- `followerId` (asc) - Kullanıcının takip ettikleri
- `followingId` (asc) - Kullanıcının takipçileri

---

## 🏆 13. leaderboards Collection (Cache)

**Path:** `/leaderboards/{type}/{period}`

```typescript
interface Leaderboard {
  id: string;                    // "weekly_2025_W47" veya "monthly_2025_11"
  type: "weekly" | "monthly" | "allTime";
  period: string;                // "2025-W47" veya "2025-11"

  rankings: Array<{
    rank: number;
    userId: string;
    displayName: string;
    photoURL?: string;
    points: number;
    change?: number;             // Önceki haftaya göre (↑3, ↓2)
  }>;

  // Metadata
  generatedAt: Timestamp;
  expiresAt: Timestamp;          // Cache süresi
}
```

**Not:** Liderboard Cloud Function ile her gece hesaplanır ve cache'lenir.

---

## ⚙️ 14. systemConfig Collection

**Path:** `/systemConfig/{configId}`

```typescript
interface SystemConfig {
  id: string;

  // Genel Ayarlar
  app: {
    maintenanceMode: boolean;
    minimumVersion: string;      // "1.0.0"
    forceUpdate: boolean;
  };

  // Puanlama Ayarları
  scoring: {
    normalPhoto: number;         // 1
    historicalInAhlat: number;   // 10
    foodInAhlat: number;         // 5
    foodOutside: number;         // 0.5
    natureInAhlat: number;       // 8
    // ... diğerleri

    bonusMultipliers: {
      firstDiscovery: number;    // 1.5 (50% bonus)
      combo5x: number;           // 2
      nightPhoto: number;        // 1.25
      hashtagBonus: number;      // 10 (sabit puan)
    };
  };

  // Sınırlar
  limits: {
    maxPhotosPerDay: number;     // 50
    maxCommentsPerDay: number;   // 100
    maxLikesPerDay: number;      // 200
  };

  // Feature Flags
  features: {
    socialFeedEnabled: boolean;
    questsEnabled: boolean;
    couponsEnabled: boolean;
    arModeEnabled: boolean;
  };

  // Metadata
  updatedAt: Timestamp;
  updatedBy: string;             // Admin ID
}
```

---

## 🔐 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    function isAdmin() {
      return isAuthenticated() &&
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Users Collection
    match /users/{userId} {
      allow read: if true;  // Herkese açık (profil görüntüleme)
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId) || isAdmin();
    }

    // Photos Collection
    match /photos/{photoId} {
      allow read: if true;  // Herkese açık
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || isAdmin();
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }

    // POIs Collection
    match /pois/{poiId} {
      allow read: if true;  // Herkese açık
      allow write: if isAdmin();  // Sadece admin düzenleyebilir
    }

    // Badges Collection
    match /badges/{badgeId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Quests Collection
    match /quests/{questId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // User Badges
    match /userBadges/{userId}/badges/{badgeId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);  // Cloud Function da yazabilmeli
    }

    // User Quests
    match /userQuests/{userId}/quests/{questId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }

    // Coupons
    match /coupons/{couponId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // User Coupons
    match /userCoupons/{userCouponId} {
      allow read: if isOwner(resource.data.userId);
      allow create: if isAuthenticated();
      allow update: if isAdmin();  // Sadece admin kullanımı işaretleyebilir
    }

    // Comments
    match /comments/{commentId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.userId);
    }

    // Likes
    match /likes/{likeId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow delete: if isOwner(resource.data.userId);
    }

    // Followers
    match /followers/{followId} {
      allow read: if isAuthenticated();
      allow create, delete: if isAuthenticated();
    }

    // Leaderboards (read-only for users)
    match /leaderboards/{type}/{period} {
      allow read: if true;
      allow write: if false;  // Sadece Cloud Function yazabilir
    }

    // System Config (read-only for users)
    match /systemConfig/{configId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## ☁️ Cloud Functions (Gerekli Otomasyon)

### **1. Daily Quest Reset**
```typescript
// Her gün 00:00'da çalışır
exports.resetDailyQuests = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Europe/Istanbul')
  .onRun(async (context) => {
    // userQuests collection'daki daily görevleri resetle
  });
```

### **2. Weekly Quest Reset**
```typescript
// Her Pazartesi 00:00'da çalışır
exports.resetWeeklyQuests = functions.pubsub
  .schedule('0 0 * * 1')
  .timeZone('Europe/Istanbul')
  .onRun(async (context) => {
    // Haftalık görevleri resetle
  });
```

### **3. Leaderboard Generator**
```typescript
// Her gün 23:00'da çalışır (haftalık ve aylık leaderboard)
exports.generateLeaderboards = functions.pubsub
  .schedule('0 23 * * *')
  .timeZone('Europe/Istanbul')
  .onRun(async (context) => {
    // Leaderboard hesapla ve cache'le
  });
```

### **4. Badge Unlock Checker**
```typescript
// Fotoğraf yüklendiğinde tetiklenir
exports.checkBadgeUnlocks = functions.firestore
  .document('photos/{photoId}')
  .onCreate(async (snap, context) => {
    // Kullanıcının rozetlerini kontrol et
    // Unlock olmuşsa userBadges'e ekle
    // Push notification gönder
  });
```

### **5. Streak Reminder**
```typescript
// Her gün 20:00'da çalışır
exports.sendStreakReminders = functions.pubsub
  .schedule('0 20 * * *')
  .timeZone('Europe/Istanbul')
  .onRun(async (context) => {
    // Bugün fotoğraf çekmeyenlere hatırlatma gönder
  });
```

---

## 📊 Tahmini Storage İhtiyacı (100 Kullanıcı, 2 Ay)

| Collection | Döküman/Kullanıcı | Toplam Döküman | Boyut (KB/dok) | Toplam (MB) |
|------------|-------------------|----------------|----------------|-------------|
| users | 1 | 100 | 2 | 0.2 |
| photos | 15 | 1500 | 1 | 1.5 |
| pois | - | 29 | 2 | 0.06 |
| badges | - | 15 | 1 | 0.015 |
| quests | - | 9 | 1 | 0.009 |
| userBadges | 5 | 500 | 0.5 | 0.25 |
| userQuests | 9 | 900 | 0.5 | 0.45 |
| comments | 5 | 500 | 0.5 | 0.25 |
| likes | 20 | 2000 | 0.2 | 0.4 |
| followers | 10 | 1000 | 0.2 | 0.2 |
| **TOPLAM** | - | **~6,553** | - | **~3.3 MB** |

**Firebase Storage (Fotoğraflar):**
- 1500 fotoğraf × 2MB ortalama = 3GB
- Free tier: 5GB ✅ Yeterli!

**Firestore Free Tier Limitleri:**
- Stored data: 1GB ✅ (sadece 3.3MB kullanılacak)
- Document reads: 50K/day ✅
- Document writes: 20K/day ✅
- Document deletes: 20K/day ✅

---

**Tarih:** 2025-11-17
**Durum:** Schema Tasarımı Tamamlandı ✅
**Versiyon:** 1.0
