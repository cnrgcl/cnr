# Ders 6: Basit Hesap Makinesi

print("=" * 50)
print("    🧮 HESAP MAKİNESİ 🧮")
print("=" * 50)

# Kullanıcıdan sayılar al
sayi1 = float(input("\nBirinci sayıyı girin: "))
sayi2 = float(input("İkinci sayıyı girin: "))

# İşlem seçimi
print("\nİşlem seçin:")
print("1. Toplama (+)")
print("2. Çıkarma (-)")
print("3. Çarpma (*)")
print("4. Bölme (/)")

secim = input("\nSeçiminiz (1-4): ")

# İşlemi yap
print("\n" + "=" * 50)

if secim == "1":
    sonuc = sayi1 + sayi2
    print(f"Sonuç: {sayi1} + {sayi2} = {sonuc}")
elif secim == "2":
    sonuc = sayi1 - sayi2
    print(f"Sonuç: {sayi1} - {sayi2} = {sonuc}")
elif secim == "3":
    sonuc = sayi1 * sayi2
    print(f"Sonuç: {sayi1} * {sayi2} = {sonuc}")
elif secim == "4":
    if sayi2 != 0:
        sonuc = sayi1 / sayi2
        print(f"Sonuç: {sayi1} / {sayi2} = {sonuc}")
    else:
        print("HATA: Sıfıra bölme yapılamaz!")
else:
    print("HATA: Geçersiz seçim!")

print("=" * 50)
