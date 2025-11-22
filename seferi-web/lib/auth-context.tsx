'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { id: uid, ...userDoc.data() } as User;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Generate unique referral code
  const generateReferralCode = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Create new user document in Firestore
  const createUserDocument = async (firebaseUser: FirebaseUser, displayName: string) => {
    const now = Timestamp.now();
    const newUser: Omit<User, 'id'> = {
      email: firebaseUser.email!,
      displayName: displayName,
      photoURL: firebaseUser.photoURL || undefined,
      points: 0,
      level: 1,
      photoCount: 0,
      streak: 0,
      maxStreak: 0,
      lastPhotoDate: null,
      badges: [],
      completedQuests: [],
      following: 0,
      followers: 0,
      totalLikes: 0,
      visitedPOIs: [],
      poiCheckIns: 0,
      referralCode: generateReferralCode(),
      referralCount: 0,
      createdAt: now,
      lastActive: now,
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
    return { id: firebaseUser.uid, ...newUser };
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await fetchUserData(userCredential.user.uid);
    setUser(userData);
  };

  // Sign up
  const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update Firebase profile
    await updateProfile(userCredential.user, { displayName });

    // Create Firestore user document
    const newUser = await createUserDocument(userCredential.user, displayName);
    setUser(newUser);
  };

  // Sign out
  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setFirebaseUser(null);
  };

  // Refresh user data
  const refreshUser = async () => {
    if (firebaseUser) {
      const userData = await fetchUserData(firebaseUser.uid);
      setUser(userData);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
