import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ColorsPalet } from '../../constants/Colors'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Header() {
  const [hints, setHints] = useState(5); // Estado para las pistas
  const scaleValue = useRef(new Animated.Value(1)).current; // Valor animado para la escala

  // Función para manejar las pistas
  const handleHint = () => {
    if (hints === 0) {
      Alert.alert('Sin ayudas', 'No tienes más ayudas disponibles.', [
        { text: 'OK', onPress: () => console.log('No hints available') },
      ]);
    } else {
      Alert.alert('Ayuda', 'Se te restarán 2!', [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setHints(hints - 2);
          },
        },
      ]);
    }
  };

  // Función para animar el ícono en un bucle continuo
  const startIconAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3, // Agrandar un poco el ícono
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Volver al tamaño original
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Iniciar la animación al montar el componente
  useEffect(() => {
    startIconAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.hints} onPress={handleHint}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <FontAwesome5
            name="lightbulb"
            size={20}
            color={ColorsPalet.accent} // Relleno amarillo constante
          />
        </Animated.View>
        <Text style={styles.text}>Hints: <Text style={{fontWeight:'bold'}}>{hints}</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f0f0f0', 
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  hints: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: ColorsPalet.background,
    height: 40,
    width: 85,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorsPalet.primary,
    padding: 5,
  },
});
