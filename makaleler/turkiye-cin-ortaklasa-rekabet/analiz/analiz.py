# Betimsel analiz: kodlama-v1/v2 çapraz tablolar, Ö3 kuralı, taraf asimetrisi, TÜİK serisi, şekiller.
import csv, json, sys
from collections import Counter, defaultdict
sys.stdout.reconfigure(encoding="utf-8")
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

AR = ["A1", "A2", "A3", "A4"]
ADI = {"A1": "Bağlantısallık", "A2": "Turist akışı", "A3": "Anlatı", "A4": "Değer yakalama"}
v1 = [r for f in ("analiz/kodlama-A.csv", "analiz/kodlama-B.csv") for r in csv.DictReader(open(f, encoding="utf-8"))]
v2 = list(csv.DictReader(open("analiz/kodlama-v2.csv", encoding="utf-8")))

def tablo(rows, ar, yo, filt=lambda r: True):
    t = defaultdict(Counter)
    for r in rows:
        if filt(r): t[r[ar]][r[yo]] += 1
    out = {}
    for a in AR:
        c = t[a]; n_all = sum(c.values()); n_ex = n_all - c["NÖ"]
        out[a] = {"n": n_all, "İB": c["İB"], "RK": c["RK"], "KR": c["KR"], "NÖ": c["NÖ"],
                  "rk_nö_haric": round(100 * c["RK"] / n_ex, 1) if n_ex else None,
                  "rk_nö_dahil": round(100 * c["RK"] / n_all, 1) if n_all else None,
                  "rkkr_nö_haric": round(100 * (c["RK"] + c["KR"]) / n_ex, 1) if n_ex else None}
    return out

def o3(t, key):
    s = [t[a][key] for a in AR]
    mono = all(s[i] < s[i + 1] for i in range(3))
    fark = round(s[3] - s[0], 1)
    return {"seri": s, "monoton": mono, "fark_A1_A4": fark,
            "karar": "destek" if (mono or fark >= 20) else ("destek yok" if fark <= 0 else "kısmi")}

st = {"n_birim": len(v2), "n_belge": len({r["belge"][:3] for r in v2})}
st["v1"] = tablo(v1, "arena", "yonelim")
st["v1_o3_rk"] = o3(st["v1"], "rk_nö_dahil")
st["v2"] = tablo(v2, "arena_v2", "yonelim_v2")
st["v2_o3_rk_nö_haric"] = o3(st["v2"], "rk_nö_haric")
st["v2_o3_rk_nö_dahil"] = o3(st["v2"], "rk_nö_dahil")
for tf in ("TR", "CN"):
    st[f"v2_{tf}"] = tablo(v2, "arena_v2", "yonelim_v2", lambda r, tf=tf: r["taraf"] == tf)
    st[f"v2_{tf}_o3"] = o3(st[f"v2_{tf}"], "rk_nö_haric")
for kp in ("A", "B"):
    st[f"v2_korpus{kp}"] = tablo(v2, "arena_v2", "yonelim_v2", lambda r, kp=kp: r["belge"].startswith(kp))
v1alt = Counter(); 
for r in v1:
    for t in [x.strip() for x in r["alt_kod"].replace(";", ",").split(",") if x.strip()]: v1alt[(r["taraf"], t)] += 1
st["tanınma_yok"] = {tf: sum(c for (t, k), c in v1alt.items() if t == tf and "tanınma-yok" in k) for tf in ("TR", "CN")}
st["başlangıç_iddiası"] = {tf: sum(c for (t, k), c in v1alt.items() if t == tf and "başlangıç-iddia" in k) for tf in ("TR", "CN")}
st["başlangıç_tanıma"] = {tf: sum(c for (t, k), c in v1alt.items() if t == tf and "başlangıç-tanıma" in k) for tf in ("TR", "CN")}

