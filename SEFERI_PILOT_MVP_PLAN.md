# 🎯 SEFERİ - Pilot MVP Planı
## 100 Öğrenci Test | 2 Ay Timeline | Android

---

## 📊 Mevcut Durum (Hazır Olanlar)

✅ **Temel Altyapı:**
- React Native + Expo + Firebase
- User Authentication (Login/Register)
- Fotoğraf çekme/yükleme
- GPS konum kontrolü (Ahlat boundary)
- Basit puanlama (1-10 puan)
- Kullanıcı profili
- Liderlik tablosu
- Offline destek (kısmi)

**Tamamlanma:** ~40%

---

## 🚀 2 Aylık Pilot MVP Özellikleri

### **TIER 1 - CORE (Mutlaka Olmalı)**
*Hafta 1-4*

#### 1. **Gelişmiş Puanlama Sistemi** ⭐⭐⭐
- [x] Kategori bazlı puanlama (Tarihi, Yemek, Doğa, Kültür, Konaklama)
- [x] Konum doğrulaması (Ahlat içi/dışı)
- [ ] **Bonus çarpanlar:**
  - İlk keşif +50%
  - Combo (24h içinde 5+ kategori) = 2x
  - Gece fotoğrafı (18:00-06:00) +25%
  - Hashtag bonusu (#ahlatseferi + 3 tag) +10 puan
- [ ] **Özel puanlama:**
  - İşletme tag (yemek için) +10 puan extra
  - Konaklama: check-in 5p, her gece +3p

**Tablo:**
| Kategori | Konum | İşletme Tag | Puan |
|----------|-------|-------------|------|
| Tarihi Yer | Ahlat | - | 10 |
| Yemek | Ahlat | ✅ | 15 |
| Yemek | Ahlat | ❌ | 5 |
| Yemek | Dışarı | - | 0.5 |
| Doğa | Ahlat | - | 8 |
| Doğa | Dışarı | - | 1 |
| Kültür | Ahlat | - | 7 |

#### 2. **POI (Points of Interest) Sistemi** ⭐⭐⭐
- [ ] **Ahlat POI Database** (minimum 20 nokta):
  - A-Tier (6): Selçuklu Mezarlığı, Ulu Camii, Çifte Kümbet, Nemrut, Van Gölü, Kadın Hamamı
  - B-Tier (8): Harabeşehir, Müze, Tarihi Çarşı, vb.
  - C-Tier (6+): Gizli yerler, köyler
- [ ] **Check-in Mekaniği:**
  - GPS auto-detect (100m radius)
  - Manuel QR kod okutma (işletmeler için)
  - Fotoğraf doğrulaması
- [ ] **Puanlama:**
  - A-Tier ilk check-in: 20p
  - B-Tier ilk check-in: 10p
  - C-Tier ilk check-in: 15p (bonus)
  - Tekrar ziyaret: %50 puan
- [ ] **Harita görünümü:**
  - Ziyaret edilen: yeşil pin
  - Edilmeyen: kırmızı pin
  - Yakınlık bildirimi (200m içinde)

#### 3. **Rozet (Badge) Sistemi** ⭐⭐⭐
- [ ] **Keşif Rozetleri (4):**
  - 🥉 Gezgin - 10 farklı yer
  - 🥈 Kaşif - 25 farklı yer
  - 🥇 Seyyah - 50 farklı yer (pilot için ulaşılması zor)
  - 💎 Ahlat'ın Sefiri - Tüm A-Tier yerler
- [ ] **Yemek Rozetleri (3):**
  - 🍴 Gurme - 5 farklı yerel yemek
  - 👨‍🍳 Şef - 10 farklı yemek
  - 🌟 Damak Tadı Ustası - Tüm yerel yemekler (Köfte, Keledoş, İşkembe, Kavut)
- [ ] **Sosyal Rozetler (3):**
  - 📸 Influencer - 100+ beğeni alan fotoğraf
  - 🔥 Viral - 500+ beğeni
  - 👥 Topluluk Lideri - 5 kişi davet
- [ ] **Özel Rozetler (5):**
  - 🌅 Gün Doğumu Avcısı - 05:00-06:00 arası 5 foto
  - 🌙 Gece Kuşu - 22:00-00:00 arası 10 foto
  - 📅 Sadık Turist - 7 gün streak
  - 🎭 Festival Rozeti - Event döneminde özel
  - 🏆 Beta Tester - İlk 100 kullanıcı (öğrenciler için!)

**Toplam:** 15 rozet

#### 4. **Görev (Quest) Sistemi** ⭐⭐⭐
- [ ] **Günlük Görevler (5):** (her gün 00:00'da reset)
  - ☀️ Bir fotoğraf paylaş: +5p
  - 📍 Yeni bir yer keşfet: +10p
  - ❤️ 3 fotoğrafa beğeni: +3p
  - 💬 2 yoruma yanıt: +5p
  - 🎯 Rastgele kategori fotoğrafı: +7p
- [ ] **Haftalık Görevler (4):** (Pazartesi reset)
  - 🗺️ 5 farklı kategori fotoğrafı: +50p
  - 🍽️ 3 farklı restoran ziyaret: +30p
  - 👥 1 arkadaş davet et: +25p
  - 📸 10 fotoğraf paylaş: +40p
- [ ] **Özel Görevler:** (Admin tarafından tetiklenir)
  - Event bazlı
  - Sezonluk
- [ ] **Progress tracking:**
  - Her görev için progress bar
  - Countdown timer
  - Tamamlananlar arşivi

#### 5. **Seviye (Level) Sistemi** ⭐⭐
- [ ] **XP = Puan** (basit model)
- [ ] **Seviye aralıkları:**
  - Lv 1-10: Turist (0-500p)
  - Lv 11-25: Gezgin (501-2000p)
  - Lv 26-50: Kaşif (2001-5000p)
  - Lv 51-75: Seyyah (5001-10000p)
  - Lv 76-99: Sefiri (10001-25000p)
  - Lv 100: Efsane (25000+)
- [ ] **Progress bar** (profilde)
- [ ] **Level-up animasyonu**
- [ ] **Her seviyede:**
  - Özel başlık/unvan
  - Profil çerçevesi (opsiyonel)

#### 6. **Streak (Ardışık Gün) Sistemi** ⭐⭐
- [ ] **Mekanik:** En az 1 fotoğraf/gün
- [ ] **Bonus:**
  - 🔥 3 gün = +10% puan
  - 🔥 7 gün = +25% puan + rozet
  - 🔥 30 gün = +50% puan (pilot için olası değil ama sisteme ekle)
- [ ] **UI:**
  - Ana ekranda streak counter
  - "X gün streak!" göstergesi
  - Kırılmak üzereyse uyarı (push)
- [ ] **Streak kurtarma:** (opsiyonel, v2)
  - 1 kez 24h geçmişe gidip ekleyebilir

---

### **TIER 2 - ENHANCED (Önemli)**
*Hafta 5-6*

#### 7. **Sosyal Feed** ⭐⭐⭐
- [ ] **Ana Feed:**
  - Son 50 fotoğraf (sonsuz scroll)
  - Trend/Popüler filtresi
  - Takip ettiklerim filtresi
- [ ] **Etkileşim:**
  - ❤️ Beğeni (tek tap)
  - 💬 Yorum (text)
  - 👤 Kullanıcı profili görüntüleme
- [ ] **Takip sistemi:**
  - Kullanıcı takip et/bırak
  - Takipçi/takip edilen sayısı
- [ ] **Fotoğraf detay sayfası:**
  - Büyük görsel
  - Kategori badge
  - Konum bilgisi
  - Kazanılan puan
  - Beğeni/yorum listesi

#### 8. **Liderlik Tablosu (Geliştirilmiş)** ⭐⭐
- [x] Genel liderlik (mevcut)
- [ ] **Yeni özellikler:**
  - 🌍 Bu Hafta liderleri (Pazartesi reset)
  - 🏆 Bu Ay liderleri (her ay reset)
  - 📍 İlk 3 için özel UI (madalya + highlight)
  - 👤 "Benim sıralam" quick view
  - 📈 Geçen haftaya göre değişim (↑↓)

#### 9. **Push Notifications** ⭐⭐
- [ ] **Tetikleyiciler:**
  - 📍 Önemli yere yaklaşınca (geo-fence)
  - 🏆 Rozet kazanıldığında
  - 📈 Seviye atlandığında
  - ❤️ Fotoğrafa beğeni geldiğinde
  - 💬 Yorum geldiğinde
  - 🔥 Streak kırılmak üzereyken (20:00'da uyarı)
  - 🎯 Yeni görev eklendiğinde
- [ ] **Firebase Cloud Messaging** entegrasyonu
- [ ] **Ayarlar:** (User açıp kapayabilir)

---

### **TIER 3 - NICE TO HAVE (Zaman Kalırsa)**
*Hafta 7-8*

#### 10. **Basit Kupon Sistemi** ⭐
- [ ] **Statik kuponlar:**
  - ☕ 500p = %10 kafe indirimi
  - 🍽️ 1000p = %15 restoran indirimi
  - 🎟️ 300p = Müze %20 indirim
- [ ] **QR kod gösterimi**
- [ ] **Kullanıldı/kullanılmadı** durumu
- [ ] **İşletme QR okuyucu** (basit web panel - opsiyonel)

#### 11. **Davet (Referral) Sistemi** ⭐
- [ ] **Davet kodu** (her kullanıcıya unique)
- [ ] **Bonus:**
  - Arkadaş kaydolunca: +50p
  - Arkadaş 100p kazanınca: +25p
- [ ] **Davet sayısı tracking**
- [ ] **Topluluk Lideri rozeti** (5 davet)

#### 12. **Hikaye Modu (Story)** ⭐
- [ ] **24 saat aktif**
- [ ] **Sadece takipçiler görür**
- [ ] **Basit UI** (Instagram benzeri)
- [ ] **Fotoğraf ekle/sil**

#### 13. **Offline Mode (Geliştirilmiş)** ⭐
- [x] Basit offline storage (mevcut)
- [ ] **Gelişmiş:**
  - Offline iken fotoğraf çek → kuyruğa al
  - Online olunca otomatik sync
  - Offline iken puanları lokal hesapla
  - Sync durumu göstergesi

---

## 🗓️ 8 Haftalık Development Roadmap

### **HAFTA 1-2: Core Gamification**
- [x] Mevcut kodun refactor'u
- [ ] Gelişmiş puanlama sistemi
- [ ] Kategori seçimi UI
- [ ] Bonus çarpanları (combo, gece, hashtag)
- [ ] Seviye sistemi
- [ ] Streak sistemi
- **Deliverable:** Puanlama + Seviye çalışıyor

### **HAFTA 3-4: POI & Rozet**
- [ ] Ahlat POI database (20+ nokta)
- [ ] Harita UI (MapBox entegrasyonu)
- [ ] Check-in mekaniği (GPS + QR)
- [ ] Yakınlık bildirimleri
- [ ] Rozet sistemi (15 rozet)
- [ ] Rozet unlock animasyonları
- **Deliverable:** Harita + POI + Rozet aktif

### **HAFTA 5: Görev Sistemi**
- [ ] Görev database schema
- [ ] Günlük görevler (5 adet)
- [ ] Haftalık görevler (4 adet)
- [ ] Görev progress tracking
- [ ] Reset cron job (daily/weekly)
- **Deliverable:** Görevler çalışıyor

### **HAFTA 6: Sosyal Feed**
- [ ] Feed UI (Instagram-like)
- [ ] Beğeni/yorum sistemi
- [ ] Takip sistemi
- [ ] Fotoğraf detay sayfası
- [ ] Trend/popüler algoritması
- **Deliverable:** Sosyal özellikler çalışıyor

### **HAFTA 7: Liderboard + Notifications**
- [ ] Liderboard geliştirmeleri (haftalık/aylık)
- [ ] Push notification entegrasyonu
- [ ] Geo-fence setup (önemli yerler için)
- [ ] Notification ayarları
- **Deliverable:** Bildirimler aktif

### **HAFTA 8: Polish + Pilot Hazırlık**
- [ ] Bug fixing
- [ ] UI/UX iyileştirmeleri
- [ ] Performance optimization
- [ ] Offline mode iyileştirmeleri
- [ ] Test APK build
- [ ] Kupon sistemi (varsa)
- [ ] Onboarding tutorial
- [ ] Admin panel (basit - görev ekleme için)
- **Deliverable:** Pilot-ready APK

---

## 📲 Teknik Stack (Değişiklikler)

### **Frontend (Mevcut + Eklenecek):**
- [x] React Native + Expo
- [x] TypeScript
- [x] React Navigation
- [x] Expo Camera, Location
- [ ] **YENİ:** MapBox SDK (harita için)
- [ ] **YENİ:** Expo Notifications (push)
- [ ] **YENİ:** expo-barcode-scanner (QR kod)
- [ ] **YENİ:** Redux Toolkit / Zustand (state management)
- [ ] **YENİ:** React Query (data fetching)

### **Backend (Firebase - Genişletilmiş):**
- [x] Firebase Auth
- [x] Firestore Database
- [x] Firebase Storage
- [ ] **YENİ:** Firebase Cloud Functions (cron jobs - görev reset)
- [ ] **YENİ:** Firebase Cloud Messaging (push)
- [ ] **YENİ:** Firebase Analytics (tracking)
- [ ] **YENİ:** Firestore Security Rules (güvenlik)

### **Yeni Collections (Firestore):**
```
users/
  └─ {userId}
      - name, email, points, level, streak, badges[]
      - photoCount, joinDate, lastActive
      - following[], followers[]

photos/
  └─ {photoId}
      - userId, imageUrl, category, location
      - points, timestamp, likes[], comments[]
      - hashtags[], poiId

pois/ (Points of Interest)
  └─ {poiId}
      - name, description, tier (A/B/C)
      - location (lat, lng), radius
      - points, category, imageUrl
      - checkIns (counter)

badges/
  └─ {badgeId}
      - name, description, icon, tier
      - requirement (JSON), points

quests/
  └─ {questId}
      - type (daily/weekly/special)
      - description, points, requirement
      - activeUntil, resetType

userBadges/
  └─ {userId}/{badgeId}
      - unlockedAt, progress

userQuests/
  └─ {userId}/{questId}
      - progress, completed, claimedAt

coupons/
  └─ {couponId}
      - name, discount, pointCost
      - usedBy[], expiresAt

leaderboard/ (cache collection)
  └─ weekly/{timestamp}
      - userRankings[]
  └─ monthly/{timestamp}
      - userRankings[]
```

---

## 🎯 Pilot Test Stratejisi (100 Öğrenci)

### **Pre-Test (1 hafta önce):**
- [ ] APK dağıtımı (Google Drive link)
- [ ] Onboarding dökümanı (PDF)
- [ ] Test görevleri listesi
- [ ] Feedback formu (Google Forms)
- [ ] WhatsApp/Telegram grup oluştur

### **Test Süresi:**
- **Minimum:** 2 hafta
- **Optimal:** 4 hafta
- **Ahlat'ta aktif test**

### **Test Hedefleri:**
- [ ] Her öğrenci minimum 10 fotoğraf
- [ ] A-Tier POI'ların %100'ü ziyaret edilsin
- [ ] En az 5 öğrenci 7 gün streak yapsın
- [ ] Sosyal feed aktif kullanılsın (beğeni/yorum)
- [ ] Her rozetten en az 3 öğrenci kazansın

### **Ölçülecek Metrikler:**
- DAU (Daily Active Users)
- Ortalama fotoğraf/kullanıcı
- En çok ziyaret edilen POI
- En aktif saatler
- Crash rate
- Bug raporları
- Öğrenci memnuniyeti (1-10)

### **Feedback Toplama:**
1. **Uygulama içi:** "Geri bildirim gönder" butonu
2. **Google Form:** Haftalık survey
3. **WhatsApp grubu:** Anlık sorunlar
4. **Yüz yüze:** Haftalık toplantı (opsiyonel)

---

## 🛡️ Güvenlik ve Limitler

### **Firebase Free Tier:**
- Auth: 10K kullanıcı/ay ✅
- Firestore: 50K reads/day, 20K writes/day ✅
- Storage: 5GB, 1GB/day bandwidth ✅
- Cloud Functions: 125K invocations/month ✅

**100 öğrenci için yeterli!**

### **Security Rules:**
- Kullanıcılar sadece kendi verilerini yazabilir
- Fotoğraflar herkese okunabilir
- Badge/quest verisi read-only (sadece cloud function yazabilir)
- Rate limiting (kötüye kullanım önleme)

---

## 📊 Başarı Kriterleri (2 Ay Sonunda)

### **Teknik:**
- ✅ Crash-free rate >95%
- ✅ Tüm core özellikler çalışıyor
- ✅ Offline mode stabil
- ✅ Push notification %80+ açık

### **Engagement:**
- ✅ En az 70 aktif kullanıcı (100'den)
- ✅ Ortalama 15+ fotoğraf/kullanıcı
- ✅ Tüm A-Tier POI'lar ziyaret edildi
- ✅ 500+ toplam fotoğraf
- ✅ En az 20 öğrenci 7 gün streak
- ✅ Her rozetten en az 5 kişi kazandı

### **Feedback:**
- ✅ Ortalama rating >4/5
- ✅ En az 50 anlamlı feedback
- ✅ Kritik bug listesi oluştu

---

## 🚀 Post-Pilot (Test Sonrası)

### **Analiz (1 hafta):**
- Verileri topla ve analiz et
- Bug priority listesi
- En çok kullanılan/kullanılmayan özellikler
- Öğrenci feedbacklerini kategorize et

### **İyileştirme (2 hafta):**
- Kritik bugları düzelt
- UX problemlerini çöz
- Performans iyileştirmeleri
- Önerilen özellikleri değerlendir

### **v2.0 Planlama:**
- AI görüntü tanıma
- AR özellikler
- Kupon sistemini genişlet
- Multi-şehir desteği (Türkiye geneli hazırlık)

---

## 📝 Notlar

1. **İlk öncelik:** Core gamification mekanikleri
2. **Sosyal özellikler:** Test için kritik (engagement için)
3. **AI/AR:** v2.0'a ertele (2 ayda riskli)
4. **Admin panel:** Basit olsun (sadece görev ekleme)
5. **Performans:** 100 kullanıcı için yeterli optimize et

---

## ✅ Checklist (Başlamadan Önce)

- [ ] Firebase projesi kurulu
- [ ] MapBox hesabı (ücretsiz tier)
- [ ] Ahlat POI listesi hazır (20+ nokta, koordinatlar)
- [ ] Rozet icon'ları tasarlandı (15 adet)
- [ ] Test grubu WhatsApp/Telegram oluşturuldu
- [ ] Git branch'i oluşturuldu (`pilot-mvp`)
- [ ] Development environment hazır

---

**🎯 Hedef:** 8 hafta sonra 100 öğrenci ile Ahlat'ta gerçek pilot test!

**📅 Başlangıç:** Şimdi
**📅 Test Başlangıcı:** 8 hafta sonra
**📅 Test Bitişi:** 12 hafta sonra

---

**Versiyon:** Pilot MVP v1.0
**Tarih:** 2025-11-17
**Durum:** Planlama Tamamlandı ✅
