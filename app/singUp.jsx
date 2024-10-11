import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ColorsPalet } from '../constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { db, app, auth } from './../config/FireBaseConfig';
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Asegúrate de importar esto

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Crear cuenta',
    });
  }, [navigation]);

  // Función para registrar al usuario y guardarlo en Firestore
  const handleSignUp = async () => {
    setLoading(true);  // Inicia la carga
    setError('');      // Limpia cualquier error previo
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);

      // Guardar en la colección 'users' en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        userName: username,
        gameStats: {
          G1: {
            nameSymbol: {
              learnedElements:[]
            },
            symbolName: {
              learnedElements:[]
            }
          }
        },
        learnedElements: [],
        totalStars: 0,
        unlockedGroups: ['G1']
      });

      router.replace('signIn');
      console.log('Usuario registrado y guardado en Firestore');
    } catch (error) {
      setError(error.message); // Muestra el mensaje de error
    } finally {
      setLoading(false);  // Detiene la carga
    }
  };

  const handleSignIn = () => {
    router.push('singIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear una cuenta</Text>

      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Mostrar ActivityIndicator mientras se está cargando */}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        {loading ? (
          <ActivityIndicator size="large" color={ColorsPalet.success} />
        ) : (<Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        ¿Ya tienes una cuenta?{' '}
        <Text style={styles.link} onPress={handleSignIn}>
          Inicia sesión
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: ColorsPalet.backgroundLight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ColorsPalet.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderColor: ColorsPalet.secondary,
    borderWidth: 1,
  },
  button: {
    backgroundColor: ColorsPalet.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: ColorsPalet.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: ColorsPalet.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    color: ColorsPalet.primary,
  },
  link: {
    color: ColorsPalet.accent,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
