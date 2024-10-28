import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { ColorsPalet } from '../../constants/Colors';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from './../../config/FireBaseConfig';
import { playAudio } from '../../scripts/playAudio';
import { router } from 'expo-router';
import getLearnedElements from '../../scripts/getLearnedElements';
import CompletionScreen from '../CompletionScreen';

export default function OptionsCards({ element, category, option, groupID, grupoKichwa }) {
  const [optionsList, setOptionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('')
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de feedback
  const [respuesta_correcta, setRespuestaCorrecta] = useState(false)
  const [filteredElements, setFilteredElements] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    loadOptions();
    getLearnedElements(db, auth, setFilteredElements, setUserData, groupID)
  }, []);

  const gameOption = option === 'Selección múltiple' ? 'multipleChoice' : '';

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Función para cargar elementos aleatorios de la base de datos
  const loadOptions = async () => {
    try {
      const q = query(
        collection(db, 'elements'),
        where('atomicNumber', '!=', element.atomicNumber) // Excluir el elemento actual
      );
      const querySnapshot = await getDocs(q);

      const elementsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Barajar los elementos y seleccionar 3
      const shuffledElements = shuffleArray(elementsArray).slice(0, 3);

      // Añadir el elemento actual a las opciones
      shuffledElements.push(element);

      // Barajar nuevamente para que el elemento actual no siempre aparezca en la última posición
      const finalOptions = shuffleArray(shuffledElements);

      setOptionsList(finalOptions);
    } catch (error) {
      console.error('Error al obtener los elementos:', error);
    } finally {
      setLoading(false); // Desactivar el indicador de carga
    }
  };

  const handreAnswer = async (selectedButton) => {
    if (selectedButton === element.symbol) {
      // Respuesta correcta
      setFeedback(true);
      setShowModal(true);
      setRespuestaCorrecta(true);
      playAudio(require('./../../assets/audios/correct.mp3'));

      // Referencia al documento del usuario
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);

      // Verificar si el elemento ya está en learnedElements
      let learnedElements = [];
      if (category === 'Nombre - Símbolo') {
        learnedElements = userSnapshot.data()?.gameStats?.groupID?.option?.nameSymbol?.learnedElements || [];
      } else {
        learnedElements = userSnapshot.data()?.gameStats?.groupID?.option?.symbolName?.learnedElements || [];
      }

      if (!learnedElements.includes(element.id)) {
        // Solo agregar el ID si no está en learnedElements
        if (category === 'Nombre - Símbolo') {
          await updateDoc(userRef, {
            [`gameStats.${groupID}.multipleChoice.nameSymbol.learnedElements`]: arrayUnion(element.id),
            [`gameStats.${groupID}.multipleChoice.nameSymbol.completedCategory`]: true,
          });
        } else {
          await updateDoc(userRef, {
            [`gameStats.${groupID}.multipleChoice.symbolName.learnedElements`]: arrayUnion(element.id),
            [`gameStats.${groupID}.multipleChoice.symbolName.completedCategory`]: true,
          });
        }
      }

    } else {
      // Respuesta incorrecta
      setFeedback(false);
      setShowModal(true);
      setRespuestaCorrecta(false);
      playAudio(require('./../../assets/audios/incorrect.mp3'));
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    console.log('Continuar')
  }

  const handleSiguiente = async () => {
    setShowModal(false);


    // Retrieve learned elements for both categories
    const nameSymbolLearnedElements = [userData?.gameStats?.[groupID]?.[gameOption]?.nameSymbol?.learnedElements] || [];
    const symbolNameLearnedElements = userData?.gameStats?.[groupID]?.[gameOption]?.symbolName?.learnedElements || [];

    //console.log('Hooo',gameOption, symbolNameLearnedElements);

    // Find the current index of the element
    const currentIndex = filteredElements.findIndex(el => el.id === element.id);

    // Find the next unlearned element based on category
    const nextElement = filteredElements.slice(currentIndex + 1).find(el => {
      if (category === 'Nombre - Símbolo') {
        return !nameSymbolLearnedElements.includes(el.id);
      } else if (category === 'Símbolo - Nombre') {
        return !symbolNameLearnedElements.includes(el.id);
      }
      return false;
    });

    // Navigate to the next element or handle completion if all elements are learned
    if (nextElement) {
      const path = option === 'Insertar nombre' ? '/insertName' : '/multipleChoice';
      router.replace({
        pathname: path,
        params: {
          ...nextElement,
          gameCategory: category,
          groupID: groupID,
          option: option,
          grupoKichwa: grupoKichwa
        },
      });
    } else {
      // No more elements to learn
      console.log('¡Felicidades! Has completado todos los elementos.');

      // Reference to the user's document
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      // Check completion status for both categories
      const completedNameSymbol = user?.gameStats?.[groupID]?.[gameOption]?.nameSymbol?.completedCategory;
      const completedSymbolName = user?.gameStats?.[groupID]?.[gameOption]?.symbolName?.completedCategory;

      if (completedNameSymbol && completedSymbolName) {
        // Update game state in the database
        await updateDoc(userRef, {
          [`gameStats.${groupID}.multipleChoice.completedGameOption`]: true,
        });
      }

      // Show the completion modal
      setShowCompletion(true);
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ColorsPalet.primary} />
      </View>
    );
  }

  if (showCompletion) {
    return (
      <View style={styles.completionContainer}>
        {/* Completion Screen */}
        {showCompletion &&
          <CompletionScreen category={category} groupID={groupID}
            gameOption={option} grupoKichwa={grupoKichwa}
            completedElementCategory={true} />}
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={optionsList} // Mostrar los 4 elementos (3 aleatorios + 1 elemento actual)
        style={{ marginTop: 40 }}
        numColumns={(category === 'Nombre - Símbolo') ? 2 : 1}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center' }}>
            {category === 'Nombre - Símbolo' ? (
              <TouchableOpacity
                style={styles.container}
                onPress={() => handreAnswer(item.symbol)}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.containerPlane}
                onPress={() => handreAnswer(item.symbol)}>
                <Text style={styles.nameText}>{item.kichwa}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Modal para mostrar el mensaje de retroalimentación */}
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>

          <Text style={respuesta_correcta ? styles.modalTextCorrecto : styles.modalTextIncorrecto}>
            {respuesta_correcta ? "¡Excelente!" : "Incorrecto"}
          </Text>

          <Text style={{ color: 'white', paddingVertical: 10, fontSize: 17, opacity: respuesta_correcta ? 0 : 1 }}>
            <Text style={{ color: '#86D332' }}>Sigue intentando!</Text>
          </Text>

          {respuesta_correcta ? (
            <TouchableOpacity onPress={handleSiguiente} style={respuesta_correcta ? styles.continueButton_Correct : styles.continueButton_Incorrect}>
              <Text style={styles.continueText}>Siguiente</Text>
            </TouchableOpacity>)
            :
            (
              <TouchableOpacity onPress={handleContinue} style={respuesta_correcta ? styles.continueButton_Correct : styles.continueButton_Incorrect}>
                <Text style={styles.continueText}>Continuar</Text>
              </TouchableOpacity>
            )
          }

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 120,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalet.background,
    borderRadius: 20,
    marginHorizontal: 25,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: ColorsPalet.secondary,
  },
  containerPlane: {
    width: '70%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalet.background,
    borderRadius: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: ColorsPalet.secondary,
    padding: 5,
  },
  symbolText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    width: "100%",
    bottom: 0,
    backgroundColor: '#383A45',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTextCorrecto: {
    color: '#86D332',
    fontWeight: 'bold',
    fontSize: 20
  },
  modalTextIncorrecto: {
    color: '#EE5655',
    fontWeight: 'bold',
    fontSize: 20,
  },
  continueButton_Correct: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#86D332",
    borderRadius: 20
  },
  continueButton_Incorrect: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#EE5655",
    borderRadius: 20
  },
  continueText: {
    color: '#fff',
    fontSize: 20
  },
  completionContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: -210
  }
});
