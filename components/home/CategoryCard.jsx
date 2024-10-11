import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ColorsPalet } from './../../constants/Colors';

export default function CategoryCard({ elememtsGroup, kichwa, spanish, unlockStars, elementsByCat, unlockedGroups }) {
    const router = useRouter();
    
    // Verifica si el grupo está desbloqueado
    const isUnlocked = unlockedGroups.includes(elememtsGroup);

    const handleCategory = () => {
        if (isUnlocked) { // Solo navega si el grupo está desbloqueado
            router.push({
                pathname: 'selectGameOption',
                params: {
                    groupID: elememtsGroup,
                    grupoKichwa: kichwa,
                    grupoSpanish: spanish
                }
            });
        }
    };

    return (
        <TouchableOpacity
            style={[styles.categoryCard, !isUnlocked && styles.disabledCard]} // Cambia el estilo si está deshabilitado
            onPress={handleCategory}
            disabled={!isUnlocked} // Deshabilita el toque si no está desbloqueado
        >
            <View>
                <Text style={styles.categoryName}>{kichwa}</Text>
                <Text style={styles.spanishText}>{spanish}</Text>
            </View>
            <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={styles.learnedTextRigth}> <Text style={styles.learnedTextLeft}>2</Text>/ {elementsByCat}</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={styles.categoryStars}>{unlockStars} </Text>
                    <AntDesign name="star" size={25} color="#9747FF" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryCard: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1, // Para Android
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: ColorsPalet.secondary,
    },
    disabledCard: { // Estilo para el botón deshabilitado
        backgroundColor: '#e0e0e0', // Color de fondo deshabilitado
        borderColor: '#b0b0b0', // Color de borde deshabilitado
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryStars: {
        fontSize: 25,
        color: ColorsPalet.primary,
        fontWeight: 'bold',
    },
    spanishText: {
        fontSize: 15,
        color: '#ccc',
    },
    learnedTextLeft: {
        fontSize: 25,
        fontWeight: 'bold',
        color: ColorsPalet.primary,
    },
    learnedTextRigth: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ColorsPalet.primary,
    },
});
