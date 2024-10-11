import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { auth } from '../../config/FireBaseConfig';

export default function Profile() {
  const user = auth.currentUser; // No se deben usar paréntesis aquí

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.username}>{user.email || 'Nombre de usuario no disponible'}</Text>
      ) : (
        <Text style={styles.errorText}>No estás autenticado. Por favor, inicia sesión.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
