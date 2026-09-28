import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const LAKE = "#0b4f6c";
const TURQUOISE = "#20bfb0";
const STONE = "#c9a66b";
const FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const POIS = [
  { emoji: "🪦", name: "Selçuklu Mezarlığı", points: 50 },
  { emoji: "🕌", name: "Çifte Kümbet", points: 40 },
  { emoji: "🌋", name: "Nemrut Krater Gölü", points: 60 },
  { emoji: "🌊", name: "Van Gölü Sahili", points: 30 },
];

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 360], [0, 30]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${160 + shift}deg, ${LAKE} 0%, #083344 55%, #04161f 100%)`,
      }}
    />
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  const sub = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const out = interpolate(frame, [75, 90], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out, fontFamily: FONT }}>
      <div style={{ fontSize: 200, fontWeight: 900, color: "white", letterSpacing: 12, transform: `scale(${s})` }}>
        SEFERİ
      </div>
      <div style={{ fontSize: 56, color: TURQUOISE, opacity: sub, marginTop: 20 }}>
        Ahlat'ı oyna, keşfet, kazan
      </div>
    </AbsoluteFill>
  );
};

const PoiCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(frame, [135, 150], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: 80, gap: 40, opacity: out, fontFamily: FONT }}>
      <div style={{ fontSize: 72, fontWeight: 800, color: "white", marginBottom: 30 }}>📍 Noktaları bul</div>
      {POIS.map((poi, i) => {
        const s = spring({ frame: frame - i * 12, fps, config: { damping: 14 } });
        return (
          <div
            key={poi.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255,255,255,0.1)",
              border: `3px solid ${TURQUOISE}`,
              borderRadius: 36,
              padding: "36px 48px",
              transform: `translateX(${(1 - s) * 1200}px)`,
            }}
          >
            <span style={{ fontSize: 56, color: "white" }}>
              {poi.emoji} {poi.name}
            </span>
            <span style={{ fontSize: 52, fontWeight: 800, color: STONE }}>+{poi.points}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Score: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = POIS.reduce((sum, p) => sum + p.points, 0);
  const count = Math.round(interpolate(frame, [0, 50], [0, total], { extrapolateRight: "clamp" }));
  const badge = spring({ frame: frame - 55, fps, config: { damping: 8 } });
  const out = interpolate(frame, [95, 110], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: out, fontFamily: FONT }}>
      <div style={{ fontSize: 60, color: "white" }}>Toplam puan</div>
      <div style={{ fontSize: 260, fontWeight: 900, color: STONE }}>{count}</div>
      <div
        style={{
          marginTop: 40,
          fontSize: 52,
          fontWeight: 800,
          color: "#04161f",
          background: TURQUOISE,
          padding: "28px 48px",
          borderRadius: 999,
          transform: `scale(${badge})`,
        }}
      >
        🏅 Selçuklu Kaşifi rozeti!
      </div>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT, textAlign: "center" }}>
      <div style={{ fontSize: 90, fontWeight: 900, color: "white", transform: `scale(${s})`, lineHeight: 1.2 }}>
        Liderlik tablosunda
        <br />
        yerini al 🏆
      </div>
      <div style={{ fontSize: 60, color: TURQUOISE, marginTop: 50, opacity: s }}>SEFERİ · Ahlat</div>
    </AbsoluteFill>
  );
};

export const SeferiTanitim: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <Sequence durationInFrames={90}>
      <Title />
    </Sequence>
    <Sequence from={90} durationInFrames={150}>
      <PoiCards />
    </Sequence>
    <Sequence from={240} durationInFrames={110}>
      <Score />
    </Sequence>
    <Sequence from={330}>
      <Cta />
    </Sequence>
  </AbsoluteFill>
);
