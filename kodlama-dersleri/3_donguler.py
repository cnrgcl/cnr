# Ders 3: Döngüler
# Aynı işlemi tekrar tekrar yapmak için kullanılır

# FOR döngüsü - belirli sayıda tekrar
print("1'den 5'e kadar sayılar:")
for i in range(1, 6):
    print(i)

print("\n" + "="*30 + "\n")

# Liste ile döngü
meyveler = ["elma", "armut", "muz", "çilek"]
print("Meyve listesi:")
for meyve in meyveler:
    print("- " + meyve)

print("\n" + "="*30 + "\n")

# Çarpım tablosu
sayi = 5
print(f"{sayi} çarpım tablosu:")
for i in range(1, 11):
    sonuc = sayi * i
    print(f"{sayi} x {i} = {sonuc}")

print("\n" + "="*30 + "\n")

# WHILE döngüsü - koşul sağlandığı sürece devam eder
sayac = 1
print("While döngüsü ile 1'den 5'e:")
while sayac <= 5:
    print(sayac)
    sayac = sayac + 1
