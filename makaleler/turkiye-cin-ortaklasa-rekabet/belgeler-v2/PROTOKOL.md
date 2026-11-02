# Belge toplama protokolü v2 (2026-11-02)

Amaç: Türkiye–Çin İpek Yolu turizmine ilişkin, ölçütleri karşılayan ve erişilebilen resmî belgelerin TAMAMINI toplamak (kolaylık örneklemi değil, tam tarama).

## Dahil etme ölçütleri (Yöntem 3.2 ile aynı)
1. Yayım tarihi 1 Ocak 2010 – 31 Ekim 2026.
2. Resmî kurum ya da resmî yayın organı (bakanlık, büyükelçilik, cumhurbaşkanlığı/devlet konseyi, Resmî Gazete, TBMM, il/eyalet kültür-turizm daireleri, resmî tanıtım ajansı). Devlet haber ajansları (AA, Xinhua) yalnız resmî metni olmayan olay için, "ajans" etiketiyle.
3. Konu: (a) ikili belgeler: Türkiye ile Çin arasında turizm, kültür yılı, halklar arası değişim, İpek Yolu / Kuşak ve Yol / Orta Koridor, hava/demiryolu bağlantısı, vize; (b) tek taraflı belgeler: bir ülkenin kendi İpek Yolu turizm/miras/koridor anlatısı (karşı ülke geçmese de).
4. Tam metin erişilebilir.
Dışlama: köşe yazısı, düşünce kuruluşu, akademik metin; Sincan siyasi tartışması odaklı metinler; yalnız fotoğraf/başlık sayfaları.

## Kayıt kuralı
- Her arama satırı `KAYIT/arama-gunlugu.csv`: tarih, ajan, site, arama yolu (URL/arşiv sayfası/anahtar kelime), sonuç sayısı, incelenen, dahil edilen.
- Her belge: `<KLASÖR>/<kod>_<tarih>_<kurum>_<kisa-ad>.txt` — başta URL, kurum, tarih, dil; ardından metnin kendisi DEĞİŞTİRİLMEDEN (özetleme ya da çeviri yok).
- Her klasörde `_envanter.csv`: kod,tarih,taraf(TR/CN/ORT),grup(ikili/tek-tarafli),tur,kaynak_kurum,baslik,url,durum(alindi/erisilemedi/dislandi),kelime_sayisi,dislama_nedeni,notlar.
- Erişilemeyen ama varlığı bilinen belgeler `erisilemedi` olarak yazılır (yazar Türkiye'den indirecek).
- Eski 49 belge (korpus-belge/A, B) yeniden bulunursa `notlar`a eski kodu yazılır.
