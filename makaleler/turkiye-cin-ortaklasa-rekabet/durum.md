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
[2026-10-07 08:10] Editör: YZ birincil kodlaması tamam — 368 birim (A 179 + B 189); 368/368 alıntı korpusta verbatim bulundu. Ön-kayıtlı Ö3 kuralı (RK %): A1 26,2 → A2 28,8 → A3 52,5 → A4 51,3; A1→A4 farkı 25,1 yp ≥ 20 → DESTEK (kural 'monoton YA DA ≥20 yp'; A3→A4 küçük düşüş raporlanacak). Kodbook boşlukları (iki alt-ajan bağımsız benzer tespit): kültürel değişim arenası, 'tanınma-yok'/ihmal kuralı, belirsiz arena yönü, KR'nin Ö3'teki yeri, konuşan≠yayımlayan. Kodbook v2 YALNIZ bu boşluklar için, sonuçlar v1 ve v2 ile birlikte raporlanacak (araştırmacı serbestlik derecesi koruması). Sonuçlar yazara, bağımsız kodlaması bitene kadar GÖSTERİLMİYOR.
[2026-10-07 09:30] Editör: Bağımsız kodlama (yazar, 40 birim) ↔ YZ uyumu: ALAN uyum %60, κ=0,46 (orta); YÖNELİM uyum %37,5, κ=0,05 (şans düzeyi); ikili (rekabet izi var/yok) κ=−0,03. Hedef κ≥0,70 KARŞILANMADI. Ana uyuşmazlık: yazar KR (10 birimde) ↔ YZ İB; yazar A1 ↔ YZ A3 (5). Karar önerisi: kalibrasyon turu (uyuşmazlık tartışması + kodbook v2) + YENİ bağımsız alt örneklemle 2. tur κ; iki tur da raporlanacak. Ö3 bulgusu güvenirlik sağlanana kadar YAZILMAZ.
[2026-10-07 09:45] Caner-editör: güvenirlik çöküşü → KARAR: (c)+(a-kısa) — yönelim yalnız açık (manifest) sözcüksel işaretlerle (kodbook v2), 368 birim yeniden kodlanır, yazar 20 YENİ birimde evet/hayır işaret soruları ile 2. tur κ; iki tur da raporlanır; yazarın yerine YZ kodlaması YASAK. Sürpriz: yazarın örtük K okuması (latent) ile manifest İB arasındaki fark tartışmada bulgu olarak işlenir.
[2026-10-07 10:05] Editör: Kullanıcı 2. turda caner'in (YZ) yerine kodlamasını istedi → REDDEDİLDİ (YZ↔YZ uyumu insan–YZ κ olarak raporlanamaz; uydurma veri). 2. tur 1/20'de açık bırakıldı. Varsayılan: kullanıcı tamamlayana kadar yazım sürer; tamamlanmazsa yöntemde DÜRÜST rapor: YZ birincil kodlama (manifest kurallar) + iki bağımsız YZ kodlamasının tutarlılığı + yazarın 1. tur örtük okuması κ=0,05 tartışmada.
[2026-10-07 10:15] Editör: Kullanıcı 'silikon Caner' istedi → YZ-persona ikinci kodlayıcı (silicon sampling) başlatıldı: 60 birim (1. turun 40'ı + 2. turun 20'si), kodbook v2, diğer kodlayıcıların dosyalarına erişim yasak (talimatla; teknik olarak zorlanamadı → sınırlılık). Raporlama: insan kodlayıcı DEĞİL, 'LLM-persona ikinci kodlayıcı'; ayrıca persona ↔ gerçek yazar (40 birim) uyumu ölçülecek (silicon sampling geçerlilik notu).
[2026-10-07 10:30] Editör: Silikon Caner ↔ gerçek yazar (1. tur 40 birim): alan %65, κ=0,50; yönelim %33, κ=0,14 (NÖ hariç n=28: κ=0,21). Persona yazarın örtük okumasını taklit EDEMEDİ (silicon sampling geçerlilik sınırı — yöntem notu). Ana YZ v2 yeniden kodlaması bekleniyor; ardından v2 ↔ silikon κ.
[2026-10-07 10:50] Editör: 2. tur kodlama anketi yayımlandı (artifact NDznCUa368imrhr5mJULbt, db koleksiyonu 'yanitlar'; 19 birim, 1. madde sohbette kodlandı).
[2026-10-07 11:10] Editör: Kodbook v2 yeniden kodlaması (368): yönelim değişimi 151/368 (çoğu örtük okumadan NÖ'ye). v2 ↔ silikon YZ-persona (60 birim): alan κ=0,79; M1 0,67; M2 0,75; M3 0,66; yönelim κ=0,64 (uyum %75) — açık-işaret kuralları iki YZ kodlayıcı arasında makul tutarlı (hedef 0,70'in hemen altı). İnsan 2. tur (anket) bekleniyor.
[2026-10-07 11:10] Editör: Ö3 (ön-kayıtlı kural, v2): RK% NÖ hariç A1 35,7 → A2 35,9 → A3 50,0 → A4 52,2 = MONOTON → DESTEK; RK% NÖ dahil 29,7 / 23,9 / 33,0 / 36,4 = monoton değil, A1→A4 6,7 yp → DESTEK YOK. Sonuç payda tanımına DUYARLI (NÖ ön-kayıtta tanımlı değildi) → bulgu 'kırılgan/kısmi destek' olarak yazılacak; v1 (destek) ve v2 iki tanımıyla birlikte raporlanacak. Korpus A tek başına sıralamayı bozuyor (A3<A2); TR kaynaklarında monoton, CN'de değil → taraf asimetrisi ana bulgu adayı.
[2026-10-07 11:40] Editör: Kullanıcı ek bağımsız kodlayıcı bulacak → 368 ifadelik çoklu kodlayıcı formu yayımlandı (artifact Cay3eMjgskdHNBW8MHFAhG; db 'kodlar/<kodlayıcı id>', kural: her kodlayıcı yalnız kendininkini okur/yazar, sahip hepsini okur — 'interact' seviyesinde test: başkalarının kodları görünmüyor). Kodlayıcılar Katkıda Bulunan (Contributor) yetkisi ve oturum ister; kurum dışı kişiler yalnız 'view' alır → yedek CSV ile gönderir. Eşleme: analiz/coklu-kodlayici-ifade-esleme.csv.
[2026-10-07 12:20] Editör: Faz 4 betimsel analiz tamam — analiz/analiz.py → stats.json, bulgular-ozet.md, Şekil 2 (TÜİK serisi), Şekil 3 (RK% alan × taraf). Ö3: koşullu destek (payda duyarlı). Kaynak defteri tamamlama alt-ajanda.
[2026-10-07 12:45] Editör: KRİTİK — NEVÜ SBE Dergisi YZ Kullanım Politikası okundu (dergipark.org.tr/tr/pub/nevsosbilen/page/21441): YASAK — Bulgular/Tartışma/Sonuç bölümlerinin YZ'ye yazdırılması; YZ ile üretilmiş sentetik veri/grafik/görsel; sahte atıf. SERBEST — dil desteği, çeviri, literatür taraması, veri özetleme (atıflar yazarca teyitli). ZORUNLU — 'Üretken Yapay Zeka Kullanım Beyanı'. Plan değişikliği: Bulgular/Tartışma/Sonuç YAZAR yazar (YZ yalnız iskelet + dil düzeltmesi); şekiller yazarca Excel'de yeniden çizilmesi önerildi (veri hazır); kodlama için yazar 30 birimlik onay denetimi önerildi.
[2026-10-07 12:45] Editör: Kullanıcı 'birinci kodlayıcı yeter' dedi → ek insan kodlayıcı aranmayacak (çoklu kodlayıcı formu açık kalır, isteğe bağlı). Güvenirlik raporu: YZ birincil + YZ-persona ikinci (κ=0,64) + yazar 1. tur (κ=0,05) + (yapılırsa) yazar onay oranı.
[2026-10-07 13:00] Editör: Kullanıcı kararı — YZ kodlayıcı OLMAYACAK; iki insan kodlayıcı bulunacak. Kodlayıcı paketi: kodlayici-paketi/ipek-yolu-kodlama-formu.xlsx (368 ifade, açılır listeli, kurallar sayfası, ilerleme sayacı) + çevrimiçi form (artifact Cay3eMjgskdHNBW8MHFAhG). YZ kodları (v1/v2, silikon) analizde KULLANILMAYACAK; yalnız süreç kaydı olarak arşivde kalır, yöntemde 'pilot' olarak beyan edilir. Bölümleme ve Çince çeviriler YZ destekli → beyanda yazılacak. Bulgular insan kodları geldikten sonra yeniden hesaplanacak (analiz.py hazır).
[2026-10-07 13:20] Editör: Ledger 43 kaynak (TR 14 / uluslararası 29; ≥%30 kotalar sağlandı), references.bib 43; Bowen 2009 eklendi; rastgele 5 DOI Crossref'te yeniden doğrulandı ✓. Okuma seviyesi: 11 YZ tam metin, kalanı abstract — Yazar-Okuma Asimetrisi riski; kritik PDF'ler (Bengtsson & Kock 2000 [11], Redi & Pulido [18], Sciorati [27], Nakano [28], Niu & Li [32], Wang & Sun [38]) kullanıcıdan istenecek. Faz 3 kapısı: graphify MANUEL OVERRIDE (önceki not); ustabaşı ekonomi modunda Faz 5 ile birlikte koşulacak.
[2026-10-07 13:45] Editör: Dergi yazım kuralları dergi-kurallari.md'ye işlendi (6–12 bin kelime toplam; Giriş/Yöntem/Bulgular/Tartışma ve Sonuç; Öz+Abstract 150–200; Extended Summary ≥400; benzerlik ≤%20/≤%2; yılda 1 makale kuralı). etik.json (ikincil veri muafiyeti) yazıldı. Yapı kararı: kuramsal çerçeve Giriş altında alt başlıklar (1.1–1.3) olarak.
[2026-10-07 14:50] Editör: Kodlanmış Excel geldi (368/368 tam, 8 not). KAYNAK TEYİDİ BEKLİYOR — işaretler: (1) dosya 11:02 UTC'de programatik olarak yeniden oluşturulmuş (Kurallar sayfası ve veri doğrulama düşmüş; creator=openpyxl), 11:43'te 'caner güçlü' tarafından kaydedilmiş; (2) 1.472 karar ~41 dk (<2 sn/karar); (3) notlar kodbook ifadelerini tekrarlıyor (YZ çıktısına benzer). Kodlayıcı kimliği ve YZ aracı kullanımı kullanıcıya soruldu; teyit olmadan κ/bulgu hesabına ALINMAYACAK.
[2026-10-07 15:00] Editör: Kullanıcı son yüklediği kodlama dosyasını geri çekti ('yok say'). Dosya projeden kaldırıldı; analizde kullanılmayacak. İki insan kodlayıcının dosyaları bekleniyor.

