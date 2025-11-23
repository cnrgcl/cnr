'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

// Ahlat POI'ları (örnek)
const POIS = [
  {
    id: '1',
    name: 'Ahlat Selçuklu Mezarlığı',
    category: 'Tarihi Alan',
    points: 20,
    lat: 38.7503,
    lng: 42.4831,
    description: 'Dünyanın en büyük İslam mezarlıklarından biri',
    tier: 'A',
  },
  {
    id: '2',
    name: 'Çifte Kümbet',
    category: 'Tarihi Yapı',
    points: 15,
    lat: 38.7489,
    lng: 42.4856,
    description: 'İkiz kümbet yapısı',
    tier: 'A',
  },
  {
    id: '3',
    name: 'Ulu Cami',
    category: 'İbadet Yeri',
    points: 15,
    lat: 38.7512,
    lng: 42.4845,
    description: 'Ahlat\'ın en önemli camisi',
    tier: 'A',
  },
  {
    id: '4',
    name: 'Ahlat Kalesi',
    category: 'Tarihi Yapı',
    points: 20,
    lat: 38.7534,
    lng: 42.4901,
    description: 'Ortaçağ kalesi kalıntıları',
    tier: 'A',
  },
  {
    id: '5',
    name: 'Van Gölü Sahili',
    category: 'Doğa',
    points: 10,
    lat: 38.7445,
    lng: 42.4723,
    description: 'Muhteşem göl manzarası',
    tier: 'B',
  },
  {
    id: '6',
    name: 'Ahlat Müzesi',
    category: 'Müze',
    points: 15,
    lat: 38.7498,
    lng: 42.4867,
    description: 'Yerel tarih ve kültür müzesi',
    tier: 'B',
  },
];

export default function MapPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  if (!user) {
    router.push('/login');
    return null;
  }

  const categories = ['Tümü', ...Array.from(new Set(POIS.map(p => p.category)))];
  const filteredPOIs = selectedCategory === 'Tümü'
    ? POIS
    : POIS.filter(p => p.category === selectedCategory);

  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Geri
            </button>
            <h1 className="text-xl font-bold text-gray-900">Keşif Noktaları</h1>
            <div className="w-16"></div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-4 pb-4 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {filteredPOIs.map(poi => (
          <div
            key={poi.id}
            className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{poi.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    poi.tier === 'A' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {poi.tier}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{poi.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    📍 {poi.category}
                  </span>
                  <span className="flex items-center font-bold text-green-600">
                    +{poi.points} puan
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => openInMaps(poi.lat, poi.lng, poi.name)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
              >
                🗺️ Haritada Aç
              </button>
              <button
                onClick={() => router.push('/camera')}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                📸 Fotoğraf Çek
              </button>
            </div>
          </div>
        ))}

        {filteredPOIs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Bu kategoride nokta bulunamadı</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">💡 Nasıl Puan Kazanırım?</h3>
          <ul className="space-y-2 text-sm">
            <li>1️⃣ Bir keşif noktasına git</li>
            <li>2️⃣ Fotoğraf çek butonuna tıkla</li>
            <li>3️⃣ Konum bilgisiyle fotoğraf yükle</li>
            <li>4️⃣ Puan kazan ve seviye atla! 🎉</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
