/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
/* Custom Colors */

export const ColorsPalet = {
  primary: '#2A4D69',    // Un azul más profundo y elegante para mejorar el contraste
  secondary: '#4B86B4',  // Un tono más vibrante para acciones secundarias
  backgroundLight: '#E5F3FF',  // Un fondo más claro y suave
  background: '#F0F8FF', // Ligero tono azul para una apariencia más clara y aireada
  accent: '#FFBA49',     // Un color de acento para llamar la atención (botones destacados)
  gray: '#D9D9D9',       // Conserva el gris suave para elementos secundarios o inactivos
  white: '#FFFFFF',      // Mantén el blanco puro para el texto o fondos de contraste
  success: '#3CAEA3',    // Color para mensajes de éxito
  error: '#FF6B6B',      // Color para mensajes de error
};
