'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  level: number;
  photosShared: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    // Demo mode: Örnek kullanıcılar oluştur
    const demoUsers: LeaderboardUser[] = [
      { id: '1', name: 'Ahmet Yılmaz', points: 850, level: 12, photosShared: 45 },
      { id: '2', name: 'Ayşe Demir', points: 720, level: 10, photosShared: 38 },
      { id: '3', name: 'Mehmet Kaya', points: 650, level: 9, photosShared: 32 },
      { id: '4', name: 'Zeynep Arslan', points: 580, level: 8, photosShared: 29 },
      { id: '5', name: 'Mustafa Çelik', points: 490, level: 7, photosShared: 24 },
      { id: '6', name: 'Fatma Şahin', points: 420, level: 6, photosShared: 21 },
      { id: '7', name: 'Ali Özdemir', points: 380, level: 6, photosShared: 19 },
      { id: '8', name: 'Emine Yıldız', points: 320, level: 5, photosShared: 16 },
    ];

    // Mevcut kullanıcıyı ekle
    if (user) {
      const currentUserData = JSON.parse(localStorage.getItem('demo_user') || '{}');
      demoUsers.push({
        id: user.id,
        name: user.name,
        points: currentUserData.stats?.totalPoints || 150,
        level: currentUserData.stats?.level || 5,
        photosShared: currentUserData.stats?.photosShared || 8,
        isCurrentUser: true,
      });
    }

    // Puana göre sırala
    const sorted = demoUsers.sort((a, b) => b.points - a.points);
    setLeaderboard(sorted);
  }, [user]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const userRank = leaderboard.findIndex(u => u.isCurrentUser) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Geri
            </button>
            <h1 className="text-xl font-bold text-gray-900">Liderlik Tablosu</h1>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Time Filter */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tüm Zamanlar
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeFilter === 'month'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bu Ay
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                timeFilter === 'week'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bu Hafta
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Current User Rank */}
        {userRank > 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Sıralamanız</p>
                <p className="text-3xl font-bold">#{userRank}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Toplam Puanınız</p>
                <p className="text-3xl font-bold">
                  {leaderboard.find(u => u.isCurrentUser)?.points || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-3">
          {leaderboard.map((item, index) => {
            const rank = index + 1;
            const medalEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';

            return (
              <div
                key={item.id}
                className={`rounded-xl p-4 transition-all ${
                  item.isCurrentUser
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400'
                    : 'bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="text-center w-12">
                      {medalEmoji ? (
                        <span className="text-3xl">{medalEmoji}</span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">#{rank}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {item.name.charAt(0)}
                    </div>

                    {/* User Info */}
                    <div>
                      <p className="font-bold text-gray-900 flex items-center">
                        {item.name}
                        {item.isCurrentUser && (
                          <span className="ml-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                            Siz
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        Seviye {item.level} • {item.photosShared} fotoğraf
                      </p>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{item.points}</p>
                    <p className="text-xs text-gray-500">puan</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">🏆 Nasıl Üste Çıkarım?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Daha fazla fotoğraf paylaş</li>
            <li>• Farklı keşif noktalarını ziyaret et</li>
            <li>• Günlük görevleri tamamla</li>
            <li>• Rozet kazan ve bonus puan al</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