[2026-10-07 12:40] Kullanıcı kuralı (kalıcı, repo kökü CLAUDE.md): "yaratma" yalnız Allah için; diğer her yerde "oluşturma". blueprint, ledger, literatür iskeleti, kodbook-v1, kavramsal-model.json ve Şekil 1 güncellendi ("değer yaratma" → "değer oluşturma"); Şekil 1 yeniden çizildi.

[2026-10-07 12:44] [11] Bengtsson & Kock 2000 tam metni kullanıcıdan geldi, okundu: Önerme 2 (s. 421) Ö3 dayanağını teyit ediyor. Yeni uyarılar: pazar temelli karşı örüntü (s. 420) Ö3 için rakip açıklama; dar rakip tanımı (s. 415) blueprint §3b'de netleşmeli. Not: okuma-notlari/11-bengtsson-kock-2000.md. Kalan PDF: [12], [18].

[2026-10-07 12:46] [12] için yüklenen PDF kitap değil, BusinessSummaries.com özeti (7 s.). Asimetri sürüyor; [12] yalnız genel kavram atfıyla kullanılacak. Not: okuma-notlari/12-brandenburger-nalebuff-1996.md

[2026-10-07 12:53] [18] Redi & Pulido Fernández 2018 tam metni bulunamadı (Google Books bot erişimine kapalı; kullanıcı da erişemedi). KARAR: yalnız özet düzeyinde kullanılacak, alıntı yok; Yazar-Okuma Asimetrisi uyarısı açık kalır.

