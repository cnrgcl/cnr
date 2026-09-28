import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { POIS, Poi, distanceFromCenter, project } from "./poi-data";

const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const INK = "#04161f";

const TIERS = {
  A: { label: "⭐ MUTLAKA GÖR", color: "#e8b949", bg: ["#3b2a05", "#0b1a24"] },
  B: { label: "👍 ÖNERİLEN", color: "#20bfb0", bg: ["#0b4f6c", "#04161f"] },
  C: { label: "💎 GİZLİ HAZİNE", color: "#b98cf5", bg: ["#2e1650", "#07101c"] },
} as const;

const CATEGORY_EMOJI: Record<string, string> = { Tarihi: "🏛️", Doğa: "🌿", Kültür: "🎨" };

const SCENES = { intro: 75, map: 90, points: 75, cta: 30 };
export const POI_VIDEO_FRAMES = SCENES.intro + SCENES.map + SCENES.points + SCENES.cta;

const useFade = (length: number, edge = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, edge, length - edge, length], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const splitName = (name: string) => {
  const m = name.match(/^(.*?)\s*\((.*)\)$/);
  return m ? { main: m[1], sub: m[2] } : { main: name, sub: null };
};

const Intro: React.FC<{ poi: Poi }> = ({ poi }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tier = TIERS[poi.tier as keyof typeof TIERS];
  const { main, sub } = splitName(poi.name);
  const pop = spring({ frame, fps, config: { damping: 10 } });
  const rise = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const opacity = useFade(SCENES.intro);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80, opacity, textAlign: "center" }}>
      <div style={{ fontSize: 44, color: "rgba(255,255,255,0.6)", letterSpacing: 6 }}>
        NOKTA {String(poi.no).padStart(2, "0")} / {POIS.length}
      </div>
      <div
        style={{
          marginTop: 30,
          fontSize: 44,
          fontWeight: 800,
          color: INK,
          background: tier.color,
          padding: "16px 40px",
          borderRadius: 999,
          transform: `scale(${pop})`,
        }}
      >
        {tier.label}
      </div>
      <div style={{ fontSize: 220, marginTop: 60, transform: `scale(${pop})` }}>
        {CATEGORY_EMOJI[poi.category] ?? "📍"}
      </div>
      <div
        style={{
          fontSize: main.length > 18 ? 96 : 116,
          fontWeight: 900,
          color: "white",
          lineHeight: 1.1,
          marginTop: 40,
          transform: `translateY(${(1 - rise) * 80}px)`,
          opacity: rise,
        }}
      >
        {main}
      </div>
      {sub && <div style={{ fontSize: 54, color: tier.color, marginTop: 24, opacity: rise }}>{sub}</div>}
    </AbsoluteFill>
  );
};

const MAP_W = 920;
const MAP_H = 820;

