# TÜBİTAK 1511 PROJE ÖNERİSİ

## SEFERİ: Destinasyon Pazarlaması için Oyunlaştırma Tabanlı Mobil Turizm Platformu

---

## 📋 PROJE BİLGİLERİ

**Program:** TÜBİTAK 1511 - Öncelikli Alanlar Araştırma Teknoloji Geliştirme ve Yenilik Projeleri

**Proje Süresi:** 12 Ay

**Öncelikli Alan:** Bilgi ve İletişim Teknolojileri / Turizm Teknolojileri

**TRL Seviyesi:** Başlangıç TRL 3 → Hedef TRL 7

**Proje Yürütücüsü:** [Öğretim Üyesi Adı]

**Kurum:** [Üniversite Adı]

---

## 1. PROJE ÖZETİ (EXECUTIVE SUMMARY)

### 1.1 Problem Tanımı

Türkiye'de kültürel ve tarihi öneme sahip birçok destinasyon, yetersiz dijital tanıtım ve ziyaretçi etkileşimi eksikliği nedeniyle potansiyelinin altında kalmaktadır. Özellikle:

- **Düşük ziyaretçi etkileşimi:** Turistler destinasyonları yüzeysel gezer, derinlemesine keşfetmez
- **Dijital eksiklik:** Yerel işletmeler dijital pazarlama araçlarından yoksun
- **Veri yokluğu:** Turist davranış verileri toplanmıyor, analiz edilmiyor
- **Motivasyon eksikliği:** Genç kuşak için destinasyonlar "sıkıcı" algılanıyor
- **Ekonomik sızıntı:** Turist harcamaları yerel ekonomiye yeterince katkı sağlamıyor

**Örnek Olay:** Ahlat (Bitlis), UNESCO Dünya Mirası geçici listesinde olmasına rağmen yıllık sadece ~100.000 turist alıyor. Selçuklu Mezarlığı gibi benzersiz varlıklara sahip olmasına rağmen ortalama ziyaret süresi 2-3 saat ile sınırlı.

### 1.2 Önerilen Çözüm

**SEFERİ**, destinasyon keşfini oyunlaştırarak turistleri motive eden, yerel ekonomiyi dijital araçlarla güçlendiren ve değerli turist davranış verileri toplayan yenilikçi bir mobil platformdur.

**Temel Yenilikler:**
1. **Hyper-local Gamification Engine:** GPS tabanlı konumlandırma ile bölgeye özel puan, rozet ve görev sistemleri
2. **Gerçek Ekonomik Entegrasyon:** Sanal puanların yerel işletmelerde kupon/indirime dönüşmesi
3. **AI-Powered Content Recognition:** Fotoğraf analizi ile otomatik kategori tanıma
4. **Behavioral Analytics Dashboard:** Turist hareketlerinin ısı haritası ve davranış analizi
5. **Offline-First Architecture:** İnternet olmadan da çalışabilme

### 1.3 Proje Hedefleri

**Teknolojik Hedefler:**
- ✅ Çalışan MVP geliştirmek (TRL 3 → 6)
- ✅ 100 kullanıcı ile pilot test (TRL 6 → 7)
- ✅ AI görüntü tanıma modeli (yemek + anıt tanıma)
- ✅ Scalable cloud-based altyapı
- ✅ Patent/faydalı model başvurusu

**Bilimsel Hedefler:**
- ✅ Gamification'ın turist davranışına etkisini ölçmek
- ✅ Turist hareket ve tercih verisi toplamak
- ✅ 2 adet SCI/SCI-E makale yayınlamak
- ✅ 1 adet uluslararası konferans sunumu

**Sosyo-Ekonomik Hedefler:**
- ✅ Yerel işletmelere dijital araç sağlamak
- ✅ Ahlat'ta turist etkileşimini %50 artırmak
- ✅ Ortalama ziyaret süresini 2-3 saatten 6+ saate çıkarmak
- ✅ Yerel ekonomiye ölçülebilir katkı (~500K TL pilot dönemde)

### 1.4 Beklenen Çıktılar

**Somut Çıktılar:**
1. **Çalışan Mobil Uygulama** (Android APK, TRL 7)
2. **AI Modelleri** (Yemek tanıma + Anıt tanıma)
3. **Yerel İşletme Paneli** (Web dashboard)
4. **Analytics Platform** (Turist davranış analizi)
5. **POI Database** (Ahlat + 10 şehir için hazır şablon)
6. **29 Ahlat POI** (Koordinat + metadata)
7. **100 Kullanıcı Pilot Test Verileri** (500+ fotoğraf, GPS, engagement)

**Fikri Mülkiyet:**
8. **1 Patent/Faydalı Model Başvurusu** (Gamification engine)
9. **Açık Kaynak Kütüphane** (React Native gamification framework)

**Akademik Çıktılar:**
10. **2 Makale** (1 SCI-E, 1 Ulusal)
11. **1 Konferans Sunumu** (Uluslararası)
12. **1 Yüksek Lisans Tezi** (Öğrenci varsa)

**Ticarileşme:**
13. **Ticarileşme Planı** (SaaS model)
14. **Potansiyel Müşteri Listesi** (Belediyeler, turizm ajansları)
15. **Pilot Başarı Raporu** (Vaka çalışması)

---

## 2. LİTERATÜR TARAMASI VE TEKNOLOJİK DURUM

### 2.1 Gamification in Tourism - Güncel Literatür

**2.1.1 Teorik Altyapı**

Gamification, oyun mekaniklerinin oyun dışı bağlamlarda kullanılması olarak tanımlanır (Deterding et al., 2011). Turizm sektöründe gamification uygulamaları son 10 yılda hızla artmıştır:

- **Xu, Buhalis & Weber (2017):** "Serious games and the gamification of tourism" (*Tourism Management*)
  - Ciddi oyunlar ve oyunlaştırmanın turizmdeki kullanım alanlarını kavramsal olarak çerçeveler; destinasyon pazarlaması, turist deneyimi ve çalışan eğitimi başlıca uygulama alanlarıdır.

- **Sigala (2015):** "The application and impact of gamification funware on trip planning and experiences: the case of TripAdvisor's funware"
  - TripAdvisor'daki puan/rozet mekaniklerinin gezi planlama ve deneyim üzerindeki etkisini inceleyen vaka çalışmasıdır.

- **Negrusa et al. (2015):** "Exploring Gamification Techniques and Applications for Sustainable Tourism"
  - Oyunlaştırma tekniklerinin sürdürülebilir turizm hedefleri için nasıl kullanılabileceğini derler.

- **Sistematik derlemeler:** Turizm ve konaklama alanında oyunlaştırma üzerine 2011-2019 arasındaki 36 çalışmayı inceleyen ilk sistematik derleme, beş tema tanımlar: eğlenerek öğrenme (edutainment), sürdürülebilir davranış, etkileşim faktörleri, hizmet sağlayıcı içeriği ve kullanıcı yorumları (Pasca et al., 2021). Scopus'tan 64 makaleyi kapsayan daha yeni bir derleme ise alanın hızla büyüdüğünü, ancak **deneysel araştırmaların eksik kaldığını** vurgulamakta ve gelecekte deneysel tasarımlar ile makine öğrenmesi yöntemlerinin kullanılmasını önermektedir (Pradhan et al., 2023).

**2.1.2 Self-Determination Theory (SDT)**

Ryan & Deci (2000) tarafından geliştirilen SDT, gamification'ın turizmdeki başarısını açıklayan temel teoridir:
- **Autonomy (Özerklik):** Kullanıcı kendi keşif rotasını seçer
- **Competence (Yeterlilik):** Rozetler ve seviyeler başarı hissi verir
- **Relatedness (İlişkili olma):** Sosyal feed ve liderlik tabloları

**2.1.3 Ampirik Kanıtlar: Oyunlaştırma Turist Davranışını Değiştiriyor mu?**

*(a) Konum tabanlı teşvikler turist hareketini yönlendirebilir.* Davranışın doğrudan ölçüldüğü saha deneyleri, SEFERİ'nin temel varsayımını desteklemektedir:
- Bir hayvanat bahçesinde gerçek ziyaretçilerle (n = 2.618 ve n = 970) yürütülen iki saha deneyinde, konum tabanlı mobil mesajlarla sunulan ödüllerin ziyaretçileri hedef noktalara yönlendirdiği iBeacon verileriyle nedensel olarak gösterilmiştir (Högberg et al., 2020).
- Palermo'da GPS ile izlenen kruvaziyer yolcularında, teşviklerin turistlerin mekânsal-zamansal hareketini açık ve anlamlı biçimde değiştirdiği bulunmuştur (Shoval et al., 2020).
- Hollanda'da randomize 2×2 bir deneyde, az ziyaret edilen noktaları öne çıkaran mobil bilgilendirme alan turistler bu noktaların çevresinde anlamlı olarak daha fazla hareket etmiş ve tatil memnuniyetleri olumsuz etkilenmemiştir (Mitas et al., 2023). Bu bulgu, SEFERİ'nin ziyaretçileri Selçuklu Mezarlığı dışındaki B/C sınıfı noktalara dağıtma hedefi için doğrudan emsaldir.
- Kyoto'da 33 turistle yapılan bir saha çalışmasında, puan tabanlı check-in görevleri turist davranışını değiştirmiştir (Kawanaka et al., 2020).

