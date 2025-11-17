# Ders 4: Kullanıcıdan Veri Alma (İnteraktif Program)
# input() fonksiyonu ile kullanıcıdan bilgi alabilirsiniz

print("=" * 40)
print("    KİŞİSEL BİLGİ PROGRAMI")
print("=" * 40)

# Kullanıcıdan bilgi al
isim = input("\nAdınız nedir? ")
yas_str = input("Yaşınız kaç? ")
sehir = input("Hangi şehirde yaşıyorsunuz? ")

# String'i sayıya çevir
yas = int(yas_str)

# Bilgileri göster
print("\n" + "=" * 40)
print("ÖZET:")
print("=" * 40)
print(f"Merhaba {isim}!")
print(f"Sen {yas} yaşındasın ve {sehir}'de yaşıyorsun.")

# Yaşa göre mesaj
if yas < 18:
    print("Sen henüz gençsin! 🎈")
elif yas < 30:
    print("Gençlik yıllarındasın! 🎉")
elif yas < 60:
    print("Olgun yaştasın! 🎯")
else:
    print("Tecrübeli birisin! 🌟")

# Bonus: Doğum yılını hesapla
dogum_yili = 2025 - yas
print(f"\nYaklaşık {dogum_yili} yılında doğdun.")
