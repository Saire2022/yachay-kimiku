import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig'; // Ensure Firestore is properly configured
import { ColorsPalet } from '../../constants/Colors';
import { Image } from 'react-native';

export default function Ranking() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and their learnedElements
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users')); // Assuming 'users' is your collection
      const userList = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userList.push({ id: doc.id, ...userData });
      });

      // Sort users based on the number of learnedElements
      userList.sort((a, b) => (b.learnedElements?.length || 0) - (a.learnedElements?.length || 0));

      setUsers(userList); // Set the sorted user list
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchUsers}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image
              source={require('../../assets/images/perfil.png')}
              style={styles.avatar}
            />
            <Text style={styles.username}>{item.userName}</Text>
            <Text style={styles.learnedElements}>Elementos: {item.learnedElements?.length || 0}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    //backgroundColor: ColorsPalet.background, // Light airy background
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: ColorsPalet.primary, // Deep blue for better contrast
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: ColorsPalet.backgroundLight, // Light blue background for items
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: ColorsPalet.gray,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ColorsPalet.accent,
    alignSelf: 'flex-start'
  },
  username: {
    fontSize: 16,
    color: ColorsPalet.primary, // Deep blue for usernames
  },
  learnedElements: {
    fontSize: 14,
    color: ColorsPalet.secondary, // Vibrant tone for learned elements count
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16, // Space between avatar and user details
  },
});
