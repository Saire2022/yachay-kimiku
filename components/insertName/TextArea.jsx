import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ColorsPalet } from '../../constants/Colors';
import { playAudio } from '../../scripts/playAudio';
import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from './../../config/FireBaseConfig';
import { useRouter } from 'expo-router';
import getLearnedElements from '../../scripts/getLearnedElements';
import CompletionScreen from '../CompletionScreen';
import CompletionGroupScreen from '../CompletionGroupScreen';

export default function TextArea({ element, category, groupID, gameOption, grupoKichwa }) {
    const [answer, setAnswer] = useState("");
    const [respuesta_correcta, setRespuestaCorrecta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [filteredElements, setFilteredElements] = useState([]);
    const [userData, setUserData] = useState(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [completedGameCategory, setCompletedGameCategory] = useState(false)
    const [completedGameOption, setCompletedGameOption] = useState(false)

    const router = useRouter();

    const option = gameOption === 'Insertar nombre' ? 'insertName' : '';

    useEffect(() => {
        const fetchUser = async () => {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            const userSnapshot = await getDoc(userRef);
            setUser(userSnapshot.data());
        };

        fetchUser();
        getLearnedElements(db, auth, setFilteredElements, setUserData, groupID)

    }, []);

    const handleAnswer = async (insertedName) => {
        if (insertedName.toLowerCase() === element.kichwa.toLowerCase() || insertedName.toLowerCase() === element.symbol.toLowerCase()) {
            playAudio(require('./../../assets/audios/correct.mp3'));
            setRespuestaCorrecta(true);
            setShowModal(true);

            const userRef = doc(db, 'users', auth.currentUser.uid);
            const userSnapshot = await getDoc(userRef);

            // Verificar si el elemento ya está en learnedElements
            let learnedElements = [];
            if (category === 'Nombre - Símbolo') {
                learnedElements = userSnapshot.data()?.gameStats?.groupID?.gameOption?.nameSymbol?.learnedElements || [];
            } else {
                learnedElements = userSnapshot.data()?.gameStats?.groupID?.gameOption?.symbolName?.learnedElements || [];
            }

            if (!learnedElements.includes(element.id)) {
                // Solo agregar el ID si no está en learnedElements
                if (category === 'Nombre - Símbolo') {
                    await updateDoc(userRef, {
                        [`gameStats.${groupID}.insertName.nameSymbol.learnedElements`]: arrayUnion(element.id),
                        [`gameStats.${groupID}.insertName.nameSymbol.completedCategory`]: true,
                    });
                } else {
                    await updateDoc(userRef, {
                        [`gameStats.${groupID}.insertName.symbolName.learnedElements`]: arrayUnion(element.id),
                        [`gameStats.${groupID}.insertName.symbolName.completedCategory`]: true,
                    });
                }
            }

            console.log('Respuesta correcta');
        } else {
            console.log('Respuesta incorrecta:', answer);
            setRespuestaCorrecta(false)
            playAudio(require('./../../assets/audios/incorrect.mp3'));
            setShowModal(true);
        }
    };

    const handleContinue = () => {
        setShowModal(false);
    };

    const handleSiguiente = async () => {
        setShowModal(false);

        const nameSymbolLearnedElements = user?.gameStats?.[groupID]?.insertName?.nameSymbol?.learnedElements || [];
        const symbolNameLearnedElements = user?.gameStats?.[groupID]?.insertName?.symbolName?.learnedElements || [];

        console.log('filteredElements:', filteredElements);
        const currentIndex = filteredElements.findIndex(el => el.id === element.id);
        console.log('currentIndex:', currentIndex);

        if (currentIndex === -1) {
            console.error("Current element not found in filteredElements");
            return;
        }

        // Attempt to find nextElement based on learned elements
        let nextElement = filteredElements.slice(currentIndex + 1).find(el => {
            if (category === 'Nombre - Símbolo') {
                return !nameSymbolLearnedElements.includes(el.id);
            } else if (category === 'Símbolo - Nombre') {
                return !symbolNameLearnedElements.includes(el.id);
            }
            return false;
        });

        // Fallback to the next element in the list if no unlearned element is found
        if (!nextElement && currentIndex + 1 < filteredElements.length) {
            nextElement = filteredElements[currentIndex + 1];
        }

        console.log('nextElement:', nextElement);
        if (nextElement) {
            router.replace({
                pathname: '/insertName',
                params: {
                    ...nextElement,
                    gameCategory: category,
                    groupID: groupID,
                    option: gameOption,
                    grupoKichwa: grupoKichwa
                },
            });
        } else {
            console.log('¡Felicidades! Has completado todos los elementos.');

            const userRef = doc(db, 'users', auth.currentUser.uid);
            const userSnapshot = await getDoc(userRef);
            const user = userSnapshot.data();
            const completedNameSymbol = user?.gameStats?.[groupID]?.[option]?.nameSymbol?.completedCategory;
            const completedSymbolName = user?.gameStats?.[groupID]?.[option]?.symbolName?.completedCategory;
            if (completedNameSymbol || completedSymbolName) {
                // Show the completion modal
                setShowCompletion(true);
            }
            if (completedNameSymbol && completedSymbolName) {
                setCompletedGameCategory(true)
                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    [`gameStats.${groupID}.insertName.completedGameOption`]: true,
                });
            }

            const completedInsertName = user?.gameStats?.[groupID]?.[option]?.completedGameOption;
            const completedMultipleChoice = user?.gameStats?.[groupID]?.[option]?.completedGameOption;
            if (completedInsertName && completedMultipleChoice) {
                setCompletedGameOption(true)
                setShowCompletion(false)
                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    [`gameStats.${groupID}.completedElementCategory`]: true,
                    [`unlockedGroups`]: arrayUnion(''),
                });
            }
            setShowModal(true);
        }
    };

    if (showCompletion) {
        return (
            <View style={styles.completionContainer}>
                {/* Completion Screen */}
                {showCompletion &&
                    <CompletionScreen category={category} groupID={groupID}
                        gameOption={gameOption} grupoKichwa={grupoKichwa}
                        completedGameCategory={completedGameCategory} />}
            </View>
        );
    }

    if (completedGameOption) {
        return (
            <View style={styles.completionContainer}>
                <CompletionGroupScreen grupoKichwa={grupoKichwa} />
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <TextInput
                style={styles.inputText}
                placeholder='Ingresar nombre'
                value={answer}
                onChangeText={(text) => setAnswer(text)}
            />
            {category === 'Nombre - Símbolo' ? (
                <TouchableOpacity style={styles.sendButton} onPress={() => handleAnswer(answer)}>
                    <Text style={styles.sendText}>Comprobar</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.sendButton} onPress={() => handleAnswer(answer)}>
                    <Text style={styles.sendText}>Comprobar</Text>
                </TouchableOpacity>
            )}

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
                        <TouchableOpacity onPress={handleSiguiente} style={styles.continueButton_Correct}>
                            <Text style={styles.continueText}>Siguiente</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleContinue} style={styles.continueButton_Incorrect}>
                            <Text style={styles.continueText}>Continuar</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        gap: 30
    },
    inputText: {
        width: '80%',
        height: 60,
        backgroundColor: ColorsPalet.backgroundLight,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    sendButton: {
        width: '60%',
        height: 50,
        backgroundColor: ColorsPalet.primary,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    modalContainer: {
        position: 'absolute',
        width: "100%",
        bottom: 0,
        backgroundColor: '#383A45',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