*(b) Kültürel miras ve az bilinen destinasyonlarda deneyim ve bağlılık.*
- Güney Kore'de azalan nüfuslu bölgelerde artırılmış gerçeklik tabanlı oyunlaştırma deneyiminin yere bağlılığı ve destinasyon bilgisini artırdığı, bunların da tekrar ziyaret niyetini olumlu etkilediği bulunmuştur (Jo & Shin, 2025). Bu çalışma, Ahlat gibi turizm potansiyeli yeterince değerlendirilmemiş destinasyonlar için en yakın emsaldir.
- Türkiye'den bir emsal olarak, Antalya Kaleiçi'nde kontrol gruplu yarı-deneysel desenle yürütülen çalışmada artırılmış gerçeklik kullanımının turist deneyimini, yere bağlılığı ve memnuniyeti anlamlı biçimde iyileştirdiği gösterilmiştir (Kılıçarslan & Albayrak, 2026).
- Tayland'da bir müzede oyunlaştırılmış karma gerçeklik sürümü kullanan ziyaretçilerin toplam etkileşim süresi, oyunlaştırılmamış sürüme göre yaklaşık %30 daha yüksek bulunmuştur (Tongpaeng et al., 2024). Chiang Mai tarihi kentinde 25 kültürel noktayı kapsayan "oyna-kazan" uygulaması da katılım ve memnuniyeti artırmıştır (Thinnukool et al., 2025).
- Porto'da 271 turistle yapılan çalışmaya göre derin duygular destinasyonda daha uzun zaman gerektirir ve kalış süresi duyguların destinasyon imajına etkisini güçlendirir (Ferreira et al., 2025). Bu bulgu, Ahlat'taki kısa (2-3 saatlik) ziyaret süresinin destinasyon imajını ve tavsiye davranışını neden sınırladığına teorik dayanak sağlar.
- Destinasyonla ilişkili mobil oyunlarda ziyaret niyetini en güçlü biçimde *oynama motivasyonu* ve *oynama kolaylığı* belirlemektedir (Ting et al., 2025).

*(c) Yerel işletmelere etki.* Pokémon GO ile ilişkilendirilen restoranların çevrimiçi müşteri etkileşiminin ve algısının arttığı bulunmuştur (Pamuru et al., 2021). Ancak fark-içinde-fark analizleri bu etkinin kısa vadede güçlü olduğunu, oyunun popülerliği azaldıkça söndüğünü göstermektedir (Zhang & Zhang, 2018). Bu çalışmalar çevrimiçi etkileşimi ölçmekte, **doğrudan harcama verisi sunmamaktadır**.

*(d) Oyunlaştırmanın sınırları ve riskleri.* Literatür, tasarımın yanlış kurgulanması durumunda olumsuz etkiler de raporlamaktadır:
- Kültürel miras alanlarında yapılan bir saha deneyinde (n = 331) oyunlaştırılmış uygulama bilgi kazanımını güçlü biçimde artırmış, ancak keyif ve akış deneyimini azaltmış ve sadakat üzerinde **olumsuz dolaylı etki** yaratmıştır (Lee, 2019).
- Kyoto çalışmasında katılımcıların check-in görevlerini gezinin kendisinin önüne koyduğu gözlenmiştir (Kawanaka et al., 2020).
- 1.203 katılımcılı faktöriyel bir saha deneyinde, içsel motivasyonu tetikleyen keşif mekaniğinin (gizli noktalardan damga toplama) turistin psikolojik çıktıları üzerinde dışsal ödüllerden (hediye) daha belirleyici olduğu bulunmuştur (Kim et al., 2021).

*SEFERİ tasarımına yansımaları:* (i) Puanlar gezi deneyimini gölgelememeli, keşfi desteklemelidir. Bu nedenle rozet ve görevler içsel keşif motivasyonu üzerine kurulacak, kuponlar tamamlayıcı dışsal ödül olarak kullanılacaktır. (ii) Kullanım kolaylığı eğlenceden önce gelmelidir. (iii) Etkinin zamanla sönmesine karşı sezonluk görevler ve içerik yenilemesi planlanmalıdır.

**2.1.4 Kullanıcı Tarafından Üretilen Fotoğraflar ve Destinasyon İmajı**

- Turizm ve konaklama alanında kullanıcı tarafından üretilen fotoğraflara ilişkin araştırmalar hızla büyüyen bir alan oluşturmuş ve sistematik olarak derlenmiştir (Li et al., 2023).
- Turist fotoğrafları, destinasyon yönetim örgütlerinin (DMO) içeriğinden daha inandırıcı ve yaygın kabul edilmektedir. Yapay zekâ ile 193 ülkeden 283.912 Flickr fotoğrafı analiz edilerek destinasyon imajı ölçeklenebilir biçimde haritalanmıştır (Taecharungroj & Mathayomchan, 2020). Peru üzerine yapılan klasik karşılaştırma ise DMO ve turist fotoğraflarının yansıttığı imajlar arasında sistematik farklar olduğunu göstermiştir (Stepchenkova & Zhan, 2013).
- Saha ve deney çalışmaları, elektronik ağızdan ağıza iletişimin turistlerin ziyaret kararlarını büyük ölçüde görsel ipuçları ve kullanıcı fotoğrafları üzerinden etkilediğini göstermektedir (Filieri et al., 2021).
- Öte yandan dört kontrollü deneyde (N = 1.282) profesyonel estetikteki fotoğrafların amatör fotoğraflara göre daha yüksek görsel çekicilik ve rezervasyon niyeti yarattığı bulunmuştur (Marder et al., 2019). En etkili modelin ikisini birleştiren **ortak yaratım** (co-creation) olduğu, yani DMO'nun turist fotoğraflarını stratejik olarak seçip yaydığı bir süreç olduğu gösterilmiştir (Zhao & Agyeiwaah, 2024).
- Coğrafi etiketli fotoğraflar, resmî istatistiklerde yer almayan ikinci derece cazibe noktalarındaki ziyaret örüntülerini ortaya çıkarmak için kullanılabilmektedir (Leung et al., 2017).
- Küçük ve kırsal destinasyonlardaki yerel işletmeler sosyal medyanın erişim avantajını kabul etmekle birlikte zaman, beceri ve etkiyi ölçme konusunda engellerle karşılaşmaktadır (Vlasich et al., 2022). Bir kruvaziyer limanı örneğinde çevrimiçi puanlamada üst sırada yer alan işletmelerin anlamlı ölçüde daha fazla turist ziyareti aldığı bulunmuştur (Gabe, 2020).

*SEFERİ'ye yansıması:* Uygulama içinde toplanacak coğrafi etiketli ve kategorilere ayrılmış fotoğraflar, Ahlat'ın *algılanan imajını* ölçmeye yarayan bir araştırma veri seti oluşturacaktır. Seçilen fotoğraflar DMO ve belediye kanallarında paylaşılarak ortak yaratım modeli uygulanacaktır. İşletme etiketleme ve kupon kullanım verisi ise yerel işletmelerin yaşadığı "etkiyi ölçememe" sorununa doğrudan çözüm sunar.

**2.1.5 Literatürdeki Boşluk ve SEFERİ'nin Konumu**

Mevcut literatür üç önemli boşluk içermektedir:
1. **Niyet ile davranış arasındaki boşluk:** Çalışmaların büyük kısmı ziyaret veya tekrar ziyaret *niyetini* anket ile ölçmektedir. Kalış süresi, mekânsal dağılım ve yerel harcama gibi *gerçekleşen davranışı* ölçen saha çalışmaları azdır (Pradhan et al., 2023).
2. **Ekonomik etki kanıtının zayıflığı:** Yerel işletmelere etkiyi inceleyen çalışmalar çevrimiçi yorum ve itibar göstergeleriyle sınırlıdır. Kupon kullanımı veya satış gibi doğrudan ekonomik veriler neredeyse hiç kullanılmamıştır (Pamuru et al., 2021; Zhang & Zhang, 2018).
3. **Bağlam boşluğu:** Kanıtların çoğu büyük kentler, müzeler veya tema parklarından gelmektedir. Kırsal ve az bilinen kültürel miras destinasyonlarında konum tabanlı oyunlaştırmanın bütüncül (davranış + deneyim + ekonomi) değerlendirmesi sınırlıdır. Türkiye'de bu alandaki çalışmalar ise artırılmış gerçeklik deneyimiyle sınırlı kalmıştır (Kılıçarslan & Albayrak, 2026).

SEFERİ, uygulama içi GPS, check-in, fotoğraf ve kupon kullanım kayıtlarını kontrol grubu karşılaştırmasıyla birleştirerek bu üç boşluğu aynı anda ele alan, Türkiye'deki ilk hiper-yerel oyunlaştırma saha çalışmalarından biri olmayı hedeflemektedir.

### 2.2 Mevcut Uygulamalar ve Eksikleri

**2.2.1 Uluslararası Örnekler**

| Uygulama | Özellikler | Eksiklikler |
|----------|------------|-------------|
| **Geocaching** (2000-) | GPS treasure hunt, 3M+ kullanıcı | Turizm odaklı değil, yerel ekonomi entegrasyonu yok |
| **Foursquare/Swarm** (2009-) | Check-in, mayorluk rozetleri | Gamification yüzeysel, içerik kullanıcı oluşturmuyor |
| **Pokémon GO** (2016-) | AR + GPS, 1B+ indirme | Eğlence odaklı, kültürel/tarihi değer yok |
| **Detour (2015-2019)** | Audio tours + storylines | Gamification yok, Kapandı (sürdürülebilirlik sorunu) |
| **Go City/CityPass** | Şehir geçiş kartı + indirimler | Dijital değil, gamification yok |

