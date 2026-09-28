import pois from "./pois.json";

export type Poi = (typeof pois)[number];
export const POIS: Poi[] = pois;

const TR: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i" };

export const poiId = (poi: Poi) => {
  const slug = poi.name
    .replace(/\(.*\)/, "")
    .trim()
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüİ]/g, (c) => TR[c])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `nokta-${String(poi.no).padStart(2, "0")}-${slug}`;
};

// Merkez ve harita sınırları: Ahlat çevresindeki (15 km içi) noktalardan hesaplanır.
const distanceKm = (aLat: number, aLon: number, bLat: number, bLon: number) => {
  const r = Math.PI / 180;
  const dLat = (bLat - aLat) * r;
  const dLon = (bLon - aLon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};

const rough = {
  lat: POIS.reduce((s, p) => s + p.lat, 0) / POIS.length,
  lon: POIS.reduce((s, p) => s + p.lon, 0) / POIS.length,
};
const LOCAL = POIS.filter((p) => distanceKm(rough.lat, rough.lon, p.lat, p.lon) < 15);
export const CENTER = {
  lat: LOCAL.reduce((s, p) => s + p.lat, 0) / LOCAL.length,
  lon: LOCAL.reduce((s, p) => s + p.lon, 0) / LOCAL.length,
};

export const distanceFromCenter = (poi: Poi) => distanceKm(CENTER.lat, CENTER.lon, poi.lat, poi.lon);

const bounds = {
  minLat: Math.min(...LOCAL.map((p) => p.lat)),
  maxLat: Math.max(...LOCAL.map((p) => p.lat)),
  minLon: Math.min(...LOCAL.map((p) => p.lon)),
  maxLon: Math.max(...LOCAL.map((p) => p.lon)),
};

/** Noktayı width×height kutusuna yerleştirir; kutu dışında kalanlar kenara sabitlenir. */
export const project = (poi: Poi, width: number, height: number, pad = 60) => {
  const kx = Math.cos((CENTER.lat * Math.PI) / 180);
  const spanX = (bounds.maxLon - bounds.minLon) * kx;
  const spanY = bounds.maxLat - bounds.minLat;
  const scale = Math.min((width - 2 * pad) / spanX, (height - 2 * pad) / spanY);
  const x = width / 2 + (poi.lon - CENTER.lon) * kx * scale;
  const y = height / 2 - (poi.lat - CENTER.lat) * scale;
  const cx = Math.min(Math.max(x, pad / 2), width - pad / 2);
  const cy = Math.min(Math.max(y, pad / 2), height - pad / 2);
  return { x: cx, y: cy, clamped: cx !== x || cy !== y };
};
