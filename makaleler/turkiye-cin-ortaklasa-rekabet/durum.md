# Proje: Türkiye–Çin İlişkilerinde Ortaklaşa Rekabet: İpek Yolu Turizmi
**Kurulum tarihi:** 2026-10-07
**Yazar:** Dr. Caner Güçlü (tek yazar; YZ yardımı beyan edilecek)
**Mevcut faz:** 3 — KAYNAK (+ doküman korpusu derleme)
**Kapı durumu:** AÇIK
**Sıradaki worker:** Faz 3 — ledger 30'a + doküman korpusu (A/B) derleme
**Hedef dergi (taslak):** NEVÜ SBE Dergisi — "Türkiye-Çin Diplomatik İlişkileri" özel sayısı (ek başvuru 10.10.2026 00:01 – 11.10.2026 23:59 TSİ)
**Konum:** bulut oturumu — repo `cnrgcl/cnr`, `makaleler/turkiye-cin-ortaklasa-rekabet/`; kullanıcı `C:\Users\kadir\Yandex.Disk\1_CALISMALAR\03_KAYNAK-KESIF\` altına kopyalayacak

---

## Faz Tablosu
| # | Faz | Durum | Tarih | Worker |
|---|---|---|---|---|
| 0 | VAZGEÇİRME | ✓ tamam | 2026-10-07 | editör + caner-editör |
| 1 | PLAN | ✓ tamam | 2026-10-07 | proje-baslat |
| 2 | KEŞİF | ✓ tamam | 2026-10-07 | kuramsal-mercek, konu-kesfet, yontem-kilavuzu |
| 3 | KAYNAK | → açık | 2026-10-07 | — |
| 4 | VERİ | kilitli | — | — |
| 5 | YAZIM | kilitli | — | — |
| 6 | KALİTE | kilitli | — | — |
| 7 | GÖNDERİM | kilitli | — | — |
| 8 | REVİZYON | kilitli | — | — |

Durum sembolleri: ✓ tamam · → açık · İŞLEMDE · kilitli · ATLANDI

---

## Aktif Kapının Kriterleri

- [x] Kuramsal mercek + sentez modeli blueprint §3'e kilitli
- [x] Sorunsallaştırma yapıldı (boşluk-avcılığı katkı sayılmaz)
- [x] Araştırma sorusu kilitli
- [x] ≥1 hipotez / araştırma önermesi
- [x] §3b kavram tablosu dolu (bilinmeyen hücreler `<KAYNAK YOK>`)
- [x] §3c kavramsal model şekli üretildi (`kavramsal_model.py` çıkış 0)
- [x] Yöntem ailesi yontem-kilavuzu ile seçilip §5-§6'ya kilitli
- [x] Undermind promptu teslim edildi (kullanıcı aramayı kendisi koştu, 191 kayıt)

---

## Karar Notları (chronological, append-only)

[2026-10-07 02:00] Editör: Faz 0 Hafif Vazgeçirme. Karar: DEVAM (riskle). Riskler: (1) 4 günlük takvim — ekonomi modu zorunlu; (2) özel sayı yalnız araştırma makalesi alıyor, gevşek doküman analizi "derleme" sayılıp masa reddi yer — yöntem sistematik doküman analizi olarak sıkı kurulacak, kodlama tablosu metinde; (3) Çin/Uygur ton riski — Sincan/kimlik siyaseti kapsam dışı ilan edilecek.
[2026-10-07 02:00] Caner-editör: katkı sorusu → KARAR: DEVAM, katkı reframe: İpek Yolu ortak miras/marka; değer yaratma–değer yakalama gerilimi üzerinden "miras ortaklaşa rekabeti", 4 arenalı tipoloji (anlatı, turist akışı, değer yakalama, bağlantısallık). Sürpriz: açılış örneği Orta Koridor vs Kuşak-Yol adlandırması (doğrulanmalı); Ahlat bu makaleden çıkarıldı (ikinci makaleye: Seferi + Çinli turist dijital deneyimi).
[2026-10-07 02:10] Editör: kullanıcı tek yazar olduğunu bildirdi; hedef alt klasör 03_KAYNAK-KESIF. Yandex.Disk'e bulut oturumundan erişilemiyor → proje repo içinde kuruldu. `eski-nesil-ve-ortak` talebi klasör kuralı (dokunma) gereği uygulanmadı.
[2026-10-07 02:12] proje-baslat: tamam, editöre devrediliyor
[2026-10-07 02:15] Editör: Faz 1 kapı kriterleri dosyada doğrulandı (blueprint.md v1, durum.md, ledger.md, hedef dergi). Faz 1 ✓ → Faz 2 açıldı. Önceki kriterler: 4/4 ✓.
[2026-10-07 02:25] Caner-editör: konu mantıklı mı → KARAR: DEVAM, korpus yeniden tasarlanacak (ikili resmî belgeler = iş birliği; iki ülkenin tek taraflı İpek Yolu tanıtım anlatıları karşılaştırmalı = rekabet). Sürpriz: resmî ikili belgeler rekabeti yapısal olarak gizler; rekabet ortak metinde değil, iki ülkenin ayrı ayrı çizdiği İpek Yolu haritasında görünür.
[2026-10-07 02:45] Editör: Faz 3 intake Faz 2 kapanmadan başladı (takvim baskısı; kullanıcı Undermind derin aramasını kendisi koştu). MANUEL SIRA DEĞİŞİKLİĞİ: Undermind arama "Turkey China Silk Road Tourism Coopetition" (workspace 512f3a75… — restoran MASEM alanına kaydedilmiş) → 191 kayıt `arama/undermind-2026-10-07.ris`, `arama/adaylar.csv`. İlk 50 (r≥0.91) `arama/tarama-durumu.csv`'de triyajlı; 43'ü r≥1. Atıf doğrulaması: Crossref/doi.org ağ politikası tarafından engellendi → kayıtlar Undermind indeksinden (gerçek kayıt) ama DOI çözümlemesi bekliyor; kalite kapısından önce tamamlanacak.
[2026-10-07 02:45] Editör: BOŞLUK DARALDI. Redi & Pulido Fernández 2018 [Red18] UNWTO İpek Yolu Programı'nı "destinasyonlar arası ortaklaşa rekabet" olarak zaten inceliyor. Katkı cümlesi revize: çok taraflı program düzeyi değil, İKİ DEVLET arası (Türkiye–Çin) ve anlatı otoritesi + değer yakalama arenaları. Destek: Sinomerkezci tarihselleştirme yazını [Sci22, Win20, Win20b, Nak22, Bro24] anlatı arenasını kanıtlıyor; Niu19 2018 Türkiye Turizm Yılı'nı (Çin'de) doğruluyor.
[2026-10-07 03:20] kuramsal-mercek: Kritik realizm + Hart/sorunsallaştırma/huni kilitlendi (kullanıcı 'devam' dedi, editör seçti). §3b kavram tablosu 9 satır; 3 hücre <KAYNAK TEYİT>, 2 hücre <KAYNAK YOK>. Değer yakalama arenası kanıt zayıflığı nedeniyle düşebilir.
[2026-10-07 03:40] Editör: Kullanıcı TÜİK 01_turizm zip'ini yükledi. Çin serisi 2000–2025 birincil kaynaktan çıkarıldı (ham-veri/cinli-ziyaretci-tuik.csv; kaynak xls'ler ham-veri/tuik-kaynak/). Çin payı yabancı girişlerde 2018'de %0,998 ile zirve, 2025'te %0,806. Pal24 tablosunda 2021 (26.000 ↔ TÜİK 33.641) hatalı. 2026 aylık veri yok → vize muafiyeti iddiası hâlâ doğrulanmadı.
[2026-10-07 04:10] konu-kesfet: tamam, §1-§3c ve §10 dolu, Şekil 1 üretildi (kavramsal_model.py çıkış 0; elle yeniden yerleşim). Kalan Faz 2 kriterleri: yöntem kilidi (§5-§6), Undermind promptu (kullanıcı aramayı zaten koştu → teslim edilmiş sayılabilir).
[2026-10-07 04:25] Kullanıcı: 'rekabetin sonucu ne?' → Ö5 eklendi (Rekabet → Turist akışı, −). Yeni kutu yerine ok: değer dağılımı için veri yok, kutu kanıtsız kalırdı. Ö4 ± → +. Şekil yeniden üretildi (doğrulama çıkış 0, 5 kavram 5 yol).
[2026-10-07 04:40] yontem-kilavuzu (Şapka 1): §5–§6 kilitlendi — tek durumlu iç içe örnek olay + sistematik doküman analizi; korpus A/B, 30–50 belge bandı, kodbook v1, Ö3 karar eşiği veriden önce yazıldı; YZ ikinci kodlayıcı (beyan edilecek).
[2026-10-07 04:40] Editör: Faz 2 kapı kriterleri dosyada doğrulandı (8/8). Faz 2 ✓ → Faz 3 açıldı (EKONOMİ: graphify yerine ledger + Undermind okuma; atıf doğrulaması Crossref engelli → Undermind indeksi).
[2026-10-07 05:00] Editör: Vize muafiyeti doğrulandı — 2 Ocak 2026, TEK TARAFLI (Çin karşılık vermedi). Anlatı/akış arenası için kritik olgu: Türkiye Çinli turisti çekmek için asimetrik taviz veriyor (A2, TR, RK/KR adayı). Ağ: WebFetch tüm hedeflerde EGRESS_BLOCKED (mfa.gov.tr, gov.cn, basın); yalnız WebSearch özetleri. Korpus tam metinleri kullanıcıdan ya da ağ izni genişletilerek gelecek.
[2026-10-07 05:30] Editör: Ağ izni genişletildi. Crossref atıf ön-doğrulaması: 166 DOI → 154 DOĞRULANDI + 4 başlık varyantı (TR/İng. başlık, kısaltma) + 1 kısmi (uzun başlık) + 4 Crossref dışı kayıt kuruluşu (DataCite vb.) + 3 tekrar denemede doğrulandı; SAHTE/REDDEDİLEN: 0 (%0 < %5). Künye düzeltmeleri: Pal24 = Palidan, M. (2024); Sci22 = Sciorati, G.; Deb21 = Debarbieux vd.; Sir18 = Sirisuthikul, V. Korpus A ve B derlemesi alt-ajanlara verildi.
[2026-10-07 06:00] Editör: Korpus B derlendi — 24 belge (12 TR / 12 CN), 7 erişilemedi (envanterde). Örneklem kontrolü geçti (B07, B14, B19, B22 alıntıları dosyada doğrulandı). Sınırlılık: 8 TR belge tarihsiz (web tanıtım sayfası). Ön gözlem: CN belgelerinde Türkiye'ye rol verilmiyor (B11 beyaz kitapta Orta Koridor yok); TR belgeleri Çin'i başlangıç kabul edip kendini köprü/merkez konumluyor → tanınma asimetrisi (anlatı arenası).
[2026-10-07 06:40] Editör: Korpus A derlendi — 25 belge (TR 11 / CN 12 / ORT 2; 2010–14: 5, 2015–19: 9, 2020–26: 11), 5 erişilemedi. Spot kontrol: A04 alıntısı ("the Silk Road which began in Xi'an ended in Istanbul") dosyada ✓; A07 (Antalya MoU, RG 07.06.2017 Sayı 30089) elle transkripsiyon s.3 tarama görüntüsüyle karşılaştırıldı ✓ — alıntılar yine de PDF'ten teyit edilecek. Toplam korpus: 49 belge (A 25 + B 24), başlangıç bandı (30–50) içinde.
[2026-10-07 06:50] Editör: GERİ DÖNÜŞ-sız yöntem revizyonu (blueprint v3, veri kodlanmadan ÖNCE): birincil kodlayıcı YZ, yazar denetçi + bağımsız 10 belge κ. Kullanıcı onayladı.
[2026-10-07 06:50] Editör: MANUEL OVERRIDE — graphify atlandı. Gerekçe: graphify ve atif_kapisi.py kullanıcının yerel makinesinde (C:\Users\kadir\...); bulut oturumunda kurulu değil; literatür PDF'lerinin çoğu paywall'lı ve elde değil; 4 günlük takvim. İkame: atıf ön-doğrulaması Crossref ile yapıldı (%0 red); sentez/çelişki haritası ledger Sentez Tablosu'nda elle kurulacak; literatür bölümü öncesi kullanıcı isterse yerelde graphify koşturulabilir. kalite-denetimi bu notu okur ve sertleşir.