**2.2.2 Türkiye Örnekleri**

Türkiye'de destinasyon gamification alanında **ciddi bir boşluk** var:
- **VisitTurkey (Kültür Bakanlığı):** Sadece bilgilendirme, etkileşim yok
- **İBB CepTrafik, İSPARK vb.:** Gamification var ama turizm dışı
- **Muze+ (Özel):** Müze QR kod sistemi, gamification minimal

**Akademik Çalışmalar:**
- **Özel & Kozak (2012):** Türkiye'de turizm teknolojileri kullanımı düşük
- **Çeltek (2010):** Destinasyon pazarlamasında dijital araçların önemi
- **Kılıçarslan & Albayrak (2026):** Antalya Kaleiçi'nde artırılmış gerçekliğin miras turizmi deneyimine etkisini ölçen yarı-deneysel çalışma. Oyunlaştırma ve yerel ekonomi entegrasyonu kapsam dışında.
- **Ancak:** Yapılan taramada, Türkiye'de hiper-yerel oyunlaştırmayı davranış ve ekonomik veriyle değerlendiren bir AR-GE çalışmasına **rastlanmamıştır**

### 2.3 Özgünlük ve Yenilikçi Yönler

**SEFERİ'nin özgün katkıları:**

1. **Hyper-local Focus:**
   - ❌ Genel turizm uygulamaları global/genel odaklı
   - ✅ SEFERİ: Tek destinasyona özel derin özelleştirme

2. **Gerçek Ekonomik Entegrasyon:**
   - ❌ Mevcut uygulamalar: Sanal ödüller, reel ekonomiye sıfır katkı
   - ✅ SEFERİ: Sanal puan → gerçek kupon/indirim (ölçülebilir ekonomik etki)

3. **Behavioral Data Analytics:**
   - ❌ Mevcut: Sadece check-in sayısı
   - ✅ SEFERİ: GPS hareketleri, fotoğraf tercihleri, zaman analizi, ısı haritası

4. **Offline-First Architecture:**
   - ❌ Mevcut: İnternet zorunlu
   - ✅ SEFERİ: İnternet olmadan çalışır, sonra sync eder

5. **AI Content Recognition:**
   - ❌ Mevcut: Manuel kategorileme
   - ✅ SEFERİ: Fotoğraftan otomatik yemek/anıt tanıma

6. **Pilot-to-Scale Model:**
   - ❌ Mevcut: Tek şehir veya tüm Türkiye (middle ground yok)
   - ✅ SEFERİ: Ahlat pilot → template ile tüm Türkiye

### 2.4 Teknolojik Alt Yapı

**2.4.1 Mobile Gamification Frameworks**

Literatürde mobil gamification için çeşitli framework'ler önerilmiştir:

- **MDA Framework (Hunicke et al., 2004):**
  - Mechanics, Dynamics, Aesthetics
  - SEFERİ'de kullanılacak

- **Octalysis Framework (Chou, 2015):**
  - 8 core drive analizi
  - Rozet/puan tasarımında referans

**2.4.2 AI in Tourism**

- **Buhalis & Sinarta (2019):** "Real-time co-creation and nowness service: lessons from tourism and hospitality"
  - AI'ın kişiselleştirilmiş turizm deneyimindeki rolü

- **Image Recognition in Tourism:**
  - **Li et al. (2018):** Deep learning ile turist fotoğraflarından destinasyon analizi
  - **SEFERİ katkısı:** Türk mutfağı ve Selçuklu mimarisi için özel model

### 2.5 Teknoloji Hazırlık Seviyesi (TRL)

**Mevcut Durum (TRL 3):**
- Konsept kanıtlandı (proof of concept)
- Basit prototip mevcut
- Literatür taraması tamamlandı

**Hedef (TRL 7 - Proje Sonunda):**
- Operasyonel ortamda çalışan sistem
- 100 kullanıcı ile gerçek pilot test tamamlandı
- Teknoloji ticarileşmeye hazır

---

## 3. PROJE AMACI VE HEDEFLERİ

### 3.1 Genel Amaç

**Destinasyon turizmi için ölçeklenebilir, gamification-tabanlı mobil platform geliştirmek ve pilot uygulama ile etkinliğini kanıtlamak.**

### 3.2 Özel Amaçlar

**A. Teknolojik Amaçlar:**

1. **Gamification Engine Geliştirmek:**
   - Puan, rozet, görev, seviye sistemleri
   - Real-time liderlik tablosu
   - Streak (ardışık gün) mekaniği

2. **GPS-Based Location Services:**
   - POI (Points of Interest) check-in sistemi
   - Geo-fencing (yakınlık bildirimleri)
   - Offline GPS tracking

3. **AI Görüntü Tanıma:**
   - Yemek kategorisi tanıma (Türk mutfağı dataset)
   - Tarihi yapı tanıma (Selçuklu mimarisi)
   - Fotoğraf kalite kontrolü

4. **Sosyal Etkileşim Sistemi:**
   - Feed, beğeni, yorum
   - Takip mekaniği
   - Viral content algoritması

5. **Analytics Dashboard:**
   - Turist hareketleri ısı haritası
   - Engagement metrikleri
   - İşletme performans göstergeleri

**B. Bilimsel Amaçlar:**

1. **Davranışsal Araştırma:**
   - Gamification'ın turist davranışına etkisini ölçmek
   - Self-Determination Theory doğrulaması
   - A/B testing ile optimal mekanikler bulmak

2. **Veri Bilimi:**
   - Turist hareket kalıpları (movement patterns)
   - Fotoğraf tercihlerinden destinasyon analizi
   - Zaman serisi analizi (ziyaret saatleri)

3. **Makine Öğrenmesi:**
   - Transfer learning ile Türk mutfağı tanıma
   - Collaborative filtering ile POI önerisi

**C. Sosyo-Ekonomik Amaçlar:**

1. **Yerel Ekonomiye Katkı:**
   - Turist harcamalarını yerel işletmelere yönlendirmek
   - Dijital araçlarla işletmeleri güçlendirmek
   - Ölçülebilir ekonomik etki (kupon kullanımı tracking)

2. **Destinasyon Pazarlaması:**
   - Ahlat'ın dijital görünürlüğünü artırmak
   - Sosyal medya paylaşımlarını teşvik etmek
   - Ortalama ziyaret süresini uzatmak

3. **Sürdürülebilir Turizm:**
   - Over-tourism riskini azaltmak (gizli yerlere yönlendirme)
   - Kültürel mirası koruma bilincini artırmak

### 3.3 Ölçülebilir Hedefler (12 Ay)

| # | Hedef | Başlangıç | Hedef Değer | Metrik |
|---|-------|-----------|-------------|--------|
| 1 | Aktif Kullanıcı | 0 | 100 | Pilot test |
| 2 | Toplam Fotoğraf | 0 | 500+ | App analytics |
| 3 | POI Ziyareti | 0 | Tüm A-Tier (6) | Check-in data |
| 4 | Ortalama Ziyaret Süresi | 2-3 saat | 6+ saat | Survey + GPS |
| 5 | Retention Rate (30 gün) | - | >60% | User analytics |
| 6 | Yerel İşletme Ortağı | 0 | 10+ | Anlaşma sayısı |
| 7 | Kupon Kullanımı | 0 | 200+ | Transaction data |
| 8 | Ekonomik Etki | 0 | ~500K TL | İşletme reports |
| 9 | Makale Yayını | 0 | 2 | Pubmed/WoS |
| 10 | Patent/Faydalı Model | 0 | 1 başvuru | TPE |
| 11 | TRL Seviyesi | 3 | 7 | Pilot başarısı |
| 12 | Crash-free Rate | - | >95% | Firebase |

---

## 4. YÖNTEM VE İŞ PLANI

### 4.1 Metodoloji

**4.1.1 Yazılım Geliştirme Metodolojisi: Agile/Scrum**

- **Sprint Süresi:** 2 hafta
- **Toplam Sprint:** 24 sprint (12 ay)
- **Daily Standup:** Ekip günlük 15 dk
- **Sprint Review:** Her 2 haftada demo
- **Retrospective:** Sürekli iyileştirme

**4.1.2 Araştırma Tasarımı: Quasi-Experimental Design**

- **Deney Grubu:** SEFERİ kullanan 100 öğrenci (Ahlat)
- **Kontrol Grubu:** Geleneksel turizm yapan 50 turist (survey)
- **Bağımsız Değişkenler:** Gamification mekanikleri (puan, rozet, görev)
- **Bağımlı Değişkenler:**
  - Ziyaret süresi
  - POI sayısı
  - Sosyal paylaşım
  - Memnuniyet skoru
  - Harcama miktarı

**4.1.3 Veri Toplama**

1. **Otomatik (App İçi):**
   - GPS koordinatları (her 30 saniye)
   - Fotoğraf metadata (timestamp, konum, kategori)
   - Engagement (beğeni, yorum, süre)
   - Görev tamamlama oranları

2. **Manuel (Survey):**
   - Pre-test: Demografik + beklentiler
   - Post-test: Memnuniyet + öneriler
   - Weekly: Haftalık deneyim anketi

