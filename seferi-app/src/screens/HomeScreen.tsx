import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { getAllPhotos } from '../services/photoService';
import { Photo } from '../types';

export default function HomeScreen({ navigation }: any) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const allPhotos = await getAllPhotos(50);
    setPhotos(allPhotos);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPhotos();
    setRefreshing(false);
  };

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoCard}>
      <View style={styles.photoHeader}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.points}>+{item.points} puan</Text>
      </View>
      <Image source={{ uri: item.imageUrl }} style={styles.photoImage} />
      <View style={styles.photoFooter}>
        <Text style={styles.category}>
          {item.category === 'food' ? '🍽️ Yemek' :
           item.category === 'historical' ? '🏛️ Tarihi Yer' :
           item.category === 'nature' ? '🌄 Doğa' : '📸 Genel'}
        </Text>
        <Text style={styles.location}>
          {item.isInAhlat ? '📍 Ahlat' : '📍 Ahlat Dışı'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🗺️ SEFERİ</Text>
        <Text style={styles.headerSubtitle}>Ahlat Keşif Feed</Text>
      </View>

      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz fotoğraf yok</Text>
            <Text style={styles.emptySubtext}>İlk fotoğrafı sen paylaş!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.cameraButtonText}>📸 Fotoğraf Çek</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  list: {
    padding: 10,
  },
  photoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  photoImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#ecf0f1',
  },
  photoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  category: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#95a5a6',
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: 5,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
