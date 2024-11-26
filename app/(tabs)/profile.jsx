import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/FireBaseConfig';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { ColorsPalet } from '../../constants/Colors'; // Import ColorsPalet

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [learnedElements, setLearnedElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const fetchUserData = async () => {
    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid); // Assuming the Firestore collection is named 'users'
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);

          // Fetch detailed information for learned elements
          if (userData.learnedElements && userData.learnedElements.length > 0) {
            await fetchElementsDetails(userData.learnedElements);
          }
        } else {
          console.error('No such document found for the user.');
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
      }
    }
    setLoading(false);
  };

  const fetchElementsDetails = async (elementIds) => {
    try {
      const elementsRef = collection(db, 'elements');
      const elementsQuery = query(elementsRef, where('__name__', 'in', elementIds)); // Firestore limits "in" queries to 10 items
      const elementsSnapshot = await getDocs(elementsQuery);

      const elements = elementsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLearnedElements(elements);
    } catch (error) {
      console.error('Error fetching elements details:', error);
    }
  };

  const numElement = learnedElements.length;
  const learnedIds = learnedElements;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={ColorsPalet.primary} />
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    );
  }

  const numColumns = 3; // Define el número de columnas, cámbialo si es necesario dinámicamente
  return (
    <View style={styles.mainContainer}>
      {currentUser && userData ? (
        <>
          {/* Encabezado del perfil */}
          <View style={styles.container}>
            <Image
              source={require('../../assets/images/perfil.png')}
              style={styles.profileImage}
            />
            <Text style={styles.username}>{userData.userName || 'Nombre de usuario no disponible'}</Text>
            <Text style={styles.email}>{userData.email || 'Correo no disponible'}</Text>
            <Text style={styles.additionalInfo}>{numElement} Elementos aprendidos:</Text>
          </View>

          {/* Lista de elementos */}
          <FlatList
            style={styles.gridItem}
            data={learnedElements} // Usa una lista vacía como respaldo
            //contentContainerStyle={styles.gridContainer}
            //onRefresh={fetchElementsDetails(learnedIds)}
            //refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.header}>
                  <Text style={styles.numberText}>{item.atomicNumber || 'N/A'}</Text>
                </View>
                <Text style={styles.symbolText}>{item.symbol || 'N/A'}</Text>
                <Text style={styles.nameText}>{item.kichwa || 'Nombre no disponible'}</Text>
                <Text style={styles.weightText}>{item.atomicWeight || 'Peso no disponible'}</Text>
              </View>
            )}
            numColumns={numColumns}
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
  mainContainer: {
    flex: 1, // Permite que FlatList ocupe todo el espacio disponible
    //backgroundColor: ColorsPalet.backgroundLight,
  },
  
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    color: ColorsPalet.secondary, // Accent color for additional info
    marginBottom: 12,
    alignSelf: 'flex-start',
    fontWeight: '600'
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

  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  gridItem: {
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: ColorsPalet.secondary,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    minWidth: 100, // Asegura un ancho mínimo
    alignItems: 'center',
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'flex-start',
    gap: 25
  },

  nameText: {
    fontSize: 16,
    color: ColorsPalet.white,
    fontWeight: 'bold',
  },
  weightText: {
    fontSize: 10,
    color: ColorsPalet.white,
  },
  symbolText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: ColorsPalet.white,
  },
});