3. **İşletmeler:**
   - Kupon kullanım raporları
   - Satış artışı (karşılaştırmalı)

**4.1.4 Veri Analizi**

- **İstatistiksel:** SPSS/R (t-test, ANOVA, regression)
- **Machine Learning:** Python (scikit-learn, TensorFlow)
- **Görselleştirme:** Tableau/PowerBI (dashboard)

### 4.2 İş Paketleri (Work Packages)

#### **WP1: Proje Yönetimi ve Koordinasyon** (Ay 1-12)
**Sorumlu:** Proje Yürütücüsü

**Görevler:**
- Ekip toplantıları organizasyonu
- Bütçe takibi
- Raporlama (ara rapor, final rapor)
- Paydaş yönetimi (Ahlat Belediyesi, işletmeler)

**Çıktılar:**
- Aylık ilerleme raporları
- Ara rapor (Ay 6)
- Final rapor (Ay 12)

---

#### **WP2: Gereksinim Analizi ve Sistem Tasarımı** (Ay 1-2)
**Sorumlu:** Proje Yürütücüsü + Programcı

**Görevler:**
1. **Literatür taraması:** Gamification best practices
2. **Paydaş analizi:** Ahlat Belediyesi, yerel işletmeler, tur operatörleri
3. **Kullanıcı araştırması:** Focus group (30 kişi)
4. **Teknik gereksinimler:** Functional/non-functional requirements
5. **Sistem mimarisi:** ER diagram, class diagram, sequence diagram
6. **UI/UX tasarımı:** Wireframe + mockup (Figma)
7. **POI Database:** 29 Ahlat POI araştırması (koordinat, fotoğraf, metadata)

**Çıktılar:**
- Gereksinim dokümanı (SRS)
- Sistem tasarım dokümanı (SDD)
- UI/UX prototip
- POI database (Excel/JSON)

**Kilometre Taşı 1 (Ay 2):** Tasarım onayı

---

#### **WP3: Core Platform Geliştirme** (Ay 2-5)
**Sorumlu:** Bilgisayar Programcısı

**Görevler:**

**Sprint 1-2 (Ay 2-3): Altyapı**
- Firebase projesi kurulumu
- React Native + Expo setup
- Authentication (email/password)
- Database schema (Firestore collections)
- Cloud Storage (fotoğraf yükleme)

**Sprint 3-4 (Ay 3-4): Core Gamification**
- Fotoğraf çekme + GPS konum
- Kategori bazlı puanlama
- Seviye sistemi
- Streak (ardışık gün) sistemi
- Kullanıcı profili

**Sprint 5-6 (Ay 4-5): POI ve Rozet**
- POI database entegrasyonu
- Harita görünümü (MapBox)
- Check-in mekaniği (GPS + QR)
- Rozet sistemi (15 rozet)
- Rozet unlock animasyonları

**Çıktılar:**
- Çalışan MVP (Android APK)
- Unit test coverage >70%
- Git repository (GitHub)

**Kilometre Taşı 2 (Ay 5):** MVP Alpha Release

---

#### **WP4: İleri Özellikler** (Ay 5-7)
**Sorumlu:** Bilgisayar Programcısı

**Sprint 7-8 (Ay 5-6): Görev Sistemi**
- Günlük görevler (5 adet)
- Haftalık görevler (4 adet)
- Progress tracking
- Cloud Functions (daily/weekly reset)

**Sprint 9-10 (Ay 6-7): Sosyal Feed**
- Feed UI (Instagram-like)
- Beğeni/yorum sistemi
- Takip mekaniği
- Push notifications (Firebase Cloud Messaging)

**Sprint 11-12 (Ay 7): Liderboard ve Analytics**
- Haftalık/aylık liderlik
- Geo-fence (yakınlık bildirimleri)
- İşletme paneli (basit web dashboard)
- Analytics dashboard (admin)

**Çıktılar:**
- Feature-complete uygulama
- Web admin paneli
- Test raporu

**Kilometre Taşı 3 (Ay 7):** Beta Release

---

#### **WP5: AI Modeli Geliştirme** (Ay 4-8)
**Sorumlu:** Proje Yürütücüsü (veya AI Uzmanı - danışman)

**Görevler:**

**Ay 4-5: Dataset Hazırlama**
- Türk yemekleri dataset (10 kategori, 1000+ görsel)
  - Ahlat Köftesi, Keledoş, İşkembe, Kavut, vb.
- Selçuklu mimarisi dataset (5 kategori, 500+ görsel)
  - Kümbet, Cami, Hamam, Mezar taşı, Kale

**Ay 6-7: Model Eğitimi**
- Transfer learning (MobileNetV2 base)
- Data augmentation
- Train/validation/test split (70/15/15)
- Hyperparameter tuning

**Ay 7-8: Entegrasyon ve Test**
- TensorFlow Lite modele dönüştürme
- React Native entegrasyonu
- On-device inference testi
- Accuracy/latency optimization

**Çıktılar:**
- Yemek tanıma modeli (Accuracy >85%)
- Anıt tanıma modeli (Accuracy >80%)
- Model dokümanı
- 1 makale (AI in tourism)

**Kilometre Taşı 4 (Ay 8):** AI modelleri entegre edildi

---

#### **WP6: Pilot Test - Faz 1 (100 Öğrenci)** (Ay 6-7)
**Sorumlu:** Proje Yürütücüsü

**Görevler:**

**Ay 6: Hazırlık**
- Öğrenci recruitment (100 kişi)
- İşletme ortaklıkları (10 işletme)
- QR kod basımı (işletmeler için)
- Onboarding dokümanı hazırlama
- WhatsApp/Telegram grup oluşturma
- Pre-test survey

**Ay 6-7: Aktif Test (4 hafta)**
- APK dağıtımı
- Onboarding session (2 saat eğitim)
- Günlük monitoring
- Haftalık survey
- Bug fixing (hotfix releases)

**Ay 7: Analiz**
- Veri toplama (Firebase export)
- İstatistiksel analiz (SPSS)
- Feedback kategorileme
- Bug priority listesi

**Çıktılar:**
- Pilot test raporu
- 100 kullanıcı verisi (500+ fotoğraf, GPS)
- Kullanıcı memnuniyet anketi sonuçları
- İşletme feedback raporu

**Kilometre Taşı 5 (Ay 7):** Pilot test tamamlandı

---

#### **WP7: İyileştirme ve Optimizasyon** (Ay 8-9)
**Sorumlu:** Bilgisayar Programcısı

**Görevler:**
- Kritik bug fix
- UX problemleri çözme
- Performance optimization
- Offline mode iyileştirme
- Security audit
- Code refactoring

**Çıktılar:**
- v1.0 Release (Production-ready)
- Performance test raporu
- Security audit raporu

**Kilometre Taşı 6 (Ay 9):** Production release

---

#### **WP8: Genişletilmiş Test ve Ölçeklendirme** (Ay 9-10)
**Sorumlu:** Proje Yürütücüsü

**Görevler:**

**Ay 9-10: Genişletilmiş Pilot (200 kullanıcı)**
- Gerçek turistler (yaz sezonu)
- Farklı demografik gruplar
- A/B testing (farklı puan mekanikleri)
- Longitudinal study (tekrar ziyaretler)

**Çıktılar:**
- 200 kullanıcı verisi
- A/B test sonuçları
- Tekrar ziyaret analizi

---

#### **WP9: Akademik Yayınlar** (Ay 8-12)
**Sorumlu:** Proje Yürütücüsü

**Görevler:**

**Makale 1 (Ay 8-10): Teknoloji Odaklı**
- Konu: "Hyper-local Gamification Platform for Destination Marketing"
- Hedef: SCI-E dergi (Tourism Management, Information Technology & Tourism)
- Yazar: Proje ekibi

**Makale 2 (Ay 10-12): Davranışsal Araştırma**
- Konu: "Impact of Gamification on Tourist Behavior: Evidence from Ahlat, Turkey"
- Hedef: Scopus dergi veya ulusal
- Yazar: Proje yürütücüsü

**Konferans (Ay 11):**
- ENTER Tourism Conference veya benzer
- Poster + Sunum

**Çıktılar:**
- 2 makale (1 SCI-E submit, 1 ulusal)
- 1 konferans sunumu

---

#### **WP10: Fikri Mülkiyet ve Ticarileşme** (Ay 10-12)
**Sorumlu:** Proje Yürütücüsü

**Görevler:**

**Ay 10-11: Patent/Faydalı Model**
- Buluş tespiti: "GPS-based Hyper-local Gamification Engine"
- Patent araştırması (prior art search)
- Patent hazırlığı (patent vekili ile)
- TPE başvurusu

**Ay 11-12: Ticarileşme Planı**
- Business model canvas
- SaaS fiyatlandırma modeli
- Potansiyel müşteriler (20 belediye)
- Pitch deck hazırlama
- Yatırımcı toplantıları (TÜBİTAK BIGG, teknopark)

**Çıktılar:**
- Patent/faydalı model başvurusu
- Ticarileşme planı dokümanı
- Pitch deck (15 slayt)
- Açık kaynak kütüphane (GitHub)

**Kilometre Taşı 7 (Ay 12):** Ticarileşme hazır

---

### 4.3 Gantt Şeması

