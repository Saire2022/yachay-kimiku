import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { ColorsPalet } from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SelectCategory() {
    const navigation = useNavigation();
    const router = useRouter();
    const { groupID,grupoKichwa, gameOption } = useLocalSearchParams();
    const [gameCategory, setgameCategory] = useState(null);
    
    console.log('Este es el game option:', gameOption);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: gameOption, // Establecer el título vacío
        });
    }, [navigation]);

    const handlePress=(category)=>{
        setgameCategory(category);
        router.push({
            pathname: 'elementsGrid',
            params: {
                groupID: groupID,
                grupoKichwa: grupoKichwa,
                gameOption: gameOption,
                gameCategory: category
                }
        })
    }
    //console.log('gurpo:', groupID, 'tipo:', gameOption)
    return (
        <View style={{ padding: 20 }}>
            <View style={styles.imageContainer}>
                <Fontisto name="laboratory" size={150} color={ColorsPalet.secondary} />
            </View>

            <Text style={styles.text}>Seleccione la <Text style={{ fontWeight: 'bold' }}>categoría</Text> del juego.</Text>

            <TouchableOpacity style={styles.option} onPress={() => handlePress('Nombre - Símbolo')}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center'
                    }}>
                    <Text style={styles.buttonText}>Nombre</Text>
                    <Icon name="arrow-right" size={20} color="#000" style={styles.row}/>
                    <Text style={styles.buttonText}>Símbolo</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 30,
                    marginHorizontal: 20
                }}>
                    <View style={styles.boxLeft}>
                        <Text style={styles.buttonText}>Kuri</Text>
                    </View>
                    <Icon name="long-arrow-right" size={60} color="#000" style={styles.row}/>
                    <View style={styles.boxRight}>
                        <Text style={{color:ColorsPalet.white, fontSize: 18,fontWeight: 'bold',}}>Au</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => handlePress('Símbolo - Nombre')}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent:'center'
                    }}>
                    <Text style={styles.buttonText}>Símbolo</Text>
                    <Icon name="arrow-right" size={20} color="#000" style={styles.row}/>
                    <Text style={styles.buttonText}>Nombre</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 30,
                    marginHorizontal: 20
                }}>
                    <View style={styles.boxLeft}>
                        <Text style={styles.buttonText}>Au</Text>
                    </View>
                    <Icon name="long-arrow-right" size={60} color="#000" style={styles.row}/>
                    <View style={styles.boxRight}>
                        <Text style={{color:ColorsPalet.white, fontSize: 18, fontWeight: 'bold',}}>Kuri</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginTop: 20
    },
    option: {
        marginTop: 30,
        backgroundColor: ColorsPalet.backgroundLight,
        padding: 20,
        height: 168,
        borderRadius: 20,
        borderColor: ColorsPalet.secondary,
        borderWidth:1
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    row:{
        marginHorizontal: 30
    },
    boxLeft: {
        width: 60,
        height: 60,
        backgroundColor: ColorsPalet.white,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1, // Ancho del borde
        borderColor: 'black', // Color del borde negro
        paddingHorizontal: 10, // Espaciado horizontal interno
        shadowColor: "#000", // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Altura de la sombra para Android
        lineHeight: 1, // Altura de línea
        justifyContent: 'center',
        transform: [{ rotate: '-25deg' }] // Inclinación de 25 grados
    },
    boxRight: {
        width: 60,
        height: 60,
        backgroundColor: ColorsPalet.secondary, // Cambia esto si usas un color diferente
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1, // Ancho del borde
        borderColor: 'black', // Color del borde negro
        paddingHorizontal: 10, // Espaciado horizontal interno
        shadowColor: "#000", // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.1, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Altura de la sombra (para Android)
        lineHeight: 1, // Altura de línea
        justifyContent: 'center',
        transform: [{ rotate: '25deg' }] // Inclinación de 25 grados
    }    

})