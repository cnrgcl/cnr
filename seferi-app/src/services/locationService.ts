import * as Location from 'expo-location';
import { AHLAT_BOUNDS } from '../types';

// Konum izni iste
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Konum izni hatası:', error);
    return false;
  }
};

// Mevcut konumu al
export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      throw new Error('Konum izni reddedildi');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return location;
  } catch (error) {
    console.error('Konum alma hatası:', error);
    return null;
  }
};

// İki nokta arasındaki mesafeyi hesapla (Haversine formülü)
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Dünya yarıçapı (metre)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Metre cinsinden mesafe
};

// Konumun Ahlat'ta olup olmadığını kontrol et
export const isLocationInAhlat = (latitude: number, longitude: number): boolean => {
  // Merkez noktaya olan mesafeyi hesapla
  const distance = calculateDistance(
    latitude,
    longitude,
    AHLAT_BOUNDS.center.latitude,
    AHLAT_BOUNDS.center.longitude
  );

  // Yarıçap içinde mi kontrol et
  return distance <= AHLAT_BOUNDS.radius;
};

// Konum bilgilerini formatla
export const formatLocation = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    const result = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (result.length > 0) {
      const location = result[0];
      return `${location.city || ''}, ${location.country || ''}`.trim();
    }
    return 'Bilinmeyen konum';
  } catch (error) {
    console.error('Konum formatlama hatası:', error);
    return 'Konum bilgisi alınamadı';
  }
};
