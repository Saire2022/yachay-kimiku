import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto'; // Asegúrate de tener esto instalado
import AntDesign from '@expo/vector-icons/AntDesign'; // Usa el ícono de estrellas de AntDesign o el que prefieras
import { ColorsPalet } from '../../constants/Colors';

export default function Header({ learnedItems = 5, stars, userName }) {
  const [modalVisibleLearned, setModalVisibleLearned] = useState(false);
  const [modalVisibleStars, setModalVisibleStars] = useState(false);

  // Funciones para manejar los modales
  const handlePressLearned = () => {
    setModalVisibleLearned(true);
  };

  const handleCloseModalLearned = () => {
    setModalVisibleLearned(false);
  };

  const handlePressStars = () => {
    setModalVisibleStars(true);
  };

  const handleCloseModalStars = () => {
    setModalVisibleStars(false);
  };

  return (
    <View style={styles.header}>
      {/* Icono de elementos aprendidos */}
      <Pressable style={styles.leftHeader} onPress={handlePressLearned}>
        <Fontisto name="laboratory" size={35} color="#486B90" />
        <View style={styles.containerLeft}>
          <Text>{learnedItems}</Text>
        </View>
      </Pressable>

      {/* UserName */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Hola {userName}!</Text>
      </View>
      
      {/* Icono de estrellas */}
      <Pressable style={styles.rightHeader} onPress={handlePressStars}>
        <AntDesign name="star" size={35} color="#9747FF" />
        <View style={styles.containerLeft}>
          <Text style={styles.count}>{stars}</Text>
        </View>
      </Pressable>

      {/* Modal de elementos aprendidos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleLearned}
        onRequestClose={handleCloseModalLearned}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Felicidades, usted ha aprendido {learnedItems} elementos de un total de 118!</Text>
            
            {/* Botón personalizado para cerrar */}
            <Pressable style={styles.button} onPress={handleCloseModalLearned}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal de estrellas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleStars}
        onRequestClose={handleCloseModalStars}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Gana más monedas jugando y completando los elementos!</Text>
            
            {/* Botón personalizado para cerrar */}
            <Pressable style={styles.button} onPress={handleCloseModalStars}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleContainer:{
    width:'50%',
    alignItems: 'center',
  },
  title:{
    fontSize:25,
    color: ColorsPalet.primary,
    fontWeight:'bold',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLeft: {
    backgroundColor: ColorsPalet.background,
    borderBlockColor: ColorsPalet.primary,
    borderWidth: 1,
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: ColorsPalet.primary, // Usa tu color preferido
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
