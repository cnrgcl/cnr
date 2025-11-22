import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırması
// NOT: Gerçek projeye geçmeden önce .env.local dosyasına taşınmalı
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "BURAYA_API_KEY_YAZIN",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "BURAYA_AUTH_DOMAIN_YAZIN",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "BURAYA_PROJECT_ID_YAZIN",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "BURAYA_STORAGE_BUCKET_YAZIN",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "BURAYA_MESSAGING_SENDER_ID_YAZIN",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "BURAYA_APP_ID_YAZIN"
};

// Firebase'i başlat (Next.js SSR için multiple initialization kontrolü)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Servisleri export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