[2026-10-07 13:01] Faz 5 literatür v1 yazıldı (bolumler/literatur-v1.md, ~2.250 kelime): 4 alt bölüm, 4 gerilim (sınanmamış uzlaşı, kavram çatallanması, bağlam sınırı, bulgu çelişkisi), katalog sayacı 1/2, corpus-dışı 0, başlık değişen 3 (yüzeysel), Q1 rapor ihlali 0 (1 uyarı). 47 çapa; 38 özet çapası Crossref/OpenAlex verbatim ile eşleşti. Denetim: bolumler/literatur-denetim.md. Sıradaki: ustabaşı Faz 5 kapısı.

[2026-10-07 13:01] Ustabaşı: literatur-yazim → ŞARTLI GEÇ (şart: bolumler/literatur-v1.md / ÇAPA YOK [12][14][19] ve TEYİT [05] atıfları yazar PDF teyidiyle ya da genel-kavram düzeyinde bırakılarak kapatılacak; atif_kapisi.py yerine özet-verbatim kontrolü MANUEL OVERRIDE kapsamında kabul / Faz 6'da kapanır). Faz 3 kapısı (ekonomi modu) aynı koşumda: korpus+ledger yeterli, graphify OVERRIDE geçerli.

[2026-10-07 13:07] Blueprint v4 (güvenirlik: iki insan kodlayıcı). Yazıldı: bolumler/giris-acilis-v1.md (~560 kelime), bolumler/bulgular-tartisma-iskelet.md (yazar için başlık/tablo planı; YZ yazmaz), bolumler/yz-beyani-v1.md. Vercel 'deployment failed' mailleri repodaki seferi-web/app projelerinden; makaleyle ilgisiz, kullanıcı sonra halledecek. Turnitin 06.10.2026 Türkçe YZ tespiti duyurusu → Faz 6 ses denetimi kritik.

[2026-10-07 13:37] Şablon indirildi (DergiPark 260506; nevsehir.edu.tr 260703 bağlantısı 404) + yazar bilgi, telif, etik beyan formları (ekler/dergi-formlari/). Şablondan yeni kurallar: Giriş altında alt başlık YASAK → literatür '2. Kuramsal Çerçeve' (2.1–2.4), Yöntem 3, Bulgular 4, Tartışma ve Sonuç 5; Extended Summary 750–1.000 kelime (eski ≥400 notu yanlıştı). teslim/makale-anonim-taslak-v1.docx üretildi (araclar/sablona_yerlestir.py; kaynakça araclar/kaynakca.py, 46 APA kaydı); validate PASSED; önizleme 18 s., ~5.960 kelime. references.bib'e 4 kurumsal kaynak eklendi (TÜİK 2026, RG 2017, ÇHC KTB 2024, TGA 2026).

[2026-10-07 14:35] Öz/Abstract/Extended Summary taslağı yazıldı (bolumler/ozet-v1.md; Öz 136+yt, Abstract 163+yt, ExtSum 731+yt kelime). Bulgu/sonuç cümleleri YER TUTUCU (insan kodlaması yok → uydurma veri riski). ExtSum atıfları İngilizce APA (&, et al.). Çoklu atıf sırası alfabetik düzeltildi (literatür 3 yer). Şablon betiği özetleri ozet-v1.md'den okuyor; docx yeniden üretildi, validate PASSED, önizleme 19 s.

[2026-10-07 14:58] Kullanıcı geri bildirimi: cümleler/paragraflar arası ilişki yok. Tanı + v2: Giriş, Kuramsal Çerçeve, Yöntem, Öz/Abstract/Extended Summary bağlantılı yeniden yazıldı (her bölümde iddia zinciri notu; özne sürekliliği, açık bağlaçlar, paragraf köprüleri). Tuna vd. 2022 çıkarıldı (kaynakça 45). Kalıcı kurallar CLAUDE.md'ye: 'yazın' değil 'literatür'; bağlantılı yazım ilkeleri. Yardımcı dosyalarda yazın→literatür (durum.md geçmiş kayıtları hariç). 47 çapa yeniden eşleşti; docx yeniden üretildi, validate PASSED.
