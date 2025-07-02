import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjwsIlwT4YN4u6o50RYTTAM72u56tSB_w",
    authDomain: "walkfitness-test.firebaseapp.com",
    projectId: "walkfitness-test",
    storageBucket: "walkfitness-test.firebasestorage.app",
    messagingSenderId: "231587444296",
    appId: "1:231587444296:web:113a1f00053ab4c03b4a7d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
// Initialize Firebase Authentication and export it
export const auth =  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), // Set custom persistence
  });
export default app;
