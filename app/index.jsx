import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto'; // Asegúrate de tener esto instalado
import { ColorsPalet } from "../constants/Colors";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  // Función para abrir el enlace
  const handleLinkPress = () => {
    Linking.openURL('https://doi.org/10.1021/acs.jchemed.1c00383');
  };

  const handleButton=()=>{
    router.navigate(
      './signIn'
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Kimiku Yachay</Text>
      
      <View style={styles.logoContainer}>
        <Fontisto name="laboratory" size={150} color="#486B90" />
      </View>

      <Text style={styles.textContainer}>
      <Text style={styles.boldText}> Kimiku Yachay  </Text>es una App educativa tipo juego para el aprendizaje y difusión de la Tabla Periódica en el idioma Kichwa.
        Esta app fue inspirada en la investigación titulada
        <Text style={styles.boldText}> "Adaptation of the Periodic Table to Kichwa: An Ecuadorian Native Language"</Text>.
      </Text>

      {/* Texto interactivo */}
      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.linkText}>Leer más...</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
      onPress={handleButton}>
        <Text style={styles.textButton}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: ColorsPalet.backgroundLight, // Un fondo suave para resaltar el contenido
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: ColorsPalet.primary,
    textAlign: 'center', // Centramos el título
    marginBottom: 20, // Espacio adicional debajo del título
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Espacio entre el logo y el texto
  },
  textContainer: {
    fontSize: 16,
    color: '#333', // Un gris oscuro para el texto
    lineHeight: 24, // Mejoramos la legibilidad
    textAlign: 'center', // Centramos el texto
    marginBottom: 20, // Espacio entre el texto y el botón
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    color: ColorsPalet.primary, // Color diferente para el enlace
    textAlign: 'center',
    marginBottom: 40, // Espacio antes del botón
    textDecorationLine: 'underline', // Subrayado para indicar que es un enlace
  },
  button: {
    backgroundColor: ColorsPalet.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center', // Centramos el botón
    elevation: 5, // Sombra para darle un efecto de profundidad
  },
  textButton: {
    color: ColorsPalet.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
