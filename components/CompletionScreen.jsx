import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { ColorsPalet } from '../constants/Colors';
import { router } from 'expo-router';

const CompletionScreen = ({ category, groupID, gameOption, grupoKichwa, completedElementCategory }) => {
  const navigation = useNavigation();

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
      {completedElementCategory ?
        <>
          {/* Mensaje de felicitación */}
          <Animatable.Text
            animation="fadeIn"
            delay={500}
            style={styles.congratulationsText}
          >
            ¡Felicidades! Has completado las dos categorias!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeIn"
            delay={1000}
            style={styles.subText}
          >
            ¡Has desbloqueado un nuevo grupo de elementos!
          </Animatable.Text>

          <Animatable.View
            animation="bounceInUp"
            delay={1500}
            style={styles.buttonWrapper}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('(tabs)')}
            >
              <Text style={styles.buttonText}>Seleccionar nuevo grupo</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>

        :
        <>

          {/* Mensaje de felicitación */}
          <Animatable.Text
            animation="fadeIn"
            delay={500}
            style={styles.congratulationsText}
          >
            ¡Felicidades! Has completado la categoría {category}!
          </Animatable.Text>
          <Animatable.Text
            animation="fadeIn"
            delay={1000}
            style={styles.subText}
          >
            ¡Avanza a la siguiente categoría!
          </Animatable.Text>

          {/* Botón para continuar */}
          <Animatable.View
            animation="bounceInUp"
            delay={1500}
            style={styles.buttonWrapper}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push({
                pathname: 'selectGameCategory',
                params: {
                  groupID: groupID,
                  gameOption: gameOption,
                  grupoKichwa: grupoKichwa
                }
              })}
            >
              <Text style={styles.buttonText}>Seleccionar otra categoría</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      }

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
