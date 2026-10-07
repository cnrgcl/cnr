# Korpus A birincil kodlama notları (YZ birincil kodlayıcı, kodbook v1) — 2026-10-07

Çıktı: `analiz/kodlama-A.csv` (179 anlam birimi, 25 belge). Her ALINTI, `korpus-belge/A/` içindeki ilgili .txt dosyasında birebir (substring) bulunduğu betikle doğrulandı. Çince birimlerde CEVIRI_TR, kodlayıcının çevirisidir. A07 için .txt (Türkçe Resmî Gazete metni) kullanıldı; PDF ve `_envanter.csv` kodlanmadı. NEG sütunu kurala göre otomatik üretildi (A1+RK veya A3/A4+İB).

## 1. Belge başına birim sayısı

| Belge | Taraf | Birim | | Belge | Taraf | Birim |
|---|---|---|---|---|---|---|
| A01 | ORT | 2 | | A14 | TR | 10 |
| A02 | TR | 1 | | A15 | TR | 8 |
| A03 | CN | 3 | | A16 | TR | 11 |
| A04 | TR | 6 | | A17 | CN | 8 |
| A05 | TR | 2 | | A18 | TR | 15 |
| A06 | CN | 14 | | A19 | CN | 4 |
| A07 | ORT | 12 | | A20 | CN | 2 |
| A08 | CN | 7 | | A21 | CN | 8 |
| A09 | CN | 7 | | A22 | CN | 5 |
| A10 | TR | 7 | | A23 | TR | 2 |
| A11 | CN | 3 | | A24 | TR | 7 |
| A12 | TR | 26 | | A25 | CN | 4 |
| A13 | CN | 5 | | **Toplam** | | **179** |

Taraf: TR 95 · CN 70 · ORT 14.

