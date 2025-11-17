# 🚀 SEFERİ Pilot MVP - Özet Plan

## 📊 Projeye Hızlı Bakış

**Hedef:** 100 öğrenci ile Ahlat'ta 2 haftalık gerçek pilot test
**Timeline:** 8 hafta development + 2-4 hafta test
**Platform:** Android (React Native)
**Maliyet:** %100 Ücretsiz (Firebase Free Tier)

---

## ✅ Mevcut Durum

**Hazır olanlar (~40%):**
- ✅ React Native + Expo + Firebase altyapısı
- ✅ Kullanıcı kaydı/girişi
- ✅ Fotoğraf çekme/yükleme
- ✅ GPS konum kontrolü
- ✅ Basit puanlama (1-10 puan)
- ✅ Kullanıcı profili
- ✅ Liderlik tablosu
- ✅ Offline destek (kısmi)

**Eksikler:**
- ❌ Rozet sistemi
- ❌ Görev sistemi
- ❌ POI check-in
- ❌ Sosyal feed (beğeni/yorum)
- ❌ Streak sistemi
- ❌ Detaylı puanlama (bonus, combo, vb.)
- ❌ Harita görünümü
- ❌ Push notifications

---

## 🎯 8 Haftalık Plan

### **Hafta 1-2: Core Gamification**
- Gelişmiş puanlama (kategori, bonus, combo)
- Seviye sistemi (1-100)
- Streak sistemi (ardışık gün)

### **Hafta 3-4: POI & Rozet**
- 29 Ahlat POI database
- Harita + Check-in mekaniği
- 15 rozet sistemi

### **Hafta 5: Görev Sistemi**
- 5 günlük görev
- 4 haftalık görev
- Progress tracking

### **Hafta 6: Sosyal Feed**
- Feed UI (Instagram-like)
- Beğeni/yorum
- Takip sistemi

### **Hafta 7: Liderboard + Notifications**
- Haftalık/aylık liderlik
- Push notifications
- Geo-fence (yakınlık bildirimleri)

### **Hafta 8: Polish + APK**
- Bug fixing
- UI/UX iyileştirme
- Performance optimization
- Test APK build

---

## 📱 Özellik Listesi (Öncelik Sırasına Göre)

### **TIER 1 - CORE (Mutlaka)**
1. ✅ **Gelişmiş Puanlama** - Kategori bazlı + bonuslar
2. ✅ **POI Sistemi** - 29 Ahlat lokasyonu + check-in
3. ✅ **Rozet Sistemi** - 15 rozet
4. ✅ **Görev Sistemi** - Günlük/haftalık
5. ✅ **Seviye Sistemi** - 1-100 level
6. ✅ **Streak Sistemi** - Ardışık gün bonusu

### **TIER 2 - ENHANCED (Önemli)**
7. ✅ **Sosyal Feed** - Beğeni/yorum/takip
8. ✅ **Liderboard Gelişmiş** - Haftalık/aylık
9. ✅ **Push Notifications** - 8 farklı tetikleyici

### **TIER 3 - NICE TO HAVE (Zaman Kalırsa)**
10. ⏳ Basit kupon sistemi
11. ⏳ Davet/referral sistemi
12. ⏳ Hikaye modu
13. ⏳ Gelişmiş offline mode

---

## 📍 Ahlat POI'ları (29 Nokta)

### **A-Tier (6)** - 20 puan ilk check-in:
- Selçuklu Mezarlığı
- Ulu Camii
- Çifte Kümbet
- Nemrut Krater Gölü
- Van Gölü Sahili
- Kadın Hamamı

### **B-Tier (10)** - 10 puan:
- Harabeşehir, Ahlat Müzesi, Tarihi Çarşı, vb.

### **C-Tier (6)** - 15 puan (gizli bonus):
- Yerel köyler, gizli manzara noktaları

### **İşletmeler (7)** - Restoran/konaklama:
- Ahlat Köfte, Keledoş Restaurant, vb.

**Toplam kazanılabilir POI puanı:** ~415 puan

---

