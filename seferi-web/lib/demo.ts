import { Timestamp } from 'firebase/firestore';

// Demo mode flag
export const DEMO_MODE = true; // Firebase olmadan çalışmak için true yap

// Demo user data
export const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@seferi.app',
  displayName: 'Demo Kullanıcı',
  points: 150,
  level: 5,
  photoCount: 12,
  streak: 3,
  maxStreak: 7,
  lastPhotoDate: null,
  badges: ['🥉 Gezgin', '🍴 Gurme', '🌅 Gün Doğumu Avcısı'],
  completedQuests: [],
  following: 5,
  followers: 12,
  totalLikes: 45,
  visitedPOIs: ['poi_001', 'poi_002', 'poi_003'],
  poiCheckIns: 8,
  referralCode: 'DEMO123',
  referralCount: 2,
  createdAt: Timestamp.now(),
  lastActive: Timestamp.now(),
};

// Demo authentication functions
export const demoSignIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (email === 'demo@seferi.app' && password === 'demo123') {
    localStorage.setItem('demo_user', JSON.stringify(DEMO_USER));
    return DEMO_USER;
  }

  throw new Error('Demo modda email: demo@seferi.app, şifre: demo123 kullanın');
};

export const demoSignUp = async (email: string, password: string, displayName: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newUser = {
    ...DEMO_USER,
    email,
    displayName,
    points: 0,
    level: 1,
    photoCount: 0,
    streak: 0,
    badges: [],
    visitedPOIs: [],
  };

  localStorage.setItem('demo_user', JSON.stringify(newUser));
  return newUser;
};

export const demoSignOut = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  localStorage.removeItem('demo_user');
};

export const getDemoUser = () => {
  const stored = localStorage.getItem('demo_user');
  return stored ? JSON.parse(stored) : null;
};