const MapScene: React.FC<{ poi: Poi }> = ({ poi }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tier = TIERS[poi.tier as keyof typeof TIERS];
  const opacity = useFade(SCENES.map);
  const me = project(poi, MAP_W, MAP_H);
  const drop = spring({ frame: frame - 15, fps, config: { damping: 9 } });
  const pulse = (frame % 30) / 30;
  const km = distanceFromCenter(poi);
  const kmText = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1).replace(".", ",")} km`;
  const textIn = interpolate(frame, [25, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 170, opacity }}>
      <div style={{ fontSize: 72, fontWeight: 800, color: "white", marginBottom: 40 }}>📍 Nerede?</div>
      <svg
        width={MAP_W}
        height={MAP_H}
        style={{ background: "rgba(255,255,255,0.06)", borderRadius: 48, border: "2px solid rgba(255,255,255,0.15)" }}
      >
        {POIS.filter((p) => p.no !== poi.no).map((p) => {
          const { x, y } = project(p, MAP_W, MAP_H);
          return <circle key={p.no} cx={x} cy={y} r={10} fill="rgba(255,255,255,0.3)" />;
        })}
        <text x={MAP_W - 50} y={70} fill="rgba(255,255,255,0.5)" fontSize={40} fontFamily={FONT} textAnchor="middle">
          K
        </text>
        <path d={`M ${MAP_W - 50} 80 l -14 30 l 14 -8 l 14 8 z`} fill="rgba(255,255,255,0.5)" />
        <circle cx={me.x} cy={me.y} r={30 + pulse * 70} fill="none" stroke={tier.color} strokeWidth={5} opacity={1 - pulse} />
        <circle cx={me.x} cy={me.y} r={24 * drop} fill={tier.color} stroke="white" strokeWidth={6} />
      </svg>
      <div style={{ fontSize: 50, color: tier.color, fontWeight: 700, marginTop: 40, opacity: textIn, textAlign: "center" }}>
        {me.clamped ? "➜ " : ""}Ahlat merkezine {kmText}
        <div style={{ fontSize: 34, fontWeight: 400, opacity: 0.7 }}>kuş uçuşu</div>
      </div>
      <div
        style={{
          fontSize: 54,
          color: "white",
          textAlign: "center",
          lineHeight: 1.35,
          padding: "30px 90px 0",
          opacity: textIn,
        }}
      >
        {poi.description}
      </div>
    </AbsoluteFill>
  );
};

const Row: React.FC<{ icon: string; text: string; delay: number }> = ({ icon, text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        alignItems: "center",
        fontSize: 48,
        color: "white",
        background: "rgba(255,255,255,0.08)",
        borderRadius: 32,
        padding: "28px 40px",
        width: "100%",
        opacity: s,
        transform: `translateX(${(1 - s) * 300}px)`,
      }}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const Points: React.FC<{ poi: Poi }> = ({ poi }) => {
  const frame = useCurrentFrame();
  const tier = TIERS[poi.tier as keyof typeof TIERS];
  const opacity = useFade(SCENES.points);
  const count = Math.round(
    interpolate(frame, [0, 25], [0, poi.firstPoints], { extrapolateRight: "clamp" }),
  );
  const rows = [
    { icon: "🔁", text: `Tekrar ziyaret: +${poi.repeatPoints} puan` },
    { icon: "📡", text: `Check-in alanı: ${poi.radius.replace(/(\d)m$/, "$1 m")}` },
    ...(poi.bestTime ? [{ icon: "🕐", text: poi.bestTime }] : []),
    ...(poi.note ? [{ icon: "ℹ️", text: poi.note }] : []),
  ];
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80, opacity }}>
      <div style={{ fontSize: 56, color: "rgba(255,255,255,0.75)" }}>İlk check-in</div>
      <div style={{ fontSize: 280, fontWeight: 900, color: tier.color, lineHeight: 1 }}>+{count}</div>
      <div style={{ fontSize: 56, color: "rgba(255,255,255,0.75)", marginBottom: 60 }}>puan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
        {rows.map((r, i) => (
          <Row key={r.text} icon={r.icon} text={r.text} delay={20 + i * 8} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC<{ poi: Poi }> = ({ poi }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tier = TIERS[poi.tier as keyof typeof TIERS];
  const s = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", textAlign: "center", padding: 80 }}>
      <div style={{ fontSize: 140, fontWeight: 900, color: "white", letterSpacing: 10, transform: `scale(${s})` }}>
        SEFERİ
      </div>
      <div style={{ fontSize: 56, color: "white", marginTop: 20 }}>ile check-in yap, rozetleri topla</div>
      <div style={{ fontSize: 48, color: tier.color, marginTop: 50 }}>{poi.hashtags.join("  ")}</div>
    </AbsoluteFill>
  );
};

export const PoiVideo: React.FC<{ poi: Poi }> = ({ poi }) => {
  const frame = useCurrentFrame();
  const tier = TIERS[poi.tier as keyof typeof TIERS];
  const angle = interpolate(frame, [0, POI_VIDEO_FRAMES], [160, 190]);
  let t = 0;
  const at = (len: number) => {
    const from = t;
    t += len;
    return { from, durationInFrames: len };
  };
  return (
    <AbsoluteFill
      style={{ fontFamily: FONT, background: `linear-gradient(${angle}deg, ${tier.bg[0]} 0%, ${tier.bg[1]} 100%)` }}
    >
      <Sequence {...at(SCENES.intro)}>
        <Intro poi={poi} />
      </Sequence>
      <Sequence {...at(SCENES.map)}>
        <MapScene poi={poi} />
      </Sequence>
      <Sequence {...at(SCENES.points)}>
        <Points poi={poi} />
      </Sequence>
      <Sequence {...at(SCENES.cta)}>
        <Cta poi={poi} />
      </Sequence>
    </AbsoluteFill>
  );
};
