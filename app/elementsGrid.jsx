import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import ElementCard from '../components/ElementCard';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../config/FireBaseConfig';
import SplashScreenView from '../components/SplashScreenView';

export default function ElementsGrid() {
    const navigation = useNavigation();
    const { groupID, grupoKichwa, gameOption, gameCategory } = useLocalSearchParams();
    const [userData, setUserData] = useState(null);
    const [filteredElements, setFilteredElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: grupoKichwa,
        });
        if (user) {
            fetchData();
        }
    }, [navigation, user, groupID]);

    // Combina la obtención de datos del usuario y filtrado de elementos
    const fetchData = async () => {
        if (!groupID) {
            console.error('Valor de groupID vacío!');
            return;
        }
        setLoading(true);
        try {
            // Obtener datos del usuario y elementos en paralelo
            const [userDoc, elementsSnapshot] = await Promise.all([
                getDoc(doc(db, 'users', user.uid)),
                getDocs(query(collection(db, 'elements'), where('groupID', '==', groupID)))
            ]);

            if (userDoc.exists()) {
                setUserData(userDoc.data());
                console.log('Datos del usuario:', userDoc.data());
            } else {
                console.log('No se encontraron datos para el usuario.');
            }

            const elementsList = elementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFilteredElements(elementsList);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <SplashScreenView />;
    }

    const numColumns = 3;
    const option = gameOption === 'Selección múltiple' ? 'multipleChoice' : 'insertName';
    
    const nameSymbolLearnedElements = userData?.gameStats?.[groupID]?.[option]?.nameSymbol?.learnedElements || [];
    const symbolNameLearnedElements = userData?.gameStats?.[groupID]?.[option]?.symbolName?.learnedElements || [];

    //console.log(nameSymbolLearnedElements, symbolNameLearnedElements);

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                style={styles.elementList}
                data={filteredElements}
                refreshing={loading}
                onRefresh={fetchData}
                renderItem={({ item }) => (
                    <ElementCard
                        element={item}
                        option={gameOption}
                        category={gameCategory}
                        nameSymbolLearnedElements={nameSymbolLearnedElements}
                        symbolNameLearnedElements={symbolNameLearnedElements}
                        filteredElements={filteredElements}
                        groupID={groupID}
                        grupoKichwa={grupoKichwa}
                    />
                )}
                numColumns={numColumns}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    elementList: {
        gap: 10,
    },
});
