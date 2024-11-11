import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Header from '../components/insertName/Header';
import ElementCard from '../components/insertName/ElementCard';
import TextArea from '../components/insertName/TextArea';
import { StyleSheet } from 'react-native';
import { ColorsPalet } from '../constants/Colors';

export default function InsertName() {
    const item = useLocalSearchParams();
    const navigation = useNavigation();

    console.log(item)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '', // Establecer el título vacío
        });
    }, [navigation]);

  return (
    <View style={{padding:20}}>
        {/* Header: BarProgress and Hit */}
        <Header />
        {/* Element Card */}
        <ElementCard element={item} category={item.gameCategory}/>
        {/* InputText */}
        <TextArea element={item} category={item.gameCategory} groupID={item.groupID} gameOption={item.option} grupoKichwa={item.grupoKichwa}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:150,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
        alignContent:'center',
    },
    button:{
            width: '30%',
            height: 26,
            backgroundColor: ColorsPalet.white, // Color de fondo
            borderRadius: 20, // Bordes redondeados
            borderWidth: 1, // Ancho del borde
            borderColor: 'black', // Color del borde negro
            paddingHorizontal: 10, // Espaciado horizontal interno
            shadowColor: "#000", // Color de la sombra
            shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
            shadowOpacity: 0.25, // Opacidad de la sombra
            shadowRadius: 3.84, // Radio de la sombra
            elevation: 5, // Altura de la sombra para Android
            lineHeight: 1, // Altura de línea
            justifyContent: 'center', // Alineación vertical del texto
            alignItems:'center',

    },
    
})