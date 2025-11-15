import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { LeaderboardEntry, User } from '../types';

// Liderlik tablosunu getir
export const getLeaderboard = async (limitCount: number = 100): Promise<LeaderboardEntry[]> => {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('totalPoints', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const leaderboard: LeaderboardEntry[] = [];

    querySnapshot.forEach((doc, index) => {
      const userData = doc.data() as User;
      leaderboard.push({
        userId: userData.id,
        userName: userData.displayName,
        photoURL: userData.photoURL,
        totalPoints: userData.totalPoints,
        photoCount: 0, // Bunu ayrı bir query ile alabiliriz
        rank: index + 1,
      });
    });

    return leaderboard;
  } catch (error) {
    console.error('Liderlik tablosu hatası:', error);
    return [];
  }
};

// Kullanıcının sıralamasını getir
export const getUserRank = async (userId: string): Promise<number> => {
  try {
    const leaderboard = await getLeaderboard();
    const userEntry = leaderboard.find((entry) => entry.userId === userId);
    return userEntry ? userEntry.rank : -1;
  } catch (error) {
    console.error('Kullanıcı sırası hatası:', error);
    return -1;
  }
};

// İlk 10'u getir (podium için)
export const getTopTen = async (): Promise<LeaderboardEntry[]> => {
  return getLeaderboard(10);
};
