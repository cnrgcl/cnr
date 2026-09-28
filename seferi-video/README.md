# SEFERİ Tanıtım Videosu (Remotion)

React kodu ile yazılmış 12 saniyelik, dikey (1080×1920, Reels/Shorts/TikTok) tanıtım videosu.

## Kendi bilgisayarında çalıştırma

Gerekli: [Node.js](https://nodejs.org) (LTS sürümü)

```bash
cd seferi-video
npm install
npm run studio   # tarayıcıda canlı önizleme/düzenleme açılır
npm run render   # out/seferi-tanitim.mp4 dosyasını üretir
```

## Düzenleme

- Metinler, renkler ve noktalar: `src/SeferiTanitim.tsx` (`POIS` listesi)
- Süre / çözünürlük: `src/Root.tsx`
