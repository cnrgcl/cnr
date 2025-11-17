# Ders 5: Sayı Tahmin Oyunu - İlk Projeniz!
# Bu oyunda bilgisayar 1-100 arası bir sayı tutar, siz tahmin edersiniz

import random

print("=" * 50)
print("    🎮 SAYI TAHMİN OYUNU 🎮")
print("=" * 50)
print("\n1 ile 100 arasında bir sayı tuttum.")
print("Hadi tahmin et bakalım!\n")

# Rastgele bir sayı seç
gizli_sayi = random.randint(1, 100)
tahmin_sayisi = 0
tahmin_hakki = 7

# Oyun döngüsü
while tahmin_sayisi < tahmin_hakki:
    # Kullanıcıdan tahmin al
    tahmin = int(input(f"Tahmininiz ({tahmin_hakki - tahmin_sayisi} hak kaldı): "))
    tahmin_sayisi = tahmin_sayisi + 1

    # Tahmin kontrolü
    if tahmin == gizli_sayi:
        print(f"\n🎉 TEBRİKLER! {tahmin_sayisi} tahminde bildin!")
        print(f"Sayı gerçekten {gizli_sayi} idi!")
        break
    elif tahmin < gizli_sayi:
        print("⬆️  Daha BÜYÜK bir sayı söyle!")
    else:
        print("⬇️  Daha KÜÇÜK bir sayı söyle!")

    # Hak kontrolü
    if tahmin_sayisi == tahmin_hakki:
        print(f"\n😔 Hakkın bitti! Sayı {gizli_sayi} idi.")
        print("Tekrar dene!")

print("\n" + "=" * 50)
print("Oyun bitti! Yeniden oynamak için programı çalıştır.")
print("=" * 50)
