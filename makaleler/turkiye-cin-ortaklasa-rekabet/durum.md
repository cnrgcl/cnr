# Proje: Türkiye–Çin İlişkilerinde Ortaklaşa Rekabet: İpek Yolu Turizmi
**Kurulum tarihi:** 2026-10-07
**Yazar:** Dr. Caner Güçlü (tek yazar; YZ yardımı beyan edilecek)
**Mevcut faz:** 2 — KEŞİF
**Kapı durumu:** AÇIK
**Sıradaki worker:** kuramsal-mercek → konu-kesfet → yontem-kilavuzu → undermind-prompt
**Hedef dergi (taslak):** NEVÜ SBE Dergisi — "Türkiye-Çin Diplomatik İlişkileri" özel sayısı (ek başvuru 10.10.2026 00:01 – 11.10.2026 23:59 TSİ)
**Konum:** bulut oturumu — repo `cnrgcl/cnr`, `makaleler/turkiye-cin-ortaklasa-rekabet/`; kullanıcı `C:\Users\kadir\Yandex.Disk\1_CALISMALAR\03_KAYNAK-KESIF\` altına kopyalayacak

---

## Faz Tablosu
| # | Faz | Durum | Tarih | Worker |
|---|---|---|---|---|
| 0 | VAZGEÇİRME | ✓ tamam | 2026-10-07 | editör + caner-editör |
| 1 | PLAN | ✓ tamam | 2026-10-07 | proje-baslat |
| 2 | KEŞİF | → açık | 2026-10-07 | — |
| 3 | KAYNAK | kilitli | — | — |
| 4 | VERİ | kilitli | — | — |
| 5 | YAZIM | kilitli | — | — |
| 6 | KALİTE | kilitli | — | — |
| 7 | GÖNDERİM | kilitli | — | — |
| 8 | REVİZYON | kilitli | — | — |

Durum sembolleri: ✓ tamam · → açık · İŞLEMDE · kilitli · ATLANDI

---

## Aktif Kapının Kriterleri

- [ ] Kuramsal mercek + sentez modeli blueprint §3'e kilitli
- [ ] Sorunsallaştırma yapıldı (boşluk-avcılığı katkı sayılmaz)
- [ ] Araştırma sorusu kilitli
- [ ] ≥1 hipotez / araştırma önermesi
- [ ] §3b kavram tablosu dolu (bilinmeyen hücreler `<KAYNAK YOK>`)
- [ ] §3c kavramsal model şekli üretildi (`kavramsal_model.py` çıkış 0)
- [ ] Yöntem ailesi yontem-kilavuzu ile seçilip §5-§6'ya kilitli
- [ ] Undermind promptu teslim edildi

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
