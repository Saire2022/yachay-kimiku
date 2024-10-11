import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ColorsPalet } from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ElementCard({ element, category }) {
    return (
        <View
            style={styles.card}
        >
            <Text style={styles.numberText}>{element.atomicNumber}</Text>
            <View style={styles.symbolContainer}>
                {category == 'Nombre - Símbolo' ?
                    <>
                        <TouchableOpacity>
                            <Ionicons name="volume-high" size={50} color="black" />
                        </TouchableOpacity>
                    </> :
                    <>
                        <Text style={styles.symbolText}>{element.symbol}</Text>
                        <TouchableOpacity>
                            <Ionicons name="volume-high" size={50} color="black" />
                        </TouchableOpacity>
                    </>}
            </View>

            {category == 'Nombre - Símbolo' && (<Text style={styles.nameText}>{element.kichwa}</Text>)}
            <Text style={styles.weightText}>{element.atomicWeight}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 210,
        backgroundColor: ColorsPalet.secondary,
        padding: 10,
        borderWidth: 1,
        borderColor: ColorsPalet.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 30,
    },
    symbolContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: ColorsPalet.gray
    },
    symbolText: {
        fontWeight: 'bold',
        fontSize: 96,
        color: ColorsPalet.white,
    },
    numberText: {
        fontSize: 15,
        color: ColorsPalet.white,
        alignSelf: 'flex-start',
    },
    nameText: {
        fontSize: 24,
        color: ColorsPalet.white,
        fontWeight: 'bold',
    },
    weightText: {
        fontSize: 15,
        color: ColorsPalet.white,
    },
});