**Sıfır birimli belge yok.** Az birimli belgeler: A02 (1; büyük kısmı ziyaret protokolü), A01, A05, A20, A23 (2'şer). A17'nin %80'i Çin tarzı modernleşme/küresel girişimler kalıp metnidir; yalnız İpek Yolu/Kuşak-Yol/kültür paragrafları kodlandı. A12'nin terörizm ve AB bölümleri, A24'ün diplomatik tarih ve Gazze/Ukrayna bölümleri kodlanmadı.

## 2. Çapraz tablolar

### Arena × yönelim (tümü)

| Arena | İB | RK | KR | Toplam | RK % | RK+KR % |
|---|---|---|---|---|---|---|
| A1 Bağlantısallık | 40 | 9 | 9 | 58 | 15,5 | 31,0 |
| A2 Turist akışı | 49 | 13 | 1 | 63 | 20,6 | 22,2 |
| A3 Anlatı | 20 | 18 | 3 | 41 | 43,9 | 51,2 |
| A4 Değer yakalama | 8 | 6 | 3 | 17 | 35,3 | 52,9 |
| Toplam | 117 | 46 | 16 | 179 | 25,7 | 34,6 |

**Duyarlılık (A2):** A2'deki 13 RK'nın 10'u "tek taraflı hedef / tek taraflı tanıtım" kararından geliyor (aşağıda karar 1). Bu 10 birim çıkarılırsa A2 = İB 49 / RK 3 / KR 1 (n=53) olur, RK %5,7. O durumda A1 (%15,5) > A2 (%5,7) olur ve Ö3'ün A1<A2 sıralaması bozulur; A2<A3 ve A2<A4 sıralaması sürer.

### Taraf × arena (İB / RK / KR; RK %)

| Taraf | A1 | A2 | A3 | A4 |
|---|---|---|---|---|
| TR (95) | 23/6/1 (%20) | 22/11/1 (%32) | 11/10/1 (%45) | 3/5/1 (%56) |
| CN (70) | 14/3/6 (%13) | 23/2/0 (%8) | 8/7/1 (%44) | 4/1/1 (%17) |
| ORT (14) | 3/0/2 (%0) | 4/0/0 (%0) | 1/1/1 (%33) | 1/0/1 (%0) |

TR kaynakları Ö3 sırasını neredeyse tekdüze izliyor (20→32→45→56). CN kaynakları A2'de çok işbirlikçi (%8), A3'te TR ile aynı (%44). CN'nin A1'deki rekabeti RK'dan çok KR biçiminde (6 KR): "Türkiye'nin Kuşak ve Yol'a katılımı" kalıbı.

### NEG (Ö3'e ters düşen) = 37
- A1+RK: 9 (TR 6: hub/kavşak iddiaları ×4, Orta Koridor'un yalnız adıyla anılması, "Türkiye'den başlayan Orta Koridor"; CN 3: MoU'nun Orta Koridor adı verilmeden anılması ×2, "China-Europe Railway Express güney hattı")
- A3+İB: 20 (simetrik ortak miras anlatıları: "iki kadim medeniyet", "iki uç", "iki başkent", Osmanlı-Ming hediyeleri, porselen)
- A4+İB: 8 (operatör işbirliği ×2, finansman platformları ×2, yerel para, AliPay, "yaygın fayda" ×2)

## 3. Belirsiz kararlar ve uygulanan karar kuralları

1. **Tek taraflı hedef/tanıtım = RK (en hassas karar).** Bir tarafın kendi gelen turist hedefi ("1 milyon Çinli turist") ya da kendi destinasyonunu tanıtması ortak özne içermiyor ve değeri tek tarafa bağlıyor; "değeri tek taraf için yakalama" ölçütüyle RK kodlandı. Alt kodları `tek-taraflı-hedef` (6) ve `tek-taraflı-tanıtım` (4; biri `/pazar-olarak-Çin`), ayrıca `beklenti-açığı` (1). Kolayca yeniden kodlanabilmeleri için ayrı tutuldu. Yazar bunları nötr sayarsa A2 RK %'si 20,6'dan 5,7'ye iner (bkz. duyarlılık).
2. **Tek taraflı kolaylaştırma = İB.** E-vize, Çince personel/rehber, güvenlik önlemi, "China Friendly" sertifikası, yeni THY hatları akışı büyütür ve karşı tarafın vatandaşına yarar; değer oluşturma olarak İB kodlandı. Kural 1 ile sınırı şöyle: *hedef/gelir* = RK, *erişimi kolaylaştırma* = İB.
3. **"Uyum" cümleleri.** "Orta Koridor Kuşak ve Yol ile doğal uyum içinde" türü cümleler, "bizim" iyelik ekiyle gelse bile (A16, A18, A24) İB kodlandı. KR yalnız açık asimetri varsa verildi: Türk girişimlerinin Kuşak ve Yol'a "bütünleştirilmesi/dâhil edilmesi" (A07), Türk sözcünün Çin kaynağında yalnız "Kuşak ve Yol'a katılım" ile aktarılması (A08, A11, A13, A22). RK ise koridorun yalnız bir tarafın adıyla anıldığı birimlere verildi (A08 ×2, A16, A18, A22).
4. **İki uç / iki kapı anlatısı.** Simetrik iki uç anlatısı İB kodlandı: A12 "gates… hand in hand", A19 "东西两端", A14 "iki başkent", A16/A18 "Xi'an doğu ucu + Türk-Çin buluşma noktası". A04'te "Xi'an'da başlayıp İstanbul'da biten" cümlesi KR kodlandı, çünkü "no wonder" ile İstanbul'un ayrıcalığına bağlanıyor. Not: Türk kaynakları Xi'an'ı hiçbir yerde "başlangıç" diye anmıyor, "doğu ucu" diyor. Bu örtük bir merkezsizleştirme; kodda İB kaldı ama yazarın okuması gerekiyor.
5. **Arena belirsizlikleri (sabit sıraya göre turiste yakın olan seçildi):** turizm+ulaştırma listeleri → A2 (A01, A03, A19); uçuş + tanıtım → A2 (A18); İstanbul-Xi'an "iki başkent" uçuşu → A3 (A14); "modern İpek Yolu inşa ediyoruz" → A3 (A16); köprü/kavşak iddiaları → A3 (A12, A21) ya da lojistik/pazar bağlamı ağır basınca A1 (A04, A16, A18); THY "pazar konumunu pekiştirme" → A4 (A04); Çinli müteahhitlerin Ankara-İstanbul YHT'si → A4 KR (A06); Türk girişimleri/İpek Yolu kavramlarının tanınması → A3 KR (A07).
6. **Finansman platformları (AIIB, İpek Yolu Fonu; A07, A08) A4 İB → NEG.** Metin ortak dil kullanıyor, açık bir ayrıcalık ifadesi yok. Gizil olarak Çin öncülüğündeki finans altyapısıdır. Muhafazakâr kural gereği İB kaldı; yazarın denetimine işaretlendi.
7. **AliPay (A12) A4 İB → NEG.** Türk tarafı Çin ödeme platformuna uyum sağlıyor. Söylem işbirlikçi, ama Ö5 (değerin Çinli aracıda kalması) açısından tam da beklenen mekanizma. Söylem kodu ile yapısal yorum ayrışıyor.
8. **Güvenlik (A09).** Çin'in "Çinli turistin güvencesini güçlendirin" talebi A2 RK (tek taraflı koşul), Türk yanıtı A2 İB kodlandı. RK kararı tartışmaya açık.
9. **Dunhuang (A25) A3 RK.** Ortak konserde İpek Yolu Çin'in yurt içi simgesi Dunhuang ile temsil ediliyor; Ö5 ile bağlantılı. Program içeriği olduğu için zayıf bir RK.
10. **Kültürel simgeler/kurumlar → A3.** Mevlana (A05, A15), Yunus Emre Enstitüsü talebi (A10), UNESCO envanteri (A15, A21) İpek Yolu'na doğrudan değinmese de "kendi markası" olarak A3 RK kodlandı. Çin kaynağının Mevlana'yı anması (A06) A3 İB kodlandı.
11. **Konuşan ile kaynak ayrımı.** TARAF dosya başlığından alındı. Çin kaynağında aktarılan Türk sözcü (A03 Gül, A08/A13 Erdoğan, A09 Ünal, A19 Fidan, A21 Ersoy-Xinhua) CN sayıldı. A21'deki Türk bakanın İpek Yolu rotası/UNESCO/kavşak iddiaları bu yüzden CN satırında görünüyor ve CN A3 RK sayısını (7) şişiriyor; bunların 3'ü A21'den geliyor.

## 4. Yeni (tümevarım) alt kodlar — v2 için önerilen aileler

Tüm alt kodlar bu turda üretildi (125 farklı etiket). Konsolidasyon önerisi:

- **A1:** `Orta-Koridor-uyum` (14), `uçuş*` (9), `hub-iddiası` (4), `BRI-çerçevesine-katılım` / `BRI-ye-eklemlenme` (5), `asimetrik-bütünleştirme` (2), `Orta-Koridor-adsız` (2, CN) ↔ `Orta-Koridor-adlandırma` / `Orta-Koridor-başlangıç-Türkiye` (2, TR), `kendi-koridor-markası (Çin-Avrupa-treni)`, `erken-destek`, `demiryolu`, `solo-değil-koro`, `mükerrerlik-önleme`, `kamu-malı-Çin`, `THY-yuvası`.
- **A2:** `tek-taraflı-hedef`, `tek-taraflı-tanıtım`, `beklenti-açığı`, `kültür-yılı` / `turizm-yılı` (+`turizm-yılı-etkisi`), `halklar-arası-değişim*`, `vize*` (+`vize-asimetrisi`), `güvenlik-talebi` / `güvenlik-yanıtı`, `Çince-personel/rehber`, `Çin-dostu-sertifika`, `çift-yönlü-akış`, `turizm-MoU`.
- **A3:** `ortak-miras*`, `iki-kadim-medeniyet` / `iki-beşik` / `iki-uç` / `iki-başkent` (simetri ailesi), `köprü-iddiası` / `kapı-iddiası`, `başlangıç-iddiası (Göbeklitepe)`, `Çin-özne/Türkiye-arasında`, `durak/halka-konumlandırma`, `anlam-yeniden-tanımlama (Çin)`, `Çin-kökenli-girişim/sahiplik`, `kendi-İpek-Yolu-rotası`, `UNESCO-kendi-mirası`, `kendi-kültürel-marka`, `anlatı-çatışması/temsil`, `anlatı-ittifakı/üçüncü-taraf`, `Dunhuang/kendi-İpek-Yolu-simgesi`.
- **A4:** `ödeme-sistemi (RMB/yerel-para/AliPay)`, `finansman-sahipliği`, `acente-işbirliği`, `pazar-erişimi/aracı`, `doğrudan-erişim/aracısızlaştırma`, `ulusal-taşıyıcı-değeri`, `Çinli-harcama-hedefi`, `ticaret-dengesizliği`, `yaygın-fayda`, `ihracat-kazancı`.

**Doygunluk notu:** Son 5 belgede (A21–A25) yeni alt kodlar hâlâ çıkıyor: `doğrudan-erişim/aracısızlaştırma`, `kendi-koridor-markası`, `anlatı-çatışması/temsil`, `Dunhuang`, `iki-beşik`. Etiket düzeyinde doygunluk yok. Aile düzeyinde çoğu yeni kod mevcut ailelere giriyor; yeni aile yalnız `anlatı-çatışması/temsil`.

## 5. Kodlamada görülen yapısal gözlemler (yazar için)

- **Adlandırma aynası:** Aynı 2015 MoU'sunu Çin MFA readout'u yalnız "共同推进'一带一路'建设谅解备忘录" diye anıyor (A08). Resmî adı ise Orta Koridor'u da içeriyor (A07). Türk kaynakları ise aynı tren güzergâhını yalnız "Middle Corridor" diye anıyor (A16) ve "Türkiye'den başlayan" koridor diye tarif ediyor (A18). Çin 2025'te güzergâhı "China-Europe Railway Express güney hattı" diye markalıyor (A22).
- **Girişim/plan hiyerarşisi:** Çin kaynakları "一带一路**倡议**" (girişim) ile "中间走廊**计划**" (plan) (A13, A19) ve Türkçe A17'de "inisiyatif" ile "proje" ayrımını yapıyor. Kodlamaya yansıtılmadı (İB), ama Ö2 için kanıt adayı.
- **Sıralama:** TR kaynağı "Orta Koridor ile Yol ve Kuşak" (A23), CN kaynakları "Kuşak ve Yol ile Orta Koridor" sırasını kullanıyor.
- **Uygulama gecikmesi:** MoU 2015'te imzalandı; ilk çalışma grubu toplantısı Kasım 2024'te yapıldı (A24).
- **Xi'an forumunda sessizlik:** A15 (Xi'an Dünya Kültür ve Turizm Forumu) İpek Yolu'ndan hiç söz etmiyor. Yerine Türkiye'nin UNESCO envanterini ve Göbeklitepe'yi "tarihin başladığı yer" olarak koyuyor. Sessizlik kod birimi olamadığı için yalnız burada not edildi.
- **Söylem-akış açığı izleri:** A10 (250 bin → 500 bin hedefi), A12 (240 bin → 500 bin → 1 milyon), A14 (400 bin → 1 milyon), A15 ("beklentinin altında", 500 bin → 1 milyon), A21 (410 bin → 1 milyon). Hedef 2018'den 2025'e sabit "1 milyon" olarak kalıyor ve hiç ulaşılmıyor.
- **Akış asimetrisi:** A12'de Türk tarafı Çin'in vize politikasını ve Türk operatörlerinin Çin pazarına erişimini engel olarak anıyor. Değer yakalama arenasında Türk tarafı tek yönlü kapalılık şikâyeti dile getiriyor.

## 6. Arena başına en güçlü alıntılar

### A1 Bağlantısallık
1. A06 (CN, İB): "“一带一路”建设秉持的是共商、共建、共享原则，……不是中国一家的独奏，而是沿线国家的合唱。" (Çin'in solosu değil, güzergâh ülkelerinin korosu)
2. A07 (ORT, KR): "bir taraftan Orta Koridor ve Kuşak ve Yola ilişkin Kervansaray projeleri gibi Türk girişimlerini Kuşak ve Yol ile bütünleştirirken Kuşak ve Yol Girişimine yönelik işbirliğini ortaklaşa teşvik ederler."
3. A08 (CN, RK/NEG): "会见后，两国元首共同见证了关于共推“一带一路”建设的谅解备忘录" (MoU'nun Orta Koridor'suz adı)
4. A18 (TR, RK/NEG): "This is why we put forth the Middle Corridor initiative, which starts from Türkiye in the west, and after crossing the Caucasus, the Caspian Sea and the Central Asian Republics, reaches China."
5. A18 (TR, İB): "In 2015, we have signed a Memorandum of Understanding (MoU) with China, to align the two initiatives in order to avoid duplications, raise efficiencies and increase our cooperation."
6. A22 (CN, RK/NEG): "advance the development of the southbound passage of the China-Europe Railway Express"
7. A14 (TR, İB): "Sivil havacılıktaki ikili işbirliğimize her daim “kazan-kazan” ilkesiyle yaklaştık."
8. A16 (TR, RK/NEG): "Turkey’s strategic location at the intersection of the European, Middle Eastern and African markets has a crucial role in strengthening business resilience."

### A2 Turist akışı
1. A12 (TR, İB): "A visa free policy for both sides is our ultimate goal."
2. A12 (TR, RK): "Firstly, the Chinese authorities' visa policy needs to be revisited."
3. A15 (TR, RK): "From a Turkish-Chinese tourism perspective, despite the sharp rises in the number of Chinese visitors to Turkey for the last two years, it is still below our expectations."
4. A09 (CN, RK): "希望土方从安全和服务等方面加强对中国游客的保障。"
5. A14 (TR, İB): "2018 yılı Çin’de Türkiye Turizm Yılı olarak kutlanmıştır. Bir önceki yıla göre %64 artışla Çin’den 400 bini aşkın turist Türkiye’yi ziyaret etmiştir."
6. A20 (CN, İB): "双方就促进两国人文交流、推动双向游客往来等交换了意见。"
7. A18 (TR, İB): "And vice-versa, I hope more Turkish tourists will visit the historic city of Xi’an treasuring house of relics and ancient sites, as the cradle of Chinese civilization."

### A3 Anlatı
1. A17 (CN, RK): "Binlerce yıldır，Çin, Türkiye’nin de aralarında olduğu güzergah üzerindeki halklarla birlikte İpek Yolu'nun ortaya çıkışını ve refahını desteklemiş, …"
2. A06 (CN, RK): "土耳其是古丝绸之路的重要一站，也是“一带一路”建设的重要一环。"
3. A04 (TR, KR): "Therefore, no wonder the Silk Road which began in Xi’an ended in Istanbul for two millenia."
4. A15 (TR, RK): "I proudly announce here that this place, where the history has begun, is located in Şanlıurfa, the city where my hometown is."
5. A21 (CN/Xinhua–TR bakan, RK): "In response, Türkiye is spotlighting a broader array of destinations, including Silk Road routes that span the country, …"
6. A07 (ORT, RK): "İpek Yolu ruhunun canlandırılması ve İpek Yolunun anlamının yeni çağın özelliklerine göre zenginleştirilmesi gayretiyle Kuşak ve Yol Girişiminin önerildiğini göz önüne alarak;"
7. A19 (CN, İB/NEG): "中土分别位于亚欧大陆东西两端，千年丝绸之路将两国紧密联系在一起。"
8. A24 (TR, RK): "Some seem to have totally wrong/inaccurate sources based on orientalism and even old-style imperialism."

### A4 Değer yakalama
1. A12 (TR, RK): "The tourism market in China should also be more accessible for Turkish operators, …"
2. A21 (CN/Xinhua–TR bakan, RK): "The ministry also created active accounts on social platforms which allow Türkiye to engage directly with Chinese travelers and promote the country's diverse tourism offerings"
3. A12 (TR, İB/NEG): "Visa fees can also be paid with different payment methods including AliPay."
4. A12 (TR, RK): "Due to the fact that 130 million Chinese tourists traveled abroad last year, they will undoubtedly contribute to boosting Turkey's tourism sector."
5. A07 (ORT, KR): "RMB sınır ötesi düzenlemesinin iyileştirilmesi ve ikili işbirliği ihtiyacını karşılanması için ticarette ve yatırımda yerel ülke para birimlerinin kullanımının genişletilmesi …"
6. A23 (TR, KR): "Cumhurbaşkanı Erdoğan, ikili ticaretin dengeli ve sürdürülebilir kılınması için yatırımlarla desteklenmesi gerektiğini, …"
7. A04 (TR, RK): "In the case of the Turkish Airlines, growth is almost an automatic concept which fuels our tourism and service sectors in Turkey."

(Bu bölümdeki "…" işaretleri kısaltmadır; tam ve birebir metin CSV'dedir.)

## 7. Kodbook boşlukları (v2 için)

1. **Nötr / tek taraflı kategori yok.** İB–RK–KR üçlüsü, ortak özne de ayrışan konumlanma da içermeyen tek taraflı hedef, tanıtım ve kolaylaştırma birimlerini zorla sınıflatıyor. "TT (tek taraflı, karşı tarafa yönelmeyen)" gibi bir kod ya da bu bölümdeki karar kuralı 1–2 kodbook'a yazılmalı. Ö3 sonucu bu karara duyarlı.
2. **Halklar arası/kültürel değişimin arenası tanımsız.** Kültür yılları, enstitüler, medya işbirliği bu turda A2'ye kondu. İpek Yolu dışı kültürel markalar (Mevlana, UNESCO envanteri) A3'e kondu. A3'ün tanımı yalnız "İpek Yolu'nun merkezi/başlangıcı/sahibi" olduğu için bu genişletme açıkça kurala bağlanmalı.
3. **"Köprü/kavşak" iddiası iki arenada.** Kodbook "köprü"yü A3 örneği sayıyor, ama aynı iddia lojistik/hub bağlamında A1'de RK üretiyor ve NEG'lerin önemli kısmı buradan geliyor. Bağlama göre ayrım kuralı gerekiyor.
4. **Uçuşlar A1 mi A2 mi?** Kodbook uçuş anlaşmasını A1'e koyuyor. Turizm amaçlı uçuş söylemi A2 ile örtüşüyor. Bu turda "uçuş = A1, uçuş + açık turist/tanıtım amacı = A2" uygulandı.
5. **Konuşan ile kaynak (TARAF).** Çin kaynağında aktarılan Türk sözcülerin (ve tersi) taraf kodu belirsiz. Ayrı bir `konusan` sütunu önerilir. Bu, A21 ve "BRI'ye katılım" KR'lerinin yorumunu doğrudan etkiliyor.
6. **Adlandırma ve dışlama birimleri.** "Diğerini görmezden gelme" çoğu zaman bir yokluktur (Orta Koridor'un anılmaması, A15'te İpek Yolu sessizliği). Yokluğun ne zaman birim sayılacağına dair kural yok. Bu turda yalnız adlandırmanın açıkça tek taraflı olduğu birimler RK alındı.
7. **A4 gizil/yapısal değer yakalama.** Söylem işbirlikçi, mekanizma ise değer yakalayıcı olabiliyor (AliPay, AIIB/İpek Yolu Fonu, Çinli müteahhitler). Söylem kodu ile yapısal yorum için ayrı bir işaret (ör. `gizil-RK`) önerilir. Aksi halde A4 NEG'leri (8) yanıltıcı olabilir.
8. **A4'ün turizm dışı kapsamı.** Ticaret dengesizliği ve ihracat kazancı (A16, A23) A4'e alındı. Kodbook A4'ü turist harcamasıyla sınırlıyorsa bunlar çıkarılmalı (2 birim).
