// Her nokta için ayrı MP4 üretir: out/noktalar/<id>.mp4
// Kullanım: npm run render:noktalar            (hepsi)
//           npm run render:noktalar -- 4 17    (sadece 4 ve 17 numaralı noktalar)
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";

const only = process.argv.slice(2).map(Number);
const browserExecutable = process.env.REMOTION_BROWSER || null;

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const compositions = (await getCompositions(serveUrl, { browserExecutable })).filter(
  (c) => c.id.startsWith("nokta-") && (only.length === 0 || only.includes(c.props.poi.no)),
);

for (const [i, composition] of compositions.entries()) {
  const outputLocation = `out/noktalar/${composition.id}.mp4`;
  await renderMedia({ composition, serveUrl, codec: "h264", outputLocation, browserExecutable });
  console.log(`[${i + 1}/${compositions.length}] ${outputLocation}`);
}