## 🏆 Rozet Sistemi (15 Rozet)

### **Keşif (4):**
- 🥉 Gezgin (10 yer)
- 🥈 Kaşif (25 yer)
- 🥇 Seyyah (50 yer)
- 💎 Ahlat'ın Sefiri (tüm A-Tier)

### **Yemek (3):**
- 🍴 Gurme (5 yemek)
- 👨‍🍳 Şef (10 yemek)
- 🌟 Damak Ustası (tümü)

### **Sosyal (3):**
- 📸 Influencer (100+ beğeni)
- 🔥 Viral (500+ beğeni)
- 👥 Topluluk Lideri (5 davet)

### **Özel (5):**
- 🌅 Gün Doğumu Avcısı
- 🌙 Gece Kuşu
- 📅 Sadık Turist (7 gün streak)
- 🎭 Festival Rozeti
- 🏆 Beta Tester (ilk 100 kullanıcı)

---

## 🎯 Görev Sistemi

### **Günlük (5 görev)** - Her gün 00:00'da reset:
- ☀️ Bir fotoğraf paylaş (+5p)
- 📍 Yeni bir yer keşfet (+10p)
- ❤️ 3 fotoğrafa beğeni (+3p)
- 💬 2 yoruma yanıt (+5p)
- 🎯 Rastgele kategori fotoğrafı (+7p)

### **Haftalık (4 görev)** - Pazartesi reset:
- 🗺️ 5 farklı kategori (+50p)
- 🍽️ 3 farklı restoran (+30p)
- 👥 1 arkadaş davet (+25p)
- 📸 10 fotoğraf paylaş (+40p)

---

## 💯 Puanlama Sistemi

### **Kategori Bazlı:**
| Kategori | Konum | İşletme Tag | Puan |
|----------|-------|-------------|------|
| Tarihi Yer | Ahlat | - | 10 |
| Yemek | Ahlat | ✅ | 15 |
| Yemek | Ahlat | ❌ | 5 |
| Yemek | Dışarı | - | 0.5 |
| Doğa | Ahlat | - | 8 |
| Kültür | Ahlat | - | 7 |

### **Bonus Çarpanlar:**
- 🔍 İlk keşif: +50%
- 🔥 Combo (24h içinde 5+ kategori): 2x
- 🌙 Gece fotoğrafı (18:00-06:00): +25%
- #️⃣ Hashtag (#ahlatseferi + 3 tag): +10p

### **Seviye Sistemi:**
- Lv 1-10: **Turist** (0-500p)
- Lv 11-25: **Gezgin** (501-2000p)
- Lv 26-50: **Kaşif** (2001-5000p)
- Lv 51-75: **Seyyah** (5001-10000p)
- Lv 76-99: **Sefiri** (10001-25000p)
- Lv 100: **Efsane** (25000+p)

---

## 📊 Test Hedefleri (100 Öğrenci)

### **Kullanım Metrikleri:**
- ✅ En az 70 aktif kullanıcı (%70 retention)
- ✅ Ortalama 15+ fotoğraf/kullanıcı
- ✅ Tüm A-Tier POI'lar ziyaret edildi
- ✅ 500+ toplam fotoğraf
- ✅ En az 20 öğrenci 7 gün streak
- ✅ Her rozetten en az 5 kişi kazandı

### **Teknik:**
- ✅ Crash-free rate >95%
- ✅ Tüm core özellikler çalışıyor
- ✅ Push notification %80+ açık

### **Feedback:**
- ✅ Ortalama rating >4/5
- ✅ En az 50 anlamlı feedback

---

## 🛠️ Teknoloji Stack

### **Frontend:**
- React Native + Expo
- TypeScript
- MapBox SDK (harita)
- Expo Notifications (push)
- Redux/Zustand (state)

### **Backend:**
- Firebase Auth
- Firestore Database
- Firebase Storage
- Firebase Cloud Functions (cron jobs)
- Firebase Cloud Messaging

