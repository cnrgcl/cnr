import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types';

// Kullanıcı kaydı
export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  try {
    // Firebase Auth'a kayıt
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Profil güncelleme
    await updateProfile(firebaseUser, { displayName });

    // Firestore'a kullanıcı bilgilerini kaydet
    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName,
      totalPoints: 0,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), user);

    return user;
  } catch (error: any) {
    console.error('Kayıt hatası:', error);
    throw new Error(error.message || 'Kayıt başarısız');
  }
};

// Kullanıcı girişi
export const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Firestore'dan kullanıcı bilgilerini al
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      throw new Error('Kullanıcı bilgileri bulunamadı');
    }
  } catch (error: any) {
    console.error('Giriş hatası:', error);
    throw new Error(error.message || 'Giriş başarısız');
  }
};

// Kullanıcı çıkışı
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Çıkış hatası:', error);
    throw new Error(error.message || 'Çıkış başarısız');
  }
};

// Kullanıcı bilgilerini al
export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Kullanıcı bilgisi alma hatası:', error);
    return null;
  }
};

// Mevcut kullanıcıyı al
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
