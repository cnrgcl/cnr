# 📄 Markdown Dosyalarını Word'e Dönüştürme Rehberi

## Hazırlanan Dosyalar

1. **TUBITAK_1511_PROJE_ONERISI.md** (78 sayfa, ~25,000 kelime)
2. **SEFERI_PILOT_MVP_PLAN.md** (55 sayfa, ~18,000 kelime)
3. **AHLAT_POI_DATABASE.md** (15 sayfa)
4. **DATABASE_SCHEMA.md** (35 sayfa)
5. **PILOT_SUMMARY.md** (12 sayfa)
6. **SEFERI_AI_ENHANCED_CONCEPT.md** (40 sayfa)
7. **SEFERI_CONCEPT.md** (30 sayfa)

---

## 🚀 YÖNTEM 1: Online Converter (EN KOLAY) ⭐⭐⭐

**Adımlar:**

### 1. GitHub'dan Dosyaları İndir
```
https://github.com/cnrgcl/cnr/tree/claude/seferi-gamification-platform-01AAqcW4nxw35ygcRsJA31ir
```
- Sayfayı aç
- Her .md dosyasının üstüne tıkla
- "Raw" butonuna bas
- Sağ tık → "Farklı Kaydet" → .md uzantılı kaydet

### 2. Online Converter Kullan

**Seçenek A: CloudConvert (Önerilen)**
- https://cloudconvert.com/md-to-docx
- Dosyaları sürükle-bırak
- "Convert" tıkla
- İndir (.docx)

**Seçenek B: Markdown to Word**
- https://www.markdowntoword.com/
- Markdown yapıştır veya dosya yükle
- "Convert" tıkla
- İndir

**Seçenek C: Aspose**
- https://products.aspose.app/words/conversion/md-to-docx
- Upload et → Convert → İndir

---

## 💻 YÖNTEM 2: Pandoc (Profesyonel) ⭐⭐

**Gereksinimler:** Pandoc kurulu olmalı

### Windows:
1. Pandoc indir: https://pandoc.org/installing.html
2. Kurulumu yap
3. Proje klasörüne git (cmd veya PowerShell)
4. Her dosya için:
```cmd
pandoc TUBITAK_1511_PROJE_ONERISI.md -o TUBITAK_1511_PROJE_ONERISI.docx
pandoc SEFERI_PILOT_MVP_PLAN.md -o SEFERI_PILOT_MVP_PLAN.docx
pandoc AHLAT_POI_DATABASE.md -o AHLAT_POI_DATABASE.docx
pandoc DATABASE_SCHEMA.md -o DATABASE_SCHEMA.docx
pandoc PILOT_SUMMARY.md -o PILOT_SUMMARY.docx
```

### Mac:
1. Terminal aç
2. Pandoc kur:
```bash
brew install pandoc
```
3. Proje klasörüne git
4. Script çalıştır:
```bash
chmod +x convert_to_word.sh
./convert_to_word.sh
```

### Linux:
```bash
sudo apt-get install pandoc
./convert_to_word.sh
```

---

## 📋 YÖNTEM 3: Kopyala-Yapıştır (Manuel) ⭐

**Basit ama formatsız:**

1. GitHub'dan dosyayı aç
2. Markdown içeriğini kopyala (Ctrl+A, Ctrl+C)
3. Word'ü aç
4. Yapıştır (Ctrl+V)
5. Farklı Kaydet → .docx

**Not:** Bu yöntemde formatlar düzgün olmayabilir (başlıklar, tablolar).

---

## 🎨 YÖNTEM 4: Word'de Markdown Desteği

**Word 2019/365:**

1. Word'ü aç
2. File → Options → Advanced
3. "Show document content" bölümünde "Show text boundaries" işaretle
4. File → Open → .md dosyasını seç
5. "Plain text" olarak açılır
6. Styles ile formatla

**Daha İyi:**
- Writage eklentisi kur (Word için Markdown eklentisi)
- http://www.writage.com/
- .md dosyalarını doğrudan açar ve formatlar

---

## 🔧 Gelişmiş Pandoc Seçenekleri

**İçindekiler + Stil ile:**
```bash
pandoc TUBITAK_1511_PROJE_ONERISI.md -o output.docx \
    --toc \
    --toc-depth=3 \
    --reference-doc=custom_template.docx \
    -V geometry:margin=2.5cm \
    --number-sections
```

**Parametreler:**
- `--toc`: Table of Contents (içindekiler)
- `--toc-depth=3`: 3 seviye başlık
- `--reference-doc`: Özel Word şablonu kullan
- `--number-sections`: Başlıklara numara ekle
- `-V geometry:margin=2.5cm`: 2.5cm kenar boşluk

---

## 📂 Toplu Dönüştürme

**Tüm .md dosyalarını bir anda:**

### Windows (PowerShell):
```powershell
Get-ChildItem -Filter *.md | ForEach-Object {
    $output = $_.BaseName + ".docx"
    pandoc $_.FullName -o $output
}
```

### Mac/Linux (Bash):
```bash
for file in *.md; do
    pandoc "$file" -o "${file%.md}.docx"
done
```

---

## ✅ Önerilen İş Akışı

**1. Hızlı Önizleme İçin:**
→ CloudConvert kullan (yöntem 1)

**2. Profesyonel Başvuru İçin:**
→ Pandoc + özel template (yöntem 2)

**3. Hızlı Düzenleme İçin:**
→ Writage eklentisi (yöntem 4)

---

## 🎯 TÜBİTAK Başvurusu İçin

TÜBİTAK başvurusu yapacaksan:

1. **Pandoc kullan** (format korunur)
2. **Custom template** oluştur:
   - TÜBİTAK logosu
   - Sayfa numaraları
   - Başlık stilleri
3. **Her bölümü kontrol et:**
   - Tablolar düzgün mü?
   - Kaynakça formatı doğru mu?
   - Sayfa numaraları var mı?

---

## ❓ Sorun Giderme

**"Pandoc command not found":**
→ Pandoc kurulu değil, yukardaki kurulum linklerini kullan

**"Tablolar bozuk görünüyor":**
→ Word'de Table → AutoFit → "AutoFit to Window"

**"Türkçe karakterler hatalı":**
→ Pandoc'a encoding ekle:
```bash
pandoc input.md -o output.docx --metadata charset=UTF-8
```

**"Başlıklar numaralandırılmamış":**
→ `--number-sections` parametresi ekle

---

## 📧 Destek

Sorun yaşarsan:
1. GitHub issue aç
2. Online converter kullan (en kolay)
3. Bana dosyaları göster, yardımcı olayım

---

**Hazırlayan:** Claude AI
**Tarih:** 2025-11-17
**Dosya Sayısı:** 7 adet Markdown
**Toplam:** ~200 sayfa
