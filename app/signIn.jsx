import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ToastAndroid, StyleSheet, ActivityIndicator } from 'react-native';
import { router, useNavigation, useRouter } from 'expo-router';
import { ColorsPalet } from '../constants/Colors';
import { db, app, auth } from './../config/FireBaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Iniciar sesión',
    });
  }, [navigation]);

  // Función para iniciar sesión del usuario
  const handleSignIn = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.push({
          pathname: './(tabs)',
          params: user
        })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-credential') {
          setError('Por favor, verifica tus credenciales y vuelve a intentarlo.');
        };
        if (error.code === 'auth/network-request-failed') {
          setError('Error de red. Verifique su conexión e inténtelo de nuevo.');
        }
        console.log(errorCode)
      }).finally(() => {
        setLoading(false);
      })
  };

  // Función para mostrar/ocultar el modal de registro
  const handleSingUp = () => {
    router.push('singUp')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        {loading ? (
          <ActivityIndicator size="large" color={ColorsPalet.success} />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={handleSingUp}>
          <Text style={styles.footerLink}>Regístrate aquí</Text>
        </TouchableOpacity> 
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: ColorsPalet.backgroundLight, // Color de fondo suave
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
    //color: '#333',
    borderColor: ColorsPalet.secondary,
    borderWidth: 1
  },
  button: {
    backgroundColor: ColorsPalet.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  footerLink: {
    fontSize: 16,
    color: ColorsPalet.accent,
    marginLeft: 5,
    textDecorationLine: 'underline',
  },

});
