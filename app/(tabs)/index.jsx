import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './../../components/home/Header';
import CategoryCard from '../../components/home/CategoryCard';
import { auth, db } from '../../config/FireBaseConfig'; // Asegúrate de importar Firestore
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import SplashScreenView from '../../components/SplashScreenView';

export default function HomeScreen() {
    const [groups, setGroups] = useState([]); // Estado para las categorías
    const [loading, setLoading] = useState(true); // Estado de carga
    const [userData, setUserData] = useState(null);
    const user = auth.currentUser; // Verificar si hay un usuario logueado

    const learnedItems = userData?.learnedElements ? userData.learnedElements.length : 0;
    const stars = userData?.totalStars || 0;
    const userName= userData?.userName || '';
    const unlockedGroups = userData?.unlockedGroups || [];

    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchGroup(); 
        }
    }, [user]); 
    // Obtener las categorías del Firestore
    const fetchGroup = async () => {
        setLoading(true); 
        try {
            const querySnapshot = await getDocs(collection(db, 'elementGroups'));
            const groupList = [];
            querySnapshot.forEach((doc) => {
                groupList.push({ id: doc.id, ...doc.data() });
            });
    
            // Ordena la lista basada en el valor numérico después de la letra "G"
            groupList.sort((a, b) => {
                const numA = parseInt(a.id.replace('G', ''), 10);
                const numB = parseInt(b.id.replace('G', ''), 10);
                return numA - numB;
            });
    
            setGroups(groupList); // Actualiza el estado con los grupos ordenados
        } catch (error) {
            console.error('Error al obtener los grupos:', error);
        } finally {
            setLoading(false); 
        }
    };
    

    const fetchUserData = async () => {
        try {
            const userDocRef = doc(db, 'users', user.uid); // Referencia al documento con el UID
            const userDoc = await getDoc(userDocRef); // Obtener el documento
    
            if (userDoc.exists()) {
                setUserData(userDoc.data()); // Asigna los datos del usuario
                //console.log(userDoc.data());
            } else {
                console.log('No se encontraron datos para el usuario.');
            }
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };

    if (loading) {
        return <SplashScreenView />;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <Header learnedItems={learnedItems} stars={stars} userName={userName}/>
            <View style={styles.line} />

            {/* Menú */}
            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <CategoryCard elememtsGroup={item.id} 
                    kichwa={item.kichwa} spanish={item.spanish} 
                    unlockStars={item.unlockStars} 
                    elementsByCat={item.elements?.length || 0}
                    unlockedGroups={unlockedGroups}
                    />
                )}
                refreshing={loading}
                onRefresh={() => fetchGroup()}
                keyExtractor={(item) => item.id.toString()} // Asegúrate de tener una clave única
                contentContainerStyle={{ paddingBottom: 75 }} // Para agregar un poco de espacio al final
                showsVerticalScrollIndicator={false} // Ocultar la barra de desplazamiento vertical
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
    },
    line: {
        height: 2, // Altura de la línea
        backgroundColor: '#ccc', // Color de la línea
        marginBottom: 20, // Espacio inferior, si es necesario
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, // Espacio inferior
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
