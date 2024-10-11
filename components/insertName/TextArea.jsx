import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { ColorsPalet } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'

export default function TextArea() {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 30
    }}>
        <TextInput 
        style={styles.inputText}
        placeholder='Insert name'

        />

        <TouchableOpacity style={styles.sendButton}>
            <Text style={{color:ColorsPalet.white}}>
                Enviar
            </Text>                    
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    inputText: {
        width: '80%',
        height: 60,
        backgroundColor: ColorsPalet.gray, // Color de fondo
        borderRadius: 10, // Bordes redondeados
        borderWidth: 1, // Ancho del borde
        borderColor: 'black', // Color del borde negro
        paddingHorizontal: 10, // Espaciado horizontal interno
        shadowColor: "#000", // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Altura de la sombra para Android
        lineHeight: 1, // Altura de línea
        justifyContent: 'center' // Alineación vertical del texto
    },
    sendButton: {
        width: '60%',
        height: 38,
        backgroundColor: ColorsPalet.primary, 
        borderRadius: 20, 
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
        alignItems:'center'
    }
})