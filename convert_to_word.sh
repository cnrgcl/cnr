#!/bin/bash

# SEFERİ - Markdown to Word Converter
# Tüm .md dosyalarını .docx'e dönüştürür

echo "📄 Markdown dosyaları Word'e dönüştürülüyor..."

# Pandoc kurulu mu kontrol et
if ! command -v pandoc &> /dev/null
then
    echo "❌ Pandoc kurulu değil. Kurulum için:"
    echo "Ubuntu/Debian: sudo apt-get install pandoc"
    echo "Mac: brew install pandoc"
    echo "Windows: https://pandoc.org/installing.html"
    exit 1
fi

# Output klasörü oluştur
mkdir -p word_outputs

# Ana dökümanları dönüştür
FILES=(
    "TUBITAK_1511_PROJE_ONERISI.md"
    "SEFERI_PILOT_MVP_PLAN.md"
    "AHLAT_POI_DATABASE.md"
    "DATABASE_SCHEMA.md"
    "PILOT_SUMMARY.md"
    "SEFERI_AI_ENHANCED_CONCEPT.md"
    "SEFERI_CONCEPT.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        output="word_outputs/${file%.md}.docx"
        echo "  ✅ $file → $output"
        pandoc "$file" -o "$output" \
            --reference-doc=reference.docx \
            --toc \
            --toc-depth=3 \
            -V geometry:margin=2.5cm
    else
        echo "  ⏭️  $file (bulunamadı)"
    fi
done

echo ""
echo "✅ Dönüştürme tamamlandı!"
echo "📁 Dosyalar: word_outputs/ klasöründe"
