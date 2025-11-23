import { Timestamp } from 'firebase/firestore';

// User type
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;

  // İstatistikler
  points: number;
  level: number;
  photoCount: number;

  // Gamification
  streak: number;
  maxStreak: number;
  lastPhotoDate: Timestamp | null;
  badges: string[];
  completedQuests: string[];

  // Sosyal
  following: number;
  followers: number;
  totalLikes: number;

  // POI
  visitedPOIs: string[];
  poiCheckIns: number;

  // Referral
  referralCode: string;
  referredBy?: string;
  referralCount: number;

  // Metadata
  createdAt: Timestamp;
  lastActive: Timestamp;
}

// Photo type
export interface Photo {
  id: string;
  userId: string;

  // Görsel
  imageUrl: string;
  thumbnailUrl?: string;

  // Kategori ve Konum
  category: 'normal' | 'food' | 'historical' | 'nature' | 'culture' | 'accommodation';
  location: {
    lat: number;
    lng: number;
    address?: string;
    isInAhlat: boolean;
  };

  // POI İlişkisi
  poiId?: string;
  isCheckIn: boolean;
  businessTag?: string;

  // Puanlama
  points: number;
  bonusPoints: number;
  bonusReasons: string[];

  // Sosyal
  likes: number;
  comments: number;

  // Hashtag ve Açıklama
  caption?: string;
  hashtags: string[];

  // Metadata
  createdAt: Timestamp;
  uploadedAt: Timestamp;
}

// POI (Points of Interest) type
export interface POI {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  tier: 'A' | 'B' | 'C';
  category: 'historical' | 'nature' | 'culture' | 'food' | 'accommodation';

  // Konum
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  address?: string;

  // Puanlama
  points: {
    firstCheckIn: number;
    repeat: number;
  };

  // Görsel
  imageUrl?: string;
  thumbnailUrl?: string;

  // Bilgi
  bestTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  hashtags: string[];

  // İşletme Bilgisi
  isBusiness: boolean;
  businessInfo?: {
    type: 'restaurant' | 'hotel' | 'cafe' | 'shop';
    speciality?: string;
    openingHours?: string;
    phoneNumber?: string;
    qrCode?: string;
  };

  // İstatistikler
  checkIns: number;
  uniqueVisitors: number;
  photoCount: number;

  // Metadata
  createdAt: Timestamp;
  isActive: boolean;
}

// Badge type
export interface Badge {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'special';
  category: 'exploration' | 'food' | 'social' | 'special' | 'time';

  // Gereksinim
  requirement: {
    type: 'poi_count' | 'photo_count' | 'specific_pois' | 'food_variety' |
          'likes_received' | 'referral_count' | 'streak' | 'time_based' | 'custom';
    value: number | string[];
    description: string;
  };

  bonusPoints?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
}

// Quest type
export interface Quest {
  id: string;
  title: string;
  description: string;
  icon?: string;
  type: 'daily' | 'weekly' | 'special';
  resetType?: 'daily' | 'weekly' | 'manual';

  // Gereksinim
  requirement: {
    type: 'photo_upload' | 'poi_visit' | 'like_photos' | 'comment' |
          'category_variety' | 'restaurant_visit' | 'referral' | 'custom';
    target: number | string[];
  };

  // Ödül
  reward: {
    points: number;
    badge?: string;
  };

  // Geçerlilik
  isActive: boolean;
  activeFrom?: Timestamp;
  activeTo?: Timestamp;

  order: number;
  createdAt: Timestamp;
  createdBy: 'system' | 'admin';
}

// Location type (Browser Geolocation API)
export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

// Ahlat boundary check
export const AHLAT_BOUNDS = {
  north: 38.77,
  south: 38.72,
  east: 42.52,
  west: 42.45,
  center: { lat: 38.7508, lng: 42.4822 }
};

// Helper: Check if coordinates are in Ahlat
export function isInAhlat(lat: number, lng: number): boolean {
  return (
    lat >= AHLAT_BOUNDS.south &&
    lat <= AHLAT_BOUNDS.north &&
    lng >= AHLAT_BOUNDS.west &&
    lng <= AHLAT_BOUNDS.east
  );
}

// Helper: Calculate distance between two points (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}
