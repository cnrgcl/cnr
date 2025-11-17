# Ders 2: Koşullar (if-else)
# Programın karar vermesini sağlar

# Örnek 1: Yaş kontrolü
yas = 18

if yas >= 18:
    print("Yetişkinsiniz!")
else:
    print("Çocuksunuz!")

# Örnek 2: Not sistemi
not_puani = 85

if not_puani >= 90:
    print("Notunuz: AA (Mükemmel!)")
elif not_puani >= 80:
    print("Notunuz: BA (Çok İyi)")
elif not_puani >= 70:
    print("Notunuz: BB (İyi)")
elif not_puani >= 60:
    print("Notunuz: CB (Orta)")
else:
    print("Notunuz: FF (Kaldınız)")

# Örnek 3: Hava durumu
hava = "yagmurlu"

if hava == "güneşli":
    print("Güneş gözlüğünü al!")
elif hava == "yagmurlu":
    print("Şemsiyeni al!")
elif hava == "karlı":
    print("Kalın giy!")
else:
    print("Hava durumu belirsiz")
