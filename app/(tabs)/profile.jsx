import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { ColorsPalet } from '../../constants/Colors'; // Import ColorsPalet

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid); // Assuming the Firestore collection is named 'users'
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('No such document found for the user.');
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ColorsPalet.primary} />
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentUser && userData ? (
        <>
          {/* Profile Picture */}
          <Image
            source={require('../../assets/images/perfil.png')}
            style={styles.profileImage}
          />
          {/* User Information */}
          <Text style={styles.username}>{userData.userName || 'Nombre de usuario no disponible'}</Text>
          <Text style={styles.email}>{userData.email || 'Correo no disponible'}</Text>
          <Text style={styles.additionalInfo}>
            Aprendió {userData.learnedElements?.length || 0} elementos:
          </Text>

          {/* Learned Elements List */}
          <FlatList
            data={userData.learnedElements || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.learnedItem}>
                <Text style={styles.learnedText}>{item}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay elementos aprendidos aún.</Text>
            }
          />
        </>
      ) : (
        <Text style={styles.errorText}>No estás autenticado. Por favor, inicia sesión.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: ColorsPalet.background, // Light background color
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: ColorsPalet.gray, // Light gray border for profile image
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorsPalet.primary, // Using primary color for username
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: ColorsPalet.secondary, // Secondary color for email
    marginBottom: 16,
  },
  additionalInfo: {
    fontSize: 16,
    color: ColorsPalet.accent, // Accent color for additional info
    marginBottom: 12,
  },
  learnedItem: {
    backgroundColor: ColorsPalet.backgroundLight, // Light background for each item
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    width: '100%',
  },
  learnedText: {
    fontSize: 14,
    color: ColorsPalet.primary, // Primary color for learned text
  },
  emptyText: {
    fontSize: 14,
    color: ColorsPalet.gray, // Gray color for empty message
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 18,
    color: ColorsPalet.error, // Error color for error text
  },
  loadingText: {
    fontSize: 16,
    color: ColorsPalet.secondary, // Secondary color for loading text
  },
});
