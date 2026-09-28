# SEFERİ Tanıtım Videosu (Remotion)

React kodu ile yazılmış 12 saniyelik, dikey (1080×1920, Reels/Shorts/TikTok) tanıtım videosu.

## Kendi bilgisayarında çalıştırma

Gerekli: [Node.js](https://nodejs.org) (LTS sürümü)

```bash
cd seferi-video
npm install
npm run studio   # tarayıcıda canlı önizleme/düzenleme açılır
npm run render   # out/seferi-tanitim.mp4 dosyasını üretir
npm run render:noktalar          # 22 noktanın her biri için ayrı video → out/noktalar/
npm run render:noktalar -- 4 17  # sadece 4 ve 17 numaralı noktalar
```

## Nokta videoları

Her gezi noktası için 9 saniyelik video: seviye rozeti (A: Mutlaka gör, B: Önerilen, C: Gizli hazine),
haritada konum ve merkeze uzaklık, check-in puanları, en iyi ziyaret saati ve hashtag'ler.
Veriler `src/pois.json` dosyasından gelir (kaynak: `AHLAT_POI_DATABASE.md`). Bir noktayı güncellemek
için JSON'u düzenleyip betiği yeniden çalıştırman yeterli.

## Düzenleme

- Metinler, renkler ve noktalar: `src/SeferiTanitim.tsx` (`POIS` listesi)
- Nokta videosu tasarımı: `src/PoiVideo.tsx`
- Süre / çözünürlük: `src/Root.tsx`
