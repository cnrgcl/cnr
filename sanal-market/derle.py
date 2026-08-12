#!/usr/bin/env python3
"""parts/head.html + three.global.js + parts/app.js -> tek dosyalık artifact"""
import base64, os, re, sys

KOK = os.path.dirname(os.path.abspath(__file__))

LATIN = ("U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
         "U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,"
         "U+2212,U+2215,U+FEFF,U+FFFD")
LATIN_EXT = ("U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,"
             "U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,"
             "U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF")

# (aile, paket, dosya-onek, agirlik)
YUZLER = [
    ("Archivo Black",  "fontsource-archivo-black-5.3.0",  "archivo-black",  400),
    ("IBM Plex Sans",  "fontsource-ibm-plex-sans-5.3.0",  "ibm-plex-sans",  400),
    ("IBM Plex Sans",  "fontsource-ibm-plex-sans-5.3.0",  "ibm-plex-sans",  600),
    ("IBM Plex Mono",  "fontsource-ibm-plex-mono-5.3.0",  "ibm-plex-mono",  500),
]


def yazitipi_css():
    parcalar = []
    toplam = 0
    for aile, paket, onek, agirlik in YUZLER:
        for altkume, aralik in (("latin", LATIN), ("latin-ext", LATIN_EXT)):
            yol = os.path.join(KOK, "fonts", paket, "package", "files",
                               "%s-%s-%d-normal.woff2" % (onek, altkume, agirlik))
            with open(yol, "rb") as f:
                ham = f.read()
            toplam += len(ham)
            b64 = base64.b64encode(ham).decode("ascii")
            parcalar.append(
                '@font-face{font-family:"%s";font-style:normal;font-weight:%d;'
                'font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2");'
                'unicode-range:%s}' % (aile, agirlik, b64, aralik))
    return "\n".join(parcalar), toplam


def main():
    head = open(os.path.join(KOK, "src", "head.html"), encoding="utf-8").read()
    three = open(os.path.join(KOK, "three.global.js"), encoding="utf-8").read()
    app = open(os.path.join(KOK, "src", "app.js"), encoding="utf-8").read()

    for ad, kod in (("three", three), ("app", app)):
        if re.search(r"</\s*script", kod, re.I):
            sys.exit("HATA: %s içinde </script dizisi var" % ad)

    fonts, font_bayt = yazitipi_css()
    if "__FONTS__" not in head:
        sys.exit("HATA: head.html içinde __FONTS__ yer tutucusu yok")
    head = head.replace("__FONTS__", fonts)

    cikti = head + "\n<script>\n" + three + "\n" + app + "\n</script>\n"
    hedef = os.path.join(KOK, "bereket-market.html")
    with open(hedef, "w", encoding="utf-8") as f:
        f.write(cikti)

    print("yazı tipi : %6.1f KB" % (font_bayt / 1024))
    print("three.js  : %6.1f KB" % (len(three.encode()) / 1024))
    print("uygulama  : %6.1f KB" % (len(app.encode()) / 1024))
    print("toplam    : %6.1f KB -> %s" % (len(cikti.encode()) / 1024, hedef))


if __name__ == "__main__":
    main()
