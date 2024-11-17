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
{/*                     <Text style={styles.learnedTextRigth}> <Text style={styles.learnedTextLeft}>2</Text>/ {elementsByCat}</Text>*/}
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
        backgroundColor: ColorsPalet.backgroundLight, // Softer light blue background
        borderRadius: 8,
        shadowColor: ColorsPalet.gray, // Subtle gray shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1, // For Android
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: ColorsPalet.secondary, // Vibrant secondary tone for the border
    },
    disabledCard: { 
        backgroundColor: ColorsPalet.gray, 
        borderColor: ColorsPalet.gray, 
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorsPalet.primary, 
    },
    categoryStars: {
        fontSize: 25,
        color: ColorsPalet.accent, 
        fontWeight: 'bold',
    },
    spanishText: {
        fontSize: 15,
        color: ColorsPalet.secondary, 
    },
    learnedTextLeft: {
        fontSize: 25,
        fontWeight: 'bold',
        color: ColorsPalet.primary, 
    },
    learnedTextRigth: {
        fontSize: 15,
        fontWeight: 'bold',
        color: ColorsPalet.secondary,
    },
});
