import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ColorsPalet } from './../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ElementCard({ element, option, category, nameSymbolLearnedElements, symbolNameLearnedElements, groupID, grupoKichwa }) {
    const router = useRouter();
    const [isLearned, setIsLearned] = useState(false);
    //console.log('Grupokichuwa', grupoKichwa)

    useEffect(() => {
        if (category === 'Nombre - Símbolo' && nameSymbolLearnedElements.includes(element.id)) {
            setIsLearned(true);
        } else if (category === 'Símbolo - Nombre' && symbolNameLearnedElements.includes(element.id)) {
            setIsLearned(true);
        } else {
            setIsLearned(false);
        }
    }, [option, nameSymbolLearnedElements, symbolNameLearnedElements, element.id]);

    const handlePress = () => {
        const selectedCategory = category;
        if (option === 'Insertar nombre') {
            router.push({
                pathname: '/insertName',
                params: {
                    ...element,
                    gameCategory: selectedCategory,
                    //nameSymbolLearnedElements: serializedNameSymbolLearnedElements,
                    //symbolNameLearnedElements: serializedSymbolNameLearnedElements,
                    //filteredElements: serializedFilteredElements,
                    option: option,
                    groupID: groupID,
                    grupoKichwa: grupoKichwa
                },
            });
        } else {
            router.push({
                pathname: '/multipleChoice',
                params: {
                    ...element,
                    gameCategory: selectedCategory,
                    //nameSymbolLearnedElements: serializedNameSymbolLearnedElements,
                    //symbolNameLearnedElements: serializedSymbolNameLearnedElements,
                    //filteredElements: serializedFilteredElements,
                    option: option,
                    groupID: groupID,
                    grupoKichwa: grupoKichwa
                },
            });
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <View style={styles.header}>
                <Text style={styles.numberText}>{element.atomicNumber}</Text>
                {/* Mostrar el ícono de checkmark si el elemento está en la lista correspondiente */}
                {isLearned && (
                    <Ionicons name="checkmark-circle" size={40} color={ColorsPalet.primary} />
                )}
            </View>

            {category === 'Nombre - Símbolo' ? (
                <>
                    <Text style={styles.nameText}>{element.kichwa}</Text>
                </>
            ) : (
                <>
                    <Text style={styles.symbolText}>{element.symbol}</Text>
                </>
            )}

            <Text style={styles.weightText}>{element.atomicWeight}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 110,
        backgroundColor: ColorsPalet.secondary,
        padding: 5,
        borderWidth: 1,
        borderColor: ColorsPalet.primary,
        margin: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 15,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 25
    },
    symbolText: {
        fontWeight: 'bold',
        fontSize: 40,
        color: ColorsPalet.white,
    },
    numberText: {
        fontSize: 12,
        color: ColorsPalet.white,
        alignSelf: 'flex-start',
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
});
