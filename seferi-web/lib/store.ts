import { create } from 'zustand';
import { Photo, POI } from '@/types';

interface AppState {
  // Photos
  photos: Photo[];
  setPhotos: (photos: Photo[]) => void;
  addPhoto: (photo: Photo) => void;

  // POIs
  pois: POI[];
  setPOIs: (pois: POI[]) => void;

  // Current location
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;

  // UI State
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Photos
  photos: [],
  setPhotos: (photos) => set({ photos }),
  addPhoto: (photo) => set((state) => ({ photos: [photo, ...state.photos] })),

  // POIs
  pois: [],
  setPOIs: (pois) => set({ pois }),

  // Location
  currentLocation: null,
  setCurrentLocation: (location) => set({ currentLocation: location }),

  // UI
  isUploading: false,
  setIsUploading: (isUploading) => set({ isUploading }),
}));