### **Maliyet:**
- **%100 ÜCRETSIZ** (Firebase Free Tier)
- Auth: 10K kullanıcı/ay ✅
- Firestore: 50K reads/day ✅
- Storage: 5GB ✅
- Cloud Functions: 125K invocations/month ✅

---

## 📂 Dökümanlar

### **1. SEFERI_PILOT_MVP_PLAN.md**
- Detaylı 8 haftalık roadmap
- Tüm özellikler (TIER 1-3)
- Test stratejisi
- Başarı kriterleri

### **2. AHLAT_POI_DATABASE.md**
- 29 Ahlat POI'sı (koordinatlar)
- A/B/C tier sınıflandırması
- İşletme bilgileri
- Rota önerileri
- JSON format

### **3. DATABASE_SCHEMA.md**
- 14 Firestore collection
- Detaylı interface tanımları
- Security rules
- Cloud Functions
- Index stratejisi

### **4. SEFERI_CONCEPT.md** (Mevcut)
- Orijinal konsept
- 70+ özellik listesi
- Uzun vadeli vizyon

---

## 🚦 Bir Sonraki Adımlar

### **Hemen Yapılacaklar:**
1. ✅ Planlamayı incele ve onayla
2. ✅ Firebase projesi kur
3. ✅ MapBox hesabı oluştur
4. ✅ Test grubu WhatsApp/Telegram kur

### **Development Başlamadan:**
1. Git branch oluştur (`pilot-mvp`)
2. POI database'i Firestore'a yükle
3. Rozet icon'larını hazırla
4. Mevcut kodu refactor et

### **8 Hafta Sonra:**
1. APK build et
2. 10-20 kişi ile beta test
3. Büyük bugları düzelt
4. 100 öğrenciye dağıt

---

## 🎯 Başarı Tanımı

### **Pilot başarılı sayılır eğer:**
- ✅ %70+ kullanıcı aktif kalırsa
- ✅ Ortalama 15+ fotoğraf/kişi
- ✅ Tüm A-Tier POI'lar ziyaret edilirse
- ✅ Rating >4/5
- ✅ Kritik bug listesi oluşursa
- ✅ 50+ kullanılabilir feedback alınırsa

### **Başarısız sayılır eğer:**
- ❌ %50'den az kullanıcı aktif kalırsa
- ❌ Crash rate >10%
- ❌ Temel özellikler çalışmazsa
- ❌ Öğrenciler "sıkıcı" derse

---

## 📅 Timeline Özeti

```
┌─────────────────────────────────────────────────────┐
│                 8 HAFTALIK PLAN                     │
├─────────────────────────────────────────────────────┤
│ Hafta 1-2 │ Core Gamification (Puan, Seviye, Streak)│
│ Hafta 3-4 │ POI & Rozet (Harita, Check-in, Badges)  │
│ Hafta 5   │ Görev Sistemi (Daily/Weekly Quests)     │
│ Hafta 6   │ Sosyal Feed (Like, Comment, Follow)     │
│ Hafta 7   │ Liderboard + Push Notifications         │
│ Hafta 8   │ Polish + Bug Fix + APK Build            │
├─────────────────────────────────────────────────────┤
│           2-4 HAFTALIK PILOT TEST                   │
├─────────────────────────────────────────────────────┤
│ Test      │ 100 Öğrenci + Ahlat Gerçek Kullanım     │
│ Feedback  │ Google Forms + WhatsApp Grubu           │
│ Analiz    │ Metrikler + Bug Listesi + İyileştirmeler│
└─────────────────────────────────────────────────────┘

TOPLAM: ~12 Hafta (3 Ay)
```

---

## 💡 Sonraki Adım

**Kodu yazmaya başlayalım mı?**

Veya önce:
- [ ] Planı gözden geçir
- [ ] Özellik listesini düzenle
- [ ] Timeline'ı değiştir
- [ ] Başka bir şey?

---

**Hazırlayan:** Claude (AI Assistant)
**Tarih:** 2025-11-17
**Versiyon:** Pilot MVP v1.0
**Durum:** ✅ Planlama Tamamlandı - Onay Bekleniyor