tuik = list(csv.DictReader(open("ham-veri/cinli-ziyaretci-tuik.csv", encoding="utf-8")))
st["tuik"] = {r["yil"]: {"giris": int(r["cin_giris_milliyet"]), "pay": float(r["cin_payi_yuzde"])} for r in tuik}
json.dump(st, open("analiz/stats.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# Şekil 2: TÜİK serisi
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 10})
yrs = [int(r["yil"]) for r in tuik if int(r["yil"]) >= 2010]
val = [int(r["cin_giris_milliyet"]) / 1000 for r in tuik if int(r["yil"]) >= 2010]
fig, ax = plt.subplots(figsize=(7.2, 3.8))
ax.plot(yrs, val, color="#2a78d6", lw=2, marker="o", ms=4)
ax.set_ylabel("Çin uyruklu giriş (bin kişi)"); ax.set_xticks(yrs[::1]); ax.tick_params(axis="x", labelrotation=45)
ax.grid(axis="y", color="#e2e2e2", lw=0.6); ax.spines[["top", "right"]].set_visible(False)
ev = {2013: "Kuşak ve Yol\nilanı", 2015: "e-Vize; Antalya\nmutabakatı", 2018: "Çin'de Türkiye\nTurizm Yılı", 2020: "COVID-19", 2024: "Turizm\nmutabakatı"}
for y, t in ev.items():
    v = val[yrs.index(y)]
    ax.annotate(t, (y, v), xytext=(0, 18 if y != 2020 else 26), textcoords="offset points", ha="center", fontsize=7.5, color="#333",
                arrowprops=dict(arrowstyle="-", color="#999", lw=0.6))
ax.set_ylim(0, 520)
ax.text(2025, val[-1] - 40, f"{int(val[-1]*1000):,}".replace(",", "."), ha="center", fontsize=7.5, color="#333")
fig.text(0.01, 0.005, "Kaynak: TÜİK/EGM, Giriş yapan yabancılar (milliyete göre). Not: Tek taraflı vize muafiyeti 2 Ocak 2026'da yürürlüğe girdi.", fontsize=7, color="#555")
fig.tight_layout(rect=(0, 0.03, 1, 1)); fig.savefig("sekiller/sekil2-cin-girisleri.png", dpi=300); plt.close(fig)

# Şekil 3: RK% alanlara göre, TR vs CN (v2, NÖ hariç)
fig, ax = plt.subplots(figsize=(6.4, 3.8))
x = range(4)
for tf, col, mk, lab in (("TR", "#2a78d6", "o", "Türk kaynakları"), ("CN", "#eb6834", "s", "Çin kaynakları")):
    s = [st[f"v2_{tf}"][a]["rk_nö_haric"] for a in AR]
    ax.plot(x, s, color=col, lw=2, marker=mk, ms=7, label=lab)
    ax.text(3.08, s[3] + (0 if tf=="TR" else -4), lab, color="#222", va="center", fontsize=8.5)
tot = [st["v2"][a]["rk_nö_haric"] for a in AR]
ax.plot(x, tot, color="#777", lw=1.2, ls="--", marker="^", ms=5, label="Tümü")
ax.text(3.08, tot[3] + 3, "Tümü", color="#555", va="center", fontsize=8.5)
ax.set_xticks(list(x)); ax.set_xticklabels([ADI[a] + f"\n({a})" for a in AR]); ax.set_xlim(-0.2, 3.8)
ax.set_ylabel("Rekabet kodu payı (%)"); ax.set_ylim(0, 75)
ax.grid(axis="y", color="#e2e2e2", lw=0.6); ax.spines[["top", "right"]].set_visible(False)
ax.legend(frameon=False, fontsize=8, loc="upper left")
fig.text(0.01, 0.005, "Turiste yakınlık soldan sağa artar. Kodbook v2 (açık işaret); nötr birimler paydadan çıkarıldı. n=265.", fontsize=7, color="#555")
fig.tight_layout(rect=(0, 0.03, 1, 1)); fig.savefig("sekiller/sekil3-rekabet-payi.png", dpi=300); plt.close(fig)
print(json.dumps({k: st[k] for k in ("v1_o3_rk", "v2_o3_rk_nö_haric", "v2_o3_rk_nö_dahil", "v2_TR_o3", "v2_CN_o3", "tanınma_yok", "başlangıç_iddiası", "başlangıç_tanıma")}, ensure_ascii=False))