```
AY     │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │
───────┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
WP1    │███████████████████████████████████████████████│ Proje Yönetimi
WP2    │███████│                                         │ Tasarım
WP3    │   │███████████████████│                         │ Core Platform
WP4    │           │███████████████████│                 │ İleri Özellikler
WP5    │       │███████████████████│                     │ AI Modeli
WP6    │               │███████████│                     │ Pilot Test
WP7    │                       │███████│                 │ İyileştirme
WP8    │                           │███████│             │ Genişletilmiş Test
WP9    │                       │███████████████████│     │ Akademik Yayın
WP10   │                                   │███████████│ │ Ticarileşme
───────┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
M1=Tasarım  M2=MVP  M3=Beta  M4=AI  M5=Pilot  M6=Prod  M7=Ticari
```

---

## 5. PROJE EKİBİ VE GÖREV DAĞILIMI

### 5.1 Ekip Yapısı

**Proje Yürütücüsü: [Öğretim Üyesi Adı]**
- **Pozisyon:** [Doç. Dr. / Prof. Dr.]
- **Uzmanlık:** [Bilgisayar Mühendisliği / Turizm / vb.]
- **Görev:**
  - Proje koordinasyonu
  - Akademik yayınlar
  - Paydaş yönetimi
  - Veri analizi
- **Zaman:** 10 saat/hafta (toplam 520 saat)

**Bilgisayar Programcısı (Tam Zamanlı - 12 Ay)**
- **Nitelikler:**
  - Lisans: Bilgisayar Mühendisliği / Yazılım Mühendisliği
  - Deneyim: React Native + Firebase (2+ yıl)
  - Bilgiler: JavaScript/TypeScript, Cloud, Git
- **Görev:**
  - Mobile app geliştirme
  - Backend (Firebase) yönetimi
  - AI model entegrasyonu
  - Test ve deployment
- **Zaman:** 40 saat/hafta (toplam 2080 saat)

**AI/ML Danışmanı (Part-time - 6 Ay)**
- **Nitelikler:**
  - Doktora / Yüksek Lisans (AI/ML)
  - TensorFlow/PyTorch deneyimi
- **Görev:**
  - Dataset hazırlama
  - Model eğitimi
  - Transfer learning
  - Model optimizasyonu
- **Zaman:** 10 saat/hafta, 6 ay (toplam 260 saat)

**UI/UX Tasarımcısı (Part-time - 2 Ay)**
- **Görev:**
  - Wireframe + mockup
  - Icon ve asset tasarımı (15 rozet)
  - Kullanıcı testi
- **Zaman:** 20 saat/hafta, 2 ay (toplam 160 saat)

**Araştırma Görevlisi / Öğrenci (Part-time - 12 Ay)**
- **Görev:**
  - Literatür taraması
  - Survey hazırlama ve uygulama
  - Veri toplama ve analiz
  - Pilot test koordinasyonu
- **Zaman:** 15 saat/hafta (toplam 780 saat)

**Patent Vekili (Danışman - 3 Ay)**
- **Görev:**
  - Patent araştırması
  - Patent başvuru dokümanı
  - TPE iletişimi
- **Zaman:** 5 saat/ay, 3 ay (toplam 15 saat)

### 5.2 Danışmanlar ve İşbirlikleri

**Ahlat Belediyesi:**
- Pilot test desteği
- Yerel işletme iletişimi
- Tanıtım desteği

**Yerel İşletmeler (10 adet):**
- Pilot test katılımı
- QR kod sistemi kullanımı
- Veri paylaşımı

**Üniversite Teknoloji Transfer Ofisi:**
- Patent süreç desteği
- Ticarileşme danışmanlığı

---

## 6. BÜTÇE PLANI

### 6.1 Bütçe Özeti

| Kalem | Tutar (TL) | Oran |
|-------|------------|------|
| **A. Personel** | 420,000 | 60% |
| **B. Ekipman** | 80,000 | 11% |
| **C. Seyahat** | 50,000 | 7% |
| **D. Yazılım/Hizmet** | 60,000 | 9% |
| **E. Yayın** | 30,000 | 4% |
| **F. Patent** | 20,000 | 3% |
| **G. Diğer** | 40,000 | 6% |
| **TOPLAM** | **700,000 TL** | **100%** |

### 6.2 Detaylı Bütçe

#### **A. PERSONEL GİDERLERİ (420,000 TL)**

| Pozisyon | Süre | Aylık (TL) | Toplam (TL) |
|----------|------|------------|-------------|
| Bilgisayar Programcısı (Tam zamanlı) | 12 ay | 25,000 | 300,000 |
| AI/ML Danışmanı (Part-time) | 6 ay | 10,000 | 60,000 |
| UI/UX Tasarımcı (Part-time) | 2 ay | 12,000 | 24,000 |
| Araştırma Görevlisi/Öğrenci | 12 ay | 3,000 | 36,000 |
| **Alt Toplam** | | | **420,000** |

**Not:** Proje yürütücüsü üniversite kadrosu olduğu için maaş talep edilmemiştir.

---

#### **B. EKİPMAN (80,000 TL)**

| Ekipman | Adet | Birim (TL) | Toplam (TL) | Gerekçe |
|---------|------|------------|-------------|---------|
| Workstation PC (High-end) | 1 | 40,000 | 40,000 | AI model eğitimi |
| Macbook Pro (M2) | 1 | 35,000 | 35,000 | iOS development (gelecek) |
| Android Test Cihazları | 5 | 1,000 | 5,000 | Farklı ekranlar test |
| **Alt Toplam** | | | **80,000** | |

---

#### **C. SEYAHAT (50,000 TL)**

| Amaç | Kişi | Gün | Birim (TL) | Toplam (TL) |
|------|------|-----|------------|-------------|
| Ahlat Pilot Test (6 sefer) | 2 | 3 | 2,000 | 36,000 |
| Uluslararası Konferans | 1 | 5 | 10,000 | 10,000 |
| Yerel seyahatler (paydaş) | - | - | - | 4,000 |
| **Alt Toplam** | | | | **50,000** |

**Ahlat Seyahat Detayı:**
- Ulaşım (Van uçak + Ahlat): 1,000 TL
- Konaklama (3 gece x 300 TL): 900 TL
- Gündelik: 100 TL x 3 = 300 TL
- **Toplam/sefer/kişi:** ~2,300 TL x 2 kişi x 6 sefer = 27,600 TL

---

#### **D. YAZILIM / HİZMET (60,000 TL)**

| Hizmet | Süre | Aylık (TL) | Toplam (TL) | Gerekçe |
|--------|------|------------|-------------|---------|
| Firebase Blaze Plan | 12 ay | 1,500 | 18,000 | Database + Storage + Functions |
| MapBox Pro | 12 ay | 500 | 6,000 | Harita servisi |
| Cloud Server (AWS/GCP) | 12 ay | 1,000 | 12,000 | AI model hosting |
| GitHub Enterprise | 12 ay | 200 | 2,400 | Private repo + CI/CD |
| Adobe Creative Cloud | 2 ay | 500 | 1,000 | UI/UX tasarım |
| Domain + SSL | 12 ay | 50 | 600 | Web dashboard |
| Analytics Tools (Tableau/PowerBI) | 12 ay | 1,000 | 12,000 | Veri analizi |
| SPSS Lisansı | 12 ay | 500 | 6,000 | İstatistiksel analiz |
| API Kullanımları (SMS, Email) | 12 ay | 200 | 2,400 | Notifications |
| **Alt Toplam** | | | **60,400** | |

---

#### **E. YAYIN GİDERLERİ (30,000 TL)**

| Yayın | Adet | Tutar (TL) | Toplam (TL) |
|-------|------|------------|-------------|
| SCI-E Makale (Article Processing Charge) | 1 | 15,000 | 15,000 |
| Ulusal Makale | 1 | 2,000 | 2,000 |
| Konferans Kayıt Ücreti | 1 | 5,000 | 5,000 |
| Dil Düzeltme (İngilizce editing) | 2 | 2,000 | 4,000 |
| Çeviri hizmetleri | - | - | 2,000 |
| Poster/sunum materyali | - | - | 2,000 |
| **Alt Toplam** | | | **30,000** |

---

#### **F. PATENT GİDERLERİ (20,000 TL)**

| Kalem | Tutar (TL) |
|-------|------------|
| Patent araştırma ve raporlama | 5,000 |
| Patent hazırlık ve yazım (vekil) | 10,000 |
| TPE başvuru ücreti | 3,000 |
| Takip ve yazışmalar | 2,000 |
| **Alt Toplam** | **20,000** |

---

#### **G. DİĞER GİDERLER (40,000 TL)**

| Kalem | Tutar (TL) | Gerekçe |
|-------|------------|---------|
| Pilot test teşvikleri (öğrenciler) | 10,000 | Hediye kartları (100 kişi x 100 TL) |
| İşletme QR kod/materyaller | 5,000 | QR kod basım, poster, el ilanı |
| Survey/Focus group | 3,000 | Katılımcı teşvikleri |
| Ofis malzemeleri | 2,000 | Kırtasiye, yazıcı, vb. |
| İnternet ve iletişim | 3,000 | 12 ay internet |
| Beklenmedik giderler (%10) | 17,000 | Risk tamponu |
| **Alt Toplam** | **40,000** | |

---

### 6.3 Aylık Bütçe Dağılımı

