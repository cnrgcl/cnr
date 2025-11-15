import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { storage, db } from './firebase';
import { Photo, PhotoCategory, SCORING } from '../types';
import { isLocationInAhlat } from './locationService';

// Fotoğrafı yükle ve puan hesapla
export const uploadPhoto = async (
  userId: string,
  userName: string,
  imageUri: string,
  category: PhotoCategory,
  latitude: number,
  longitude: number
): Promise<Photo> => {
  try {
    // Konum kontrolü
    const inAhlat = isLocationInAhlat(latitude, longitude);

    // Puanı hesapla
    const points = calculatePoints(category, inAhlat);

    // Fotoğrafı Storage'a yükle
    const imageUrl = await uploadImageToStorage(userId, imageUri);

    // Fotoğraf bilgilerini Firestore'a kaydet
    const photoData: Omit<Photo, 'id'> = {
      userId,
      userName,
      imageUrl,
      category,
      location: { latitude, longitude },
      points,
      hashtags: ['#ahlat', '#ahlatseferi', '#ahlatsefiri'],
      createdAt: new Date(),
      isInAhlat: inAhlat,
    };

    const docRef = await addDoc(collection(db, 'photos'), photoData);

    // Kullanıcının toplam puanını güncelle
    await updateUserPoints(userId, points);

    return {
      id: docRef.id,
      ...photoData,
    };
  } catch (error) {
    console.error('Fotoğraf yükleme hatası:', error);
    throw new Error('Fotoğraf yüklenemedi');
  }
};

// Fotoğrafı Storage'a yükle
const uploadImageToStorage = async (userId: string, imageUri: string): Promise<string> => {
  try {
    // Blob'a çevir
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Unique dosya adı oluştur
    const filename = `photos/${userId}/${Date.now()}.jpg`;
    const storageRef = ref(storage, filename);

    // Yükle
    await uploadBytes(storageRef, blob);

    // Download URL'i al
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Storage yükleme hatası:', error);
    throw new Error('Fotoğraf storage\'a yüklenemedi');
  }
};

// Puan hesaplama
const calculatePoints = (category: PhotoCategory, isInAhlat: boolean): number => {
  switch (category) {
    case PhotoCategory.FOOD:
      return isInAhlat ? SCORING.foodInAhlat : SCORING.foodOutsideAhlat;
    case PhotoCategory.HISTORICAL:
      return isInAhlat ? SCORING.historicalSite : SCORING.normalPhoto;
    case PhotoCategory.NATURE:
      return isInAhlat ? SCORING.nature : SCORING.normalPhoto;
    case PhotoCategory.NORMAL:
    default:
      return SCORING.normalPhoto;
  }
};

// Kullanıcı puanını güncelle
const updateUserPoints = async (userId: string, points: number): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      totalPoints: increment(points),
    });
  } catch (error) {
    console.error('Puan güncelleme hatası:', error);
  }
};

// Kullanıcının fotoğraflarını getir
export const getUserPhotos = async (userId: string): Promise<Photo[]> => {
  try {
    const q = query(
      collection(db, 'photos'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const photos: Photo[] = [];

    querySnapshot.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() } as Photo);
    });

    return photos;
  } catch (error) {
    console.error('Fotoğraf getirme hatası:', error);
    return [];
  }
};

// Tüm fotoğrafları getir (feed için)
export const getAllPhotos = async (limit: number = 50): Promise<Photo[]> => {
  try {
    const q = query(
      collection(db, 'photos'),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const photos: Photo[] = [];

    querySnapshot.forEach((doc) => {
      if (photos.length < limit) {
        photos.push({ id: doc.id, ...doc.data() } as Photo);
      }
    });

    return photos;
  } catch (error) {
    console.error('Fotoğrafları getirme hatası:', error);
    return [];
  }
};
