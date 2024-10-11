import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import SplashScreenView from './../components/SplashScreenView'; 
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setIsReady(true); // Show the main content after splash screen
      }, 2000); // Splash screen duration
    }
  }, [loaded]);

  // Show splash screen if fonts aren't loaded or app isn't ready
  if (!loaded || !isReady) {
    return <SplashScreenView />;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
