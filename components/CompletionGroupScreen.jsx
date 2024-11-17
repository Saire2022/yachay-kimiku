import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ColorsPalet } from '../constants/Colors';
import { router } from 'expo-router';


const CompletionScreen = ({grupoKichwa}) => {
  const navigation = useNavigation();
  console.log(grupoKichwa)

  return (
    <View style={styles.container}>
      {/* Animación del matraz aforado (usando un texto como ejemplo) */}
      <Animatable.Text
        animation="bounceIn" // Efecto de entrada con rebote
        iterationCount="infinite"
        style={styles.flaskText}
      >
        🧪
      </Animatable.Text>

          {/* Mensaje de felicitación */}
          <Animatable.Text
            animation="fadeIn"
            delay={500}
            style={styles.congratulationsText}
          >
            ¡FELICIDADES! Has terminado de aprender el grupo {grupoKichwa}!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeIn"
            delay={1000}
            style={styles.subText}
          >
            ¡Sigue aprendiendo un nuevo grupo!
          </Animatable.Text>

          <Animatable.View
            animation="bounceInUp"
            delay={1500}
            style={styles.buttonWrapper}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('./(tabs)')}
            >
              <Text style={styles.buttonText}>Seleccionar grupo</Text>
            </TouchableOpacity>
          </Animatable.View>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalet.backgroundLight,
    padding: 20,
    borderWidth: 1,
    borderColor: ColorsPalet.secondary,
    borderRadius: 20
  },
  flaskText: {
    fontSize: 100, // Emoji grande de matraz
    marginBottom: 30,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorsPalet.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  button: {
    backgroundColor: ColorsPalet.secondary,
    padding: 25,
    //paddingVertical: 15,
    //paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CompletionScreen;
