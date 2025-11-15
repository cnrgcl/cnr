import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { getLeaderboard } from '../services/leaderboardService';
import { LeaderboardEntry } from '../types';

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard(100);
    setLeaderboard(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLeaderboard();
    setRefreshing(false);
  };

  const getMedalEmoji = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const renderItem = ({ item }: { item: LeaderboardEntry }) => {
    const isTopThree = item.rank <= 3;

    return (
      <View
        style={[
          styles.item,
          isTopThree && styles.topThreeItem,
        ]}
      >
        <View style={styles.rankContainer}>
          <Text style={[styles.rank, isTopThree && styles.topThreeRank]}>
            {getMedalEmoji(item.rank) || `#${item.rank}`}
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.userName, isTopThree && styles.topThreeUserName]}>
            {item.userName}
          </Text>
          <Text style={styles.userStats}>
            {item.photoCount} fotoğraf
          </Text>
        </View>

        <View style={styles.pointsContainer}>
          <Text style={[styles.points, isTopThree && styles.topThreePoints]}>
            {item.totalPoints}
          </Text>
          <Text style={styles.pointsLabel}>puan</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>🏆 Liderlik Tablosu</Text>
      <Text style={styles.headerSubtitle}>
        Toplam {leaderboard.length} katılımcı
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboard}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz kimse yarışmaya katılmadı</Text>
            <Text style={styles.emptySubtext}>İlk sen ol!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#3498db',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topThreeItem: {
    backgroundColor: '#fff9e6',
    borderWidth: 2,
    borderColor: '#f1c40f',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  topThreeRank: {
    fontSize: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  topThreeUserName: {
    color: '#f39c12',
  },
  userStats: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  topThreePoints: {
    fontSize: 24,
    color: '#f39c12',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 100,
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
});
