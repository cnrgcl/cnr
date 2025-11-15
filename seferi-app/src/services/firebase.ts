import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırmanızı buraya ekleyin
// Firebase Console'dan alacağınız bilgiler
const firebaseConfig = {
  apiKey: "BURAYA_API_KEY_YAZIN",
  authDomain: "BURAYA_AUTH_DOMAIN_YAZIN",
  projectId: "BURAYA_PROJECT_ID_YAZIN",
  storageBucket: "BURAYA_STORAGE_BUCKET_YAZIN",
  messagingSenderId: "BURAYA_MESSAGING_SENDER_ID_YAZIN",
  appId: "BURAYA_APP_ID_YAZIN"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Servisleri export et
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
