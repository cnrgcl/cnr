'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success('Giriş başarılı!');
        router.push('/');
      } else {
        if (!displayName.trim()) {
          toast.error('Lütfen adınızı girin');
          setLoading(false);
          return;
        }
        await signUp(email, password, displayName);
        toast.success('Hesap oluşturuldu!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Bu email zaten kullanılıyor');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Şifre en az 6 karakter olmalı');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Geçersiz email adresi');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('Kullanıcı bulunamadı');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Hatalı şifre');
      } else {
        toast.error('Bir hata oluştu: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo/Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🗺️ SEFERİ
          </h1>
          <p className="text-gray-600">
            Ahlat'ı Keşfet, Puan Kazan!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* İsim (Sadece kayıt olurken) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adınız
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Ahmet Yılmaz"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="ornek@email.com"
              required
            />
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Yükleniyor...
              </span>
            ) : (
              isLogin ? 'Giriş Yap' : 'Kayıt Ol'
            )}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setDisplayName('');
            }}
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            {isLogin ? (
              <>Hesabınız yok mu? <span className="underline">Kayıt Olun</span></>
            ) : (
              <>Zaten hesabınız var mı? <span className="underline">Giriş Yapın</span></>
            )}
          </button>
        </div>

        {/* Demo Bilgisi */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Demo Sürümü:</strong> Firebase config eklenince çalışacak. Şu an UI görüntüleniyor.
          </p>
        </div>
      </div>
    </div>
  );
}
