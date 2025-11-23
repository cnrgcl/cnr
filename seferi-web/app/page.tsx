'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecting to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🗺️</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SEFERİ</h1>
              <p className="text-sm text-gray-600">Ahlat Keşif Platformu</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Merhaba,</p>
              <p className="font-semibold text-gray-900">{user.displayName}</p>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Profil
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Puan */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Toplam Puan</p>
                <p className="text-4xl font-bold mt-1">{user.points}</p>
              </div>
              <span className="text-5xl opacity-50">⭐</span>
            </div>
          </div>

          {/* Seviye */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Seviye</p>
                <p className="text-4xl font-bold mt-1">{user.level}</p>
              </div>
              <span className="text-5xl opacity-50">🏆</span>
            </div>
          </div>

          {/* Fotoğraf */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Fotoğraflar</p>
                <p className="text-4xl font-bold mt-1">{user.photoCount}</p>
              </div>
              <span className="text-5xl opacity-50">📸</span>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Streak</p>
                <p className="text-4xl font-bold mt-1">{user.streak} 🔥</p>
              </div>
              <span className="text-5xl opacity-50">📅</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => router.push('/camera')}
            className="bg-white hover:bg-gray-50 rounded-xl shadow-md p-8 text-center transition transform hover:scale-105"
          >
            <span className="text-6xl mb-4 block">📸</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fotoğraf Çek</h3>
            <p className="text-gray-600">Yeni bir fotoğraf yükle ve puan kazan</p>
          </button>

          <button
            onClick={() => router.push('/map')}
            className="bg-white hover:bg-gray-50 rounded-xl shadow-md p-8 text-center transition transform hover:scale-105"
          >
            <span className="text-6xl mb-4 block">🗺️</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Haritayı Keşfet</h3>
            <p className="text-gray-600">Yakınındaki POI'ları görüntüle</p>
          </button>

          <button
            onClick={() => router.push('/leaderboard')}
            className="bg-white hover:bg-gray-50 rounded-xl shadow-md p-8 text-center transition transform hover:scale-105"
          >
            <span className="text-6xl mb-4 block">🏆</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Liderlik Tablosu</h3>
            <p className="text-gray-600">Sıralamanda yüksel</p>
          </button>
        </div>

        {/* Rozetler Preview */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rozetlerim</h2>
          {user.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {user.badges.map((badge, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-4xl">🏅</span>
                  <p className="text-xs text-gray-600 mt-2">{badge}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <span className="text-6xl block mb-4">🎯</span>
              <p>Henüz rozet kazanmadınız</p>
              <p className="text-sm mt-2">Fotoğraf paylaşarak rozetler kazanın!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
