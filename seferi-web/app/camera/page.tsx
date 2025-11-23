'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

export default function CameraPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Konum al
  const getLocation = () => {
    if ('geolocation' in navigator) {
      toast.loading('Konum alınıyor...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast.dismiss();
          toast.success('Konum alındı!');
        },
        (error) => {
          toast.dismiss();
          toast.error('Konum alınamadı: ' + error.message);
        }
      );
    } else {
      toast.error('Tarayıcınız konum desteği vermiyor');
    }
  };

  // Fotoğraf seç
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Otomatik konum al
      getLocation();
    }
  };

  // Yükle
  const handleUpload = async () => {
    if (!preview) {
      toast.error('Önce bir fotoğraf seçin');
      return;
    }

    if (!location) {
      toast.error('Konum bilgisi gerekli');
      return;
    }

    setUploading(true);

    try {
      // Demo mode: LocalStorage'a kaydet
      const photos = JSON.parse(localStorage.getItem('demo_photos') || '[]');
      const newPhoto = {
        id: Date.now().toString(),
        url: preview,
        location: location,
        timestamp: new Date().toISOString(),
        userId: user?.id,
        points: 10, // Her fotoğraf 10 puan
      };

      photos.push(newPhoto);
      localStorage.setItem('demo_photos', JSON.stringify(photos));

      // Kullanıcı puanını güncelle
      const currentUser = JSON.parse(localStorage.getItem('demo_user') || '{}');
      currentUser.stats.totalPoints += 10;
      currentUser.stats.photosShared += 1;
      localStorage.setItem('demo_user', JSON.stringify(currentUser));

      toast.success('Fotoğraf yüklendi! +10 puan kazandınız! 🎉');

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      toast.error('Yükleme başarısız: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

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
            <h1 className="text-xl font-bold text-gray-900">Fotoğraf Yükle</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Preview */}
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setPreview(null);
                  setLocation(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-gray-500 mb-2">Fotoğraf seçin veya çekin</p>
            </div>
          )}

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            id="photo-input"
          />

          {!preview && (
            <label
              htmlFor="photo-input"
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg text-center font-medium cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              📸 Fotoğraf Seç / Çek
            </label>
          )}

          {/* Location Info */}
          {location && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center text-green-800">
                <span className="mr-2">📍</span>
                <div>
                  <p className="font-medium">Konum Alındı</p>
                  <p className="text-sm text-green-600">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!location && preview && (
            <button
              onClick={getLocation}
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-all"
            >
              📍 Konum Al
            </button>
          )}

          {/* Upload Button */}
          {preview && location && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Yükleniyor...' : '🚀 Yükle ve +10 Puan Kazan!'}
            </button>
          )}

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>İpucu:</strong> Ahlat&apos;taki tarihi yerlerin fotoğraflarını çekip yükleyerek puan kazanın!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
