import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { getCurrentLocation } from '../services/locationService';
import { uploadPhoto } from '../services/photoService';
import { getCurrentUser } from '../services/authService';
import { PhotoCategory } from '../types';

export default function CameraScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>(PhotoCategory.NORMAL);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View style={styles.container}><Text>Kamera yükleniyor...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Kamera erişimi gerekli</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync();
      await processAndUpload(photo.uri);
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf çekilemedi');
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setLoading(true);
        await processAndUpload(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf seçilemedi');
    }
  };

  const processAndUpload = async (imageUri: string) => {
    try {
      // Konum al
      const location = await getCurrentLocation();
      if (!location) {
        Alert.alert('Hata', 'Konum alınamadı. Lütfen GPS\'inizi açın.');
        setLoading(false);
        return;
      }

      // Kullanıcı bilgisi
      const currentUser = getCurrentUser();
      if (!currentUser) {
        Alert.alert('Hata', 'Kullanıcı girişi gerekli');
        setLoading(false);
        return;
      }

      // Fotoğrafı yükle
      const photo = await uploadPhoto(
        currentUser.uid,
        currentUser.displayName || 'Anonim',
        imageUri,
        selectedCategory,
        location.coords.latitude,
        location.coords.longitude
      );

      setLoading(false);
      Alert.alert(
        'Başarılı! 🎉',
        `Fotoğraf yüklendi!\n+${photo.points} puan kazandınız!\n${photo.isInAhlat ? '📍 Ahlat\'ta' : '📍 Ahlat dışında'}`,
        [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Fotoğraf yüklenemedi');
      setLoading(false);
    }
  };

  const categories = [
    { key: PhotoCategory.NORMAL, label: '📸 Normal', color: '#95a5a6' },
    { key: PhotoCategory.FOOD, label: '🍽️ Yemek', color: '#e74c3c' },
    { key: PhotoCategory.HISTORICAL, label: '🏛️ Tarihi', color: '#9b59b6' },
    { key: PhotoCategory.NATURE, label: '🌄 Doğa', color: '#27ae60' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Fotoğraf yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Geri</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Kategori Seç:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat.key && {
                      backgroundColor: cat.color,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.key)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === cat.key && styles.categoryButtonTextActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <Text style={styles.galleryButtonText}>🖼️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <View style={styles.placeholder} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginRight: 10,
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  galleryButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButtonText: {
    fontSize: 24,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
  },
  placeholder: {
    width: 50,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
});
