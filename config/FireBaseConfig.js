// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importa AsyncStorage para React Native

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kichuwa-kimiku.firebaseapp.com",
  projectId: "kichuwa-kimiku",
  storageBucket: "kichuwa-kimiku.appspot.com",
  messagingSenderId: "1053010385886",
  appId: "1:1053010385886:web:e15bdb1f030a2b13b7db4f",
  measurementId: "G-6DBFEWTZT9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
//const analytics = getAnalytics(app);