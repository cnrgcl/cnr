# Şekil 1 — kavramsal-model.json ile birebir aynı içerik; elle yerleşim.
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
fig, ax = plt.subplots(figsize=(10, 5.6)); ax.set_xlim(0, 10); ax.set_ylim(0, 5.6); ax.axis("off")
W, H = 2.5, 0.8
kutu = {"miras": (0.3, 2.6, "Ortak İpek Yolu\nmirası"),
        "ib": (3.8, 3.9, "İş birliği\n(değer yaratma)"),
        "rk": (3.8, 0.9, "Rekabet\n(değer yakalama)"),
        "akis": (7.2, 2.4, "Turist akışı"),
        "yak": (0.3, 0.6, "Turiste yakınlık\n(arena konumu)")}
for k, (x, y, t) in kutu.items():
    ax.add_patch(FancyBboxPatch((x, y), W, H, boxstyle="round,pad=0.05", lw=1.6, fc="white",
                                ec="black", ls="--" if k == "yak" else "-"))
    ax.text(x + W/2, y + H/2, t, ha="center", va="center", fontsize=11)
def ok(p, q, lab, lp, ls="-", c="black"):
    ax.add_patch(FancyArrowPatch(p, q, arrowstyle="-|>", mutation_scale=16, lw=1.5, ls=ls, color=c))
    ax.text(*lp, lab, fontsize=10.5, ha="center", va="center",
            bbox=dict(fc="white", ec="none", pad=1), color=c)
ok((2.85, 3.25), (3.75, 4.2), "Ö1 (+)", (3.0, 3.95))
ok((2.85, 2.75), (3.75, 1.4), "Ö2 (+)", (3.65, 2.3))
ok((6.35, 4.2), (7.4, 3.25), "Ö4 (+)", (7.0, 3.95))
ok((6.35, 1.4), (7.4, 2.35), "Ö5 (−)", (7.0, 1.65))
ok((2.1, 1.45), (3.31, 2.06), "Ö3", (2.45, 1.95), ls="--", c="#444")
ax.text(5, 5.35, "Şekil 1. Türkiye–Çin İpek Yolu turizminde ortaklaşa rekabet: kavramsal model",
        ha="center", fontsize=12)
ax.text(5, 0.1, "Kesikli ok düzenleyici etkiyi gösterir. Ö3: Faaliyet turiste yaklaştıkça miras–rekabet ilişkisi güçlenir (Bengtsson ve Kock, 2000).",
        ha="center", fontsize=9, style="italic", color="#333")
plt.savefig("sekiller/sekil1-kavramsal-model.png", dpi=300, bbox_inches="tight")
