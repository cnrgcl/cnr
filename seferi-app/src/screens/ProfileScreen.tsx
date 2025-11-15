import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { getCurrentUser, getUserData, logoutUser } from '../services/authService';
import { getUserPhotos } from '../services/photoService';
import { getUserRank } from '../services/leaderboardService';
import { User, Photo } from '../types';

export default function ProfileScreen({ navigation, onLogout }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [rank, setRank] = useState<number>(-1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userData = await getUserData(currentUser.uid);
      setUser(userData);

      const userPhotos = await getUserPhotos(currentUser.uid);
      setPhotos(userPhotos);

      const userRank = await getUserRank(currentUser.uid);
      setRank(userRank);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    Alert.alert('Çıkış', 'Çıkmak istediğinize emin misiniz?', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Çıkış',
        style: 'destructive',
        onPress: async () => {
          await logoutUser();
          onLogout();
        },
      },
    ]);
  };

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.photoImage} />
      <View style={styles.photoOverlay}>
        <Text style={styles.photoPoints}>+{item.points}</Text>
      </View>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.displayName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalPoints}</Text>
          <Text style={styles.statLabel}>Toplam Puan</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{photos.length}</Text>
          <Text style={styles.statLabel}>Fotoğraf</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {rank > 0 ? `#${rank}` : '-'}
          </Text>
          <Text style={styles.statLabel}>Sıralama</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fotoğraflarım ({photos.length})</Text>
      </View>

      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.photoGrid}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz fotoğraf yok</Text>
            <Text style={styles.emptySubtext}>İlk fotoğrafını çek!</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
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
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ecf0f1',
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  photoGrid: {
    backgroundColor: 'white',
    paddingHorizontal: 1,
  },
  photoItem: {
    flex: 1 / 3,
    aspectRatio: 1,
    padding: 1,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ecf0f1',
  },
  photoOverlay: {
    position: 'absolute',
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPoints: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
