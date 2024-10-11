import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function SplashScreenView() {
    return (
        <View style={styles.container}>
            <Text>Loading Page ...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})