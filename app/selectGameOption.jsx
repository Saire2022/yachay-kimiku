import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { ColorsPalet } from './../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SelectGameOption() {
    const { groupID,grupoKichwa, grupoSpanish } = useLocalSearchParams();
    const navigation = useNavigation();
    const router = useRouter();
    const [gameOption, setGameOption] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${grupoKichwa} - ${grupoSpanish}`, // Establecer ambos como título
        });
    }, [navigation, grupoKichwa, grupoSpanish]);

    const handlePress = (option) => {
        setGameOption(option);
        router.push({
            pathname: 'selectGameCategory',
            params: {
                groupID: groupID,
                grupoKichwa: grupoKichwa, 
                gameOption: option }, // Pasar el parámetro correctamente
        });
    };
    console.log('Grupo:', groupID)

    return (
        <View style={{ padding: 20 }}>
            <View style={styles.imageContainer}>
                <Fontisto name="laboratory" size={150} color={ColorsPalet.secondary} />
            </View>

            <Text style={styles.text}>
                Seleccionar el <Text style={{ fontWeight: 'bold' }}>tipo</Text> de juego.
            </Text>

            <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('Selección múltiple')}
            >
                <Text style={styles.buttonText}>Selección múltiple</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.smallContainer}></View>
                    <View style={styles.smallContainerChecked}>
                        <Ionicons name="checkmark-circle" size={50} color={ColorsPalet.primary} />
                    </View>
                    <View style={styles.smallContainer}></View>
                    <View style={styles.smallContainer}></View>
                </View>
            </TouchableOpacity>

            {/* Insertar nombre */}
            <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('Insertar nombre')}
            >
                <Text style={styles.buttonText}>Insertar nombre</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.inputText}>
                        <Text style={{ fontSize: 16 }}>Kuri |</Text>
                    </View>
                    <View style={styles.sendButton}>
                        <Text style={{ color: ColorsPalet.white }}>Enviar</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    smallContainer: {
        width: 66,
        height: 51,
        backgroundColor: ColorsPalet.primary,
        borderRadius: 10
    },
    smallContainerChecked: {
        width: 66,
        height: 51,
        backgroundColor: ColorsPalet.secondary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        width: '60%',
        height: 36,
        backgroundColor: ColorsPalet.gray,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    sendButton: {
        width: '30%',
        height: 36,
        backgroundColor: ColorsPalet.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
