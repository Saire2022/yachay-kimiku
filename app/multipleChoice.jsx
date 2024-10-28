import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ElementCard from '../components/insertName/ElementCard';
import Header from '../components/insertName/Header';
import { ColorsPalet } from '../constants/Colors';
import OptionsCards from '../components/multipleChoise/OptionsCards';

export default function MultipleChoice() {
    const navigation = useNavigation();
    const { grupoKichwa,groupID,option, gameCategory, ...element } = useLocalSearchParams();

    console.log('----------------------------------------------------')
    console.log('Element:', element);
    console.log('grupo ID: ', groupID )
    console.log('grupo Kichwa: ', grupoKichwa )
    console.log('option: ', option )
    console.log('gameCategory: ', gameCategory )

    useEffect(() => {
        navigation.setOptions({
            headerTitle: gameCategory, // Establecer el título vacío
        });
    }, [navigation]);

    return (
        <View style={{ padding: 20 }}>
            {/* Header: BarProgress and Hit */}
            <Header />
            {/* Element Card */}
            <ElementCard element={element} category={gameCategory} />
            {/* Select Options */}
            <OptionsCards 
                element={element}
                category={gameCategory} 
                //nameSymbolLearnedElements={parsedNameSymbolLearnedElements}
                //symbolNameLearnedElements={parsedSymbolNameLearnedElements}
                //filteredElements={parsedFilteredElements}
                option={option}
                groupID={groupID}
                grupoKichwa={grupoKichwa}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    button: {
        width: '40%',
        height: 40,
        backgroundColor: ColorsPalet.secondary, // Color de fondo
        borderRadius: 15, // Bordes redondeados
        borderWidth: 1, // Ancho del borde
        borderColor: ColorsPalet.primary, // Color del borde negro
        lineHeight: 1, // Altura de línea
        justifyContent: 'center', // Alineación vertical del texto
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColorsPalet.white
    }
})