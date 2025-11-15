// Kullanıcı tipi
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  totalPoints: number;
  createdAt: Date;
}

// Fotoğraf tipi
export interface Photo {
  id: string;
  userId: string;
  userName: string;
  imageUrl: string;
  category: PhotoCategory;
  location: Location;
  points: number;
  hashtags: string[];
  createdAt: Date;
  isInAhlat: boolean;
}

// Fotoğraf kategorileri
export enum PhotoCategory {
  NORMAL = 'normal',
  FOOD = 'food',
  HISTORICAL = 'historical',
  NATURE = 'nature',
  CULTURE = 'culture'
}

// Konum tipi
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
}

// Liderlik tablosu tipi
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  photoURL?: string;
  totalPoints: number;
  photoCount: number;
  rank: number;
}

// Puanlama kuralları
export interface ScoringRules {
  normalPhoto: number;
  foodInAhlat: number;
  foodOutsideAhlat: number;
  historicalSite: number;
  nature: number;
}

// Ahlat koordinatları (yaklaşık sınırlar)
export const AHLAT_BOUNDS = {
  minLat: 38.7,
  maxLat: 38.8,
  minLng: 42.4,
  maxLng: 42.6,
  center: {
    latitude: 38.7516,
    longitude: 42.4808
  },
  radius: 10000 // 10km radius (meter)
};

// Puanlama sabitleri
export const SCORING: ScoringRules = {
  normalPhoto: 1,
  foodInAhlat: 5,
  foodOutsideAhlat: 0.5,
  historicalSite: 10,
  nature: 8
};