| Ay | Personel | Ekipman | Seyahat | Yazılım | Yayın | Patent | Diğer | **Toplam** |
|----|----------|---------|---------|---------|-------|--------|-------|------------|
| 1 | 35,000 | 75,000 | 2,000 | 10,000 | - | - | 5,000 | **127,000** |
| 2-5 | 35,000 | - | 2,000 | 5,000 | - | - | 2,000 | **44,000** x4 |
| 6-7 | 35,000 | - | 12,000 | 5,000 | - | - | 10,000 | **62,000** x2 |
| 8-9 | 35,000 | - | 2,000 | 5,000 | 5,000 | - | 3,000 | **50,000** x2 |
| 10-12 | 35,000 | 5,000 | 6,000 | 5,000 | 8,000 | 7,000 | 3,000 | **69,000** x3 |

---

## 7. BEKLENEN ÇIKTILAR VE ETKİ

### 7.1 Somut Çıktılar

#### **A. Teknolojik Çıktılar**

1. **SEFERİ Mobil Uygulaması (Android APK)**
   - TRL 7 (Operasyonel ortamda test edilmiş)
   - 100+ aktif kullanıcı
   - 500+ fotoğraf
   - Crash-free rate >95%

2. **AI Modelleri**
   - Türk mutfağı tanıma modeli (10 kategori, accuracy >85%)
   - Selçuklu mimarisi tanıma (5 kategori, accuracy >80%)
   - TensorFlow Lite format (on-device inference)

3. **Yerel İşletme Paneli (Web Dashboard)**
   - QR kod yönetimi
   - İstatistikler (kupon kullanımı, ziyaretçi sayısı)
   - Kampanya oluşturma

4. **Analytics Platform**
   - Turist ısı haritası
   - Engagement metrikleri
   - POI popülerlik analizi

5. **POI Database & Template**
   - 29 Ahlat POI (tam veri)
   - 10 şehir için şablon yapı
   - JSON/CSV export

6. **Açık Kaynak Kütüphane**
   - React Native gamification framework
   - MIT License
   - GitHub (npm package)

#### **B. Akademik Çıktılar**

7. **SCI-E Makale (1 adet)** - Submit
   - Hedef: Tourism Management (IF: 10.9) veya Information Technology & Tourism (IF: 7.2)
   - Konu: "Hyper-local Gamification for Destination Marketing: A Pilot Study"

8. **Ulusal Makale (1 adet)** - Yayınlanacak
   - Hedef: Turizm Akademik Dergisi veya Bilişim Teknolojileri Dergisi
   - Konu: "Gamification ile Destinasyon Pazarlaması: Ahlat Örneği"

9. **Uluslararası Konferans Sunumu (1 adet)**
   - Hedef: ENTER Tourism Conference / ICTR / IEEE ICMLA
   - Format: Poster + Oral presentation

10. **Yüksek Lisans Tezi (1 adet - öğrenci varsa)**
    - Konu: "Turizm Sektöründe Gamification Uygulamalarının Kullanıcı Davranışına Etkisi"

#### **C. Fikri Mülkiyet**

11. **Patent / Faydalı Model Başvurusu (1 adet)**
    - Başlık: "GPS Tabanlı Hyper-local Oyunlaştırma Motoru"
    - Kapsam: Puan hesaplama algoritması, POI check-in mekaniği
    - Durum: TPE'ye başvurulacak

#### **D. Veri Seti**

12. **Turist Davranış Veri Seti**
    - 100 kullanıcı
    - 500+ fotoğraf (metadata: konum, zaman, kategori)
    - GPS trajektorileri (~50,000 veri noktası)
    - Engagement verileri (beğeni, yorum, görev)
    - Anonim hale getirilip açık veri olarak paylaşılabilir

### 7.2 Bilimsel Katkı ve Yenilik

#### **Literatüre Katkılar:**

1. **Gamification Teorisi:**
   - Self-Determination Theory'nin turizmdeki uygulamasına yeni kanıt
   - Optimal gamification mekaniklerinin belirlenmesi (A/B test sonuçları)

2. **Destination Marketing:**
   - Hyper-local stratejinin etkinliği
   - Dijital araçların yerel ekonomiye etkisi (ölçümlenmiş veri)

3. **Davranışsal Turizm:**
   - GPS data ile turist hareket kalıpları
   - Fotoğraf tercihleri ve destinasyon algısı ilişkisi

4. **Teknolojik Yenilik:**
   - Transfer learning ile Türk mutfağı tanıma (ilk dataset)
   - Offline-first gamification architecture (yeni mimari)

### 7.3 Sosyal ve Ekonomik Etki

#### **Yerel Ekonomiye Katkı:**

**Direkt Etki (Pilot Süresince):**
- 100 öğrenci x 500 TL ortalama harcama = 50,000 TL
- Kupon kullanımları: ~200 adet x 50 TL ortalama = 10,000 TL
- Ekstra ziyaret süresi → ekstra tüketim: ~20,000 TL
- **Toplam direkt ekonomik etki: ~80,000 TL (pilot 4 hafta)**

**Potansiyel Yıllık Etki (Ölçeklendirme Sonrası):**
- Ahlat'a yıllık 100,000 turist geldiği varsayımıyla
- %20'si SEFERİ kullanırsa: 20,000 kullanıcı
- Ortalama harcama artışı %30: 500 TL → 650 TL
- Ekstra harcama: 20,000 x 150 TL = **3,000,000 TL/yıl**

#### **Sosyal Etki:**

