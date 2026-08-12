#!/usr/bin/env bash
# Derleme bağımlılıklarını indirir: three.js (global sürüme çevrilmiş) + woff2 yazı tipleri.
# Bu dosyalar depoya girmez; `derle.py` çalıştırmadan önce bir kez çalıştırılır.
set -euo pipefail

KOK="$(cd "$(dirname "$0")" && pwd)"
cd "$KOK"

THREE_SURUM="0.169.0"
YAZI=(
  "@fontsource/archivo-black@5.3.0"
  "@fontsource/ibm-plex-sans@5.3.0"
  "@fontsource/ibm-plex-mono@5.3.0"
)

mkdir -p .yapi fonts
cd .yapi

echo "▸ three@${THREE_SURUM} indiriliyor"
npm pack "three@${THREE_SURUM}" >/dev/null
tar xzf "three-${THREE_SURUM}.tgz"

echo "▸ three ESM çıktısı tek bir THREE nesnesine çevriliyor"
python3 - <<'PY'
import re
src = open('package/build/three.module.min.js').read()
i = src.rindex('export{')
head, exp = src[:i], src[i:]
body = re.fullmatch(r'export\{(.*)\};?\s*', exp, re.S).group(1)
parcalar = []
for e in body.split(','):
    e = e.strip()
    yerel, _, herkese = e.partition(' as ')
    herkese = herkese or yerel
    parcalar.append('%s:%s' % (herkese.strip(), yerel.strip()))
open('../three.global.js', 'w').write(head + 'const THREE={' + ','.join(parcalar) + '};')
print('  %d dışa aktarım eşlendi' % len(parcalar))
PY
rm -rf package

for paket in "${YAZI[@]}"; do
  echo "▸ ${paket} indiriliyor"
  npm pack "${paket}" >/dev/null
done

cd "$KOK"
rm -rf fonts && mkdir -p fonts
for tgz in .yapi/fontsource-*.tgz; do
  ad="$(basename "$tgz" .tgz)"
  mkdir -p "fonts/${ad}"
  tar xzf "$tgz" -C "fonts/${ad}"
done

echo "✓ Hazır. Şimdi: python3 derle.py"
