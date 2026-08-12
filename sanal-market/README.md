# Bereket Market — Sanal Reyon

Tarayıcıda gezilen 3B market. Müşteri kapıdan giriyor, Google Haritalar'daki gibi
zemine tıklayarak koridorda ilerliyor, rafa yaklaşıyor; ürüne tıkladığında fiyatını
görüyor ve ürünü elinde çevirir gibi 360° inceleyip sepete atıyor.

Çıktı **tek bir HTML dosyası**: `bereket-market.html`. Sunucu, kurulum ve ağ bağlantısı
istemez — çift tıklayıp açmak yeterli. three.js ve yazı tipleri dosyanın içine gömülüdür.

## Neler var

| Alan | Ne yapar |
|---|---|
| Gezinme | Zemine tıkla → oraya yürür (engellere çarpmadan). `W A S D` ile adım, sürükleyerek etrafına bak. Dokunmatik destekli. |
| Mağaza planı | Sol alttaki mini plan; üstündeki noktaya tıklayınca oraya yürünür. Konum ve bakış konisi canlı. |
| Raflar | 3 çift taraflı gondol, süt soğutucusu, manav kasaları, kampanya standı ve kasalar — toplam ~3.600 ürün nesnesi. |
| Ürün | Rafta ürünün üstünde fiyat etiketi belirir. Tıklayınca panel açılır: canlı 3B görünüm (sürükleyerek döndür), fiyat, birim fiyat, menşe, raf ömrü. |
| Sepet | Sepete ekle, adet ve toplam tutar, kalem silme. |
| Aydınlatma | Gündüz / akşam. Tarayıcı temasını izler, üstteki düğmeyle de değiştirilir. |

Ürün gövdeleri (kavanoz, şişe, teneke, poşet, kutu, meyve) ve ambalaj etiketleri kodla
üretilir — dışarıdan görsel yüklenmez. Aynı ürünün raftaki tüm kopyaları `InstancedMesh`
ile tek çizim çağrısında basılır; ~3.600 nesne yaklaşık 130 çizim çağrısına iner.

## Yapı

```
sanal-market/
├─ bereket-market.html   ← çıktı, dağıtılan tek dosya
├─ src/head.html         ← başlık, CSS, HUD işaretlemesi
├─ src/app.js            ← sahne, mağaza, gezinme, ürünler, arayüz
├─ hazirla.sh            ← three.js + yazı tiplerini indirir (bir kez)
└─ derle.py              ← head + three + app → bereket-market.html
```

## Geliştirme

```bash
./hazirla.sh        # three.js ve woff2 yazı tiplerini çeker (npm gerekir)
python3 derle.py    # tek dosyalık çıktıyı üretir
```

`hazirla.sh`'in indirdikleri (`.yapi/`, `fonts/`, `three.global.js`) depoya girmez;
sürüm numaraları betiğin başındadır.

## Ürün verisini değiştirmek

`src/app.js` içindeki `URUNLER` dizisi tek kaynaktır. Bir satır eklemek yeterli:

```js
{ id:'zeytin', ad:'Natürel Sızma Zeytinyağı', marka:'Ege Altını',
  kat:'kahvaltilik', tip:'sise', renk:'#7A8C1E', fiyat:379.90,
  gram:'1 L', birim:'litre fiyatı 379,90 ₺', mense:'Ayvalık', raf:'18 ay',
  aciklama:'Soğuk sıkım, asitlik oranı %0,4.' }
```

`kat` ürünün hangi rafa gireceğini, `tip` gövde biçimini, `renk` ambalaj rengini belirler.
Raf yerleşimi kategoriye göre kendiliğinden yeniden hesaplanır.

Mağaza planı `RAFLAR` dizisinde: gondolların yeri, uzunluğu ve her yüzünün hangi
kategoriyi taşıdığı oradan okunur.

## Sınırlar

- Fiyatlar ve markalar tamamen kurgudur; gerçek bir ürün kataloğuna bağlı değildir.
- Sepet yalnızca tarayıcı belleğinde durur — ödeme akışı ve kalıcı kayıt yoktur.
- Yazılım hızlandırmalı (GPU'suz) ortamlarda kare hızı düşer; gerçek cihazlarda sorun değil.