1. **Destinasyon Tanıtımı:**
   - Sosyal medya paylaşımları: 500+ fotoğraf (#ahlat)
   - Organik reach: ~50,000 kişi (tahmini)
   - Ahlat'ın dijital görünürlüğü artışı

2. **Kültürel Miras Farkındalığı:**
   - Selçuklu eserleri hakkında bilinç artışı
   - Tarihi bilgi verme (POI açıklamaları)
   - Koruma bilincinin artması

3. **Dijital Okuryazarlık:**
   - Yerel işletmelerin dijital araç kullanımı
   - QR kod, analytics, vb. teknolojiler öğrenme

4. **İstihdam:**
   - Pilot sonrası scale-up için yerel ekip ihtiyacı
   - Turizm sektöründe dijital yetkinlik artışı

#### **Sektörel Etki:**

1. **Belediyeler:**
   - Veri odaklı turizm politikaları (ısı haritası, tercihler)
   - Destinasyon yönetimi için yeni araç

2. **Turizm Ajansları:**
   - Paket turlara entegre edilebilir
   - Müşteri memnuniyeti artışı

3. **Diğer Destinasyonlar:**
   - Template model ile kolay adaptasyon
   - Türkiye geneline yayılma potansiyeli

### 7.4 Ticarileşme Potansiyeli

#### **İş Modeli: SaaS (Software as a Service)**

**Hedef Müşteriler:**
1. **Belediyeler/Büyükşehirler** (Tier 1)
   - 81 il, ~30 turizm odaklı şehir
   - Fiyat: 50,000 - 200,000 TL/yıl (şehir büyüklüğüne göre)

2. **Turizm Ajansları/DMO** (Tier 2)
   - Kültür ve Turizm Bakanlığı bölge ofisleri
   - Fiyat: 30,000 - 100,000 TL/yıl

3. **Özel Sektör** (Tier 3)
   - Büyük oteller/resort'lar
   - Tema parkları
   - Fiyat: 20,000 - 50,000 TL/yıl

**Gelir Projeksiyonu (3 Yıl):**
- **Yıl 1:** 5 şehir x 100K TL = 500K TL
- **Yıl 2:** 15 şehir x 100K TL = 1.5M TL
- **Yıl 3:** 30 şehir x 100K TL = 3M TL

**Fonlama Stratejisi:**
- TÜBİTAK BIGG (1512)
- KOSGEB Ar-Ge İnovasyon
- Teknoloji Transfer Ofisi desteği
- Melek yatırımcı/VC

---

## 8. RİSK ANALİZİ VE ÖNLEMLER

| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| **Teknik Riskler** | | | |
| Firebase limitleri aşılır | Düşük | Orta | Free tier'dan Blaze plan'a geçiş (bütçede var) |
| AI modeli düşük accuracy | Orta | Orta | Dataset genişletme, transfer learning optimizasyonu |
| GPS accuracy problemleri | Orta | Orta | Radius tolerance artırma, manual override |
| Offline sync hataları | Orta | Düşük | Queue mekanizması, retry logic |
| **Operasyonel Riskler** | | | |
| Programcı ayrılır | Düşük | Yüksek | Sözleşme, yedek programcı listesi, iyi dokümantasyon |
| Öğrenci katılımı düşük | Orta | Yüksek | Teşvik artırma (100 TL → 150 TL), zorunlu proje |
| İşletme katılımı düşük | Orta | Orta | Belediye desteği, ücretsiz pazarlama vaadi |
| COVID-19 benzeri salgın | Düşük | Yüksek | Pilot'u başka şehre taşıma, online test |
| **Akademik Riskler** | | | |
| Makale ret | Orta | Orta | Alternatif dergi listesi, peer-review öncesi danışmanlık |
| Konferans kabul edilmez | Düşük | Düşük | Birden fazla konferansa başvuru |
| **Ticari Riskler** | | | |
| Patent ret | Orta | Düşük | Faydalı model alternatifi, open-source stratejisi |
| Pazar ilgisi düşük | Orta | Orta | Pilot başarısını iyi pazarlama, case study |

---

## 9. SÜRDÜRÜLEBİLİRLİK PLANI

### 9.1 Teknik Sürdürülebilirlik

**Proje Sonrası (13-24. Aylar):**
1. **Open-source Devam:**
   - GitHub'da topluluk katkıları
   - Issue tracking ve bug fixing
   - Minor updates

2. **Hosting:**
   - Firebase Blaze plan devam (düşük maliyet: ~500 TL/ay)
   - Sponsorluk (Ahlat Belediyesi)

3. **Genişletme:**
   - Diğer şehirler için template kullanımı
   - SaaS modele geçiş

### 9.2 Akademik Sürdürülebilirlik

1. **Follow-up Araştırmaları:**
   - Longitudinal study (1 yıl sonra tekrar ziyaret)
   - Cross-city karşılaştırma (Ahlat vs. başka şehir)
   - AI modelinin iyileştirilmesi (daha fazla data)

2. **Yüksek Lisans/Doktora Tezleri:**
   - Farklı öğrenciler farklı yönleri derinleştirebilir

3. **Patent Süreci:**
   - 12 ay sonra patent inceleme devam eder
   - Gerekirse itirazlara cevap

### 9.3 Ticari Sürdürülebilirlik

**Exit Stratejileri:**

1. **Spin-off Şirket:**
   - Üniversite teknoloji transfer ofisi ile şirketleşme
   - Proje ekibinin devam etmesi

2. **Lisanslama:**
   - Teknoloji lisansını satış (one-time fee veya royalty)
   - Belediye birliklerine / turizm ajanslarına

3. **Satış:**
   - Büyük bir turizm tech şirketine satış
   - Değerleme: 5-10M TL (başarılı pilot ile)

4. **SaaS (Önerilen):**
   - Yıllık abonelik modeli
   - Recurring revenue
   - Ölçeklenebilir

---

## 10. PROJE TAKVİMİ VE KİLOMETRE TAŞLARI

### 10.1 Kilometre Taşları

| # | Kilometre Taşı | Ay | Tanım |
|---|----------------|-----|-------|
| M1 | Tasarım Onayı | 2 | SRS, SDD, UI/UX prototip |
| M2 | MVP Alpha Release | 5 | Core özellikler çalışır |
| M3 | Beta Release | 7 | Tüm özellikler tamamlandı |
| M4 | AI Entegrasyonu | 8 | Yemek ve anıt tanıma aktif |
| M5 | Pilot Test Tamamlandı | 7 | 100 kullanıcı test bitti |
| M6 | Production Release | 9 | v1.0 canlı |
| M7 | Ticarileşme Hazır | 12 | Patent başvurusu, business plan |

### 10.2 Raporlama

**Ara Rapor (Ay 6):**
- MVP tamamlanma durumu
- Pilot test planı
- Harcama raporu
- Yayın planı

**Final Rapor (Ay 12):**
- Tüm çıktılar
- Pilot test sonuçları
- Makale durumu
- Patent başvurusu
- Ticarileşme planı
- Harcama özeti

---

## 11. KAYNAKÇA

### 11.1 Gamification & Tourism

1. Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: defining "gamification". *Proceedings of the 15th International Academic MindTrek Conference*, 9-15.

2. Xu, F., Buhalis, D., & Weber, J. (2017). Serious games and the gamification of tourism. *Tourism Management*, 60, 244-256.

3. Sigala, M. (2015). The application and impact of gamification funware on trip planning and experiences: the case of TripAdvisor's funware. *Electronic Markets*, 25(3), 189-209.

4. Negrusa, A. L., Toader, V., Sofica, A., Tutunea, M. F., & Rus, R. V. (2015). Exploring Gamification Techniques and Applications for Sustainable Tourism. *Sustainability*, 7(8), 11160-11189.

5. Hunicke, R., LeBlanc, M., & Zubek, R. (2004). MDA: A formal approach to game design and game research. *AAAI Workshop on Challenges in Game AI*, 1722, 1-5.

6. Chou, Y. K. (2015). *Actionable Gamification: Beyond Points, Badges, and Leaderboards*. Packt Publishing Ltd.

### 11.2 Self-Determination Theory

7. Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist*, 55(1), 68-78.

8. Deterding, S. (2015). The lens of intrinsic skill atoms: A method for gameful design. *Human–Computer Interaction*, 30(3-4), 294-335.

### 11.3 AI in Tourism

9. Buhalis, D., & Sinarta, Y. (2019). Real-time co-creation and nowness service: lessons from tourism and hospitality. *Journal of Travel & Tourism Marketing*, 36(5), 563-582.

10. Li, J., Xu, L., Tang, L., Wang, S., & Li, L. (2018). Big data in tourism research: A literature review. *Tourism Management*, 68, 301-323.

11. Huang, J., & Bian, L. (2009). A Bayesian network and analytic hierarchy process based personalized recommendations for tourist attractions over the Internet. *Expert Systems with Applications*, 36(1), 933-943.

### 11.4 Destination Marketing

12. Özel, Ç. H., & Kozak, N. (2012). Turizm Pazarlamasında Sosyal Medyanın Rolü. *Anatolia: Turizm Araştırmaları Dergisi*, 23(2), 226-228.

13. Çeltek, E. (2010). Mobil Pazarlama: Türkiye'deki Mevcut Durum ve Gelişim Potansiyeli Üzerine Bir Araştırma. *İnternet Uygulamaları ve Yönetimi Dergisi*, 1(1), 23-43.

14. Pike, S., & Page, S. J. (2014). Destination Marketing Organizations and destination marketing: A narrative analysis of the literature. *Tourism Management*, 41, 202-227.

### 11.5 Mobile App Development

15. Holzer, A., & Ondrus, J. (2011). Mobile application market: A developer's perspective. *Telematics and Informatics*, 28(1), 22-31.

16. Tan, G. W. H., & Ooi, K. B. (2018). Gender and age: Do they really moderate mobile tourism shopping behavior? *Telematics and Informatics*, 35(6), 1617-1642.

### 11.6 Technology Readiness Level

17. Mankins, J. C. (1995). Technology readiness levels. *White Paper, April*, 6(1995), 1995.

18. Héder, M. (2017). From NASA to EU: the evolution of the TRL scale in Public Sector Innovation. *The Innovation Journal*, 22(2), 1-23.

### 11.7 Oyunlaştırma ve Konum Tabanlı Uygulamalar: Ampirik Çalışmalar

19. Ferreira, D. F., Costa, R. A., Chim-Miki, A. F., & Kozak, M. (2025). What emotions trigger the perceived destination image and word-of-mouth recommendation in World Heritage Sites? *International Journal of Tourism Research*, 27(3). https://doi.org/10.1002/jtr.70065

20. Högberg, J., Wästlund, E., Aas, T., Hjemdahl, K. M., & Nordgård, D. (2020). Herding the hordes: Using location-based services and mobile messaging to affect visitor behavior. *Journal of Hospitality & Tourism Research*, 870-878. https://doi.org/10.1177/1096348020912449

21. Jo, Y., & Shin, H. (2025). Can gamification and augmented reality (AR) revitalize declining destinations? Investigating its impact on tourist attitudes and behavior. *Journal of Travel Research*, 943-970. https://doi.org/10.1177/00472875251332961

22. Kawanaka, S., Matsuda, Y., Suwa, H., Fujimoto, M., Arakawa, Y., & Yasumoto, K. (2020). Gamified participatory sensing in tourism: An experimental study of the effects on tourist behavior and satisfaction. *Smart Cities*, 3(3). https://doi.org/10.3390/smartcities3030037

23. Kılıçarslan, Ö., & Albayrak, T. (2026). An experimental study on heritage tourism experiences through augmented reality: A case of Kaleiçi-Antalya. *International Journal of Tourism Research*, 28(3). https://doi.org/10.1002/jtr.70360

24. Kim, Y., Lee, Y., Suh, Y., & Kim, D.-Y. (2021). The effects of gamification on tourist psychological outcomes: An application of letterboxing and external rewards to maze park. *Journal of Travel & Tourism Marketing*, 341-355. https://doi.org/10.1080/10548408.2021.1921095

25. Lee, B. (2019). The effect of gamification on psychological and behavioral outcomes: Implications for cruise tourism destinations. *Sustainability*, 11(11), 3002. https://doi.org/10.3390/su11113002

26. Mitas, O., Badal, R., Verhoeven, M., Verstraten, K., de Graaf, L., Mitásová, H., et al., & Klijs, J. (2023). Tell me where to go: An experiment in spreading visitor flows in The Netherlands. *International Journal of Environmental Research and Public Health*, 20(8), 5441. https://doi.org/10.3390/ijerph20085441

27. Pamuru, V., Khern-am-nuai, W., & Kannan, K. N. (2021). The impact of an augmented-reality game on local businesses: A study of Pokémon Go on restaurants. *Information Systems Research*, 950-966. https://doi.org/10.1287/isre.2021.1004

28. Pasca, M. G., Renzi, M. F., Di Pietro, L., & Guglielmetti Mugion, R. (2021). Gamification in tourism and hospitality research in the era of digital platforms: A systematic literature review. *Journal of Service Theory and Practice*. https://doi.org/10.1108/JSTP-05-2020-0094

29. Pradhan, D., Malik, G., & Vishwakarma, P. (2023). Gamification in tourism research: A systematic review, current insights, and future research avenues. *Journal of Vacation Marketing*, 130-156. https://doi.org/10.1177/13567667231188879

30. Shoval, N., Kahani, A., De Cantis, S., & Ferrante, M. (2020). Impact of incentives on tourist activity in space-time. *Annals of Tourism Research*, 80, 102846. https://doi.org/10.1016/j.annals.2019.102846

31. Thinnukool, O., Phrommas, R., Kongdee, N., Jintapitak, M., Pitupumnak, K., Jarumaneerat, T., & Khuwuthyakorn, P. (2025). Sustainable tourism promotion through mobile gamification and reward systems for Chiang Mai Old Town, Thailand. *Frontiers in Computer Science*. https://doi.org/10.3389/fcomp.2025.1710089

32. Ting, H., Cheah, J.-H., Tan, K., Tham, A., & Leong, Q. L. (2025). Mobile gamification's impact on tourism visit intention. *International Journal of Tourism Research*, 27(1). https://doi.org/10.1002/jtr.70002

33. Tongpaeng, Y., Nobnop, R., Wongwan, N., Homla, P., Intawong, K., & Puritat, K. (2024). Comparison of gamified and non-gamified mixed reality in enhancing museum visitor engagement, motivation, and learning outcome. *Journal of Heritage Tourism*, 919-948. https://doi.org/10.1080/1743873X.2024.2351852

34. Zhang, Y., & Zhang, J. (2018). Could nearby Pokéstops improve restaurants' online reputation? *Proceedings of the 51st Hawaii International Conference on System Sciences*, 1-10. https://doi.org/10.24251/HICSS.2018.623

### 11.8 Kullanıcı Tarafından Üretilen Fotoğraflar ve Destinasyon İmajı

35. Filieri, R., Lin, Z., Pino, G., Alguezaui, S., & Inversini, A. (2021). The role of visual cues in eWOM on consumers' behavioral intention and decisions. *Journal of Business Research*, 135, 663-675. https://doi.org/10.1016/j.jbusres.2021.06.055

36. Gabe, T. (2020). Yelp.com ratings and the businesses visited by cruise passengers in Bar Harbor, Maine. *Applied Economics Letters*, 119-123. https://doi.org/10.1080/13504851.2020.1736496

37. Leung, R., Vu, H. Q., & Rong, J. (2017). Understanding tourists' photo sharing and visit pattern at non-first tier attractions via geotagged photos. *Information Technology & Tourism*, 17, 55-74. https://doi.org/10.1007/s40558-017-0078-3

38. Li, H., Zhang, L., & Hsu, C. H. C. (2023). Research on user-generated photos in tourism and hospitality: A systematic review and way forward. *Tourism Management*, 96, 104714. https://doi.org/10.1016/j.tourman.2022.104714

39. Marder, B., Erz, A., Angell, R., & Plangger, K. (2019). The role of photograph aesthetics on online review sites: Effects of management- versus traveler-generated photos on tourists' decision making. *Journal of Travel Research*, 31-46. https://doi.org/10.1177/0047287519895125

40. Stepchenkova, S., & Zhan, F. (2013). Visual destination images of Peru: Comparative content analysis of DMO and user-generated photography. *Tourism Management*, 36, 590-601. https://doi.org/10.1016/j.tourman.2012.08.006

41. Taecharungroj, V., & Mathayomchan, B. (2020). Traveller-generated destination image: Analysing Flickr photos of 193 countries worldwide. *International Journal of Tourism Research*, 23(3), 417-441. https://doi.org/10.1002/jtr.2415

42. Vlasich, E., Lee, D., & Archer, C. (2022). Tourism as a transformative economic agent in regional Australia: A case study of operators' use of social media. *Worldwide Hospitality and Tourism Themes*. https://doi.org/10.1108/WHATT-08-2022-0102

43. Zhao, Y., & Agyeiwaah, E. (2024). How do tourism stakeholders co-create destination images with photos on social media? *Journal of Travel Research*, 1519-1536. https://doi.org/10.1177/00472875241253006

---

## 12. EKLER

### EK-A: Ekip CV Özeti

**Proje Yürütücüsü: [Adı]**
- **Eğitim:** Doktora, [Üniversite], [Alan], [Yıl]
- **Pozisyon:** [Unvan], [Üniversite], [Bölüm]
- **Deneyim:** X yıl akademik, Y yıl AR-GE projesi
- **Yayınlar:** Z adet SCI, W adet ulusal
- **Projeler:** [TÜBİTAK/BAP projeleri]

**Bilgisayar Programcısı: [İsim - Aday]**
- **Eğitim:** Lisans, Bilgisayar Mühendisliği
- **Deneyim:** 3+ yıl React Native, Firebase
- **Yetenekler:** JavaScript, TypeScript, Python, Git, Cloud
- **Portföy:** [GitHub linki]

*(Detaylı CV'ler ayrı dosyada)*

### EK-B: Paydaş Destek Mektupları

1. **Ahlat Belediyesi:** Pilot test desteği taahhütnamesi
2. **[Üniversite] Teknoloji Transfer Ofisi:** Patent destek mektubu
3. **Yerel İşletmeler:** Katılım taahhütleri (3-5 işletme)

*(Mektuplar taranmış PDF olarak eklenecek)*

### EK-C: Etik Kurul İzni

- İnsan denekleri ile çalışma (pilot test)
- [Üniversite] Etik Kurulu'na başvuru yapılacak
- Veri gizliliği ve KVKK uyumluluğu

*(Başvuru sonrası eklenecek)*

### EK-D: Sistem Tasarım Dokümanları (Örnek)

**Database ER Diagram:**
```
[Mevcut DATABASE_SCHEMA.md'den alınacak]
```

**Use Case Diagram:**
```
[UML diyagramları eklenecek]
```

**UI Mockup Örnekleri:**
```
[Figma linkler veya screenshots]
```

### EK-E: POI Database Örneği

```json
{
  "poi_001": {
    "name": "Selçuklu Mezarlığı",
    "tier": "A",
    "location": {"lat": 38.7536, "lng": 42.4847},
    "points": {"first": 20, "repeat": 10},
    "description": "Dünyanın en büyük İslam mezarlığı..."
  }
}
```

*(Tam liste AHLAT_POI_DATABASE.md'de)*

---

## 13. SONUÇ VE DEĞERLENDİRME

**SEFERİ projesi**, destinasyon pazarlamasında **paradigma değişikliği** yaratma potansiyeline sahip yenilikçi bir AR-GE çalışmasıdır.

### 13.1 Neden Desteklenmeli?

1. **Bilimsel Özgünlük:**
   - Türkiye'de ilk hyper-local gamification araştırması
   - Literatüre katkı (SCI-E makale)
   - Yeni veri seti (turist davranış verileri)

2. **Teknolojik Yenilik:**
   - TRL 3 → 7 artırımı
   - AI model geliştirme (Türk mutfağı dataset)
   - Patent/faydalı model

3. **Sosyal Etki:**
   - Yerel ekonomiye katkı (ölçülebilir)
   - Kültürel mirasın tanıtımı
   - Dijital okuryazarlık artışı

4. **Ticari Potansiyel:**
   - SaaS model ile ölçeklenebilir
   - 30+ şehir potansiyel müşteri
   - 3M TL yıllık gelir potansiyeli (3. yıl)

5. **Pilot Başarısı:**
   - Ahlat gibi görece az ziyaret edilen bir destinasyonda bile %50 engagement artışı bekleniyor
   - Başarılı pilot → diğer şehirlere kolay yaygınlaştırma

### 13.2 Projeden Beklentiler

**12 Ay Sonunda:**
- ✅ Çalışan MVP (TRL 7)
- ✅ 100 kullanıcı pilot test tamamlandı
- ✅ 2 makale (1 SCI-E submit)
- ✅ 1 patent başvurusu
- ✅ Ticarileşme planı hazır
- ✅ Ahlat'ta ölçülebilir ekonomik etki (~80K TL pilot, yıllık ~500K TL potansiyel)

**24-36 Ay Sonunda (Proje Ötesi):**
- 🚀 10+ şehre yaygınlaştırma
- 🚀 Spin-off şirket kurulumu
- 🚀 1.5-3M TL yıllık gelir

### 13.3 Neden TÜBİTAK 1511?

- **Teknoloji odaklı:** MVP geliştirme, TRL artırımı
- **Ticarileşme:** SaaS model, patent, spin-off potansiyeli
- **Toplumsal fayda:** Turizm sektörüne katkı, yerel ekonomi
- **Ölçeklenebilir:** Ahlat → Türkiye → KKTC/Balkanlar

---

**Proje Toplam Bütçe:** 700,000 TL
**Süre:** 12 Ay
**Başlangıç TRL:** 3
**Hedef TRL:** 7

**İletişim:**
- **Proje Yürütücüsü:** [İsim]
- **E-posta:** [email]
- **Telefon:** [tel]
- **Kurum:** [Üniversite], [Bölüm]

---

**Tarih:** 2025-11-17
**Versiyon:** 1.0
**Durum:** TÜBİTAK 1511 Başvurusu - Taslak

---

*Bu proje önerisi, TÜBİTAK 1511 programı formatına uygun olarak hazırlanmıştır. Gerçek başvuruda üniversite, kişi adları, CV'ler, destek mektupları ve diğer belgeler eklenmelidir.*
