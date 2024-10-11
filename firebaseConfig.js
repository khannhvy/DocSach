import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCyKgaOqbZIMeBTvwJ4H-7Z4MQFrbJ6NSs",
    authDomain: "docsach-44e90.firebaseapp.com",
    projectId: "docsach-44e90",
    storageBucket: "docsach-44e90.appspot.com",
    messagingSenderId: "397647768476",
    appId: "1:397647768476:web:703e84770548f8920e7659",
    measurementId: "G-B13EJ90CSH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sử dụng AsyncStorage để lưu trạng thái đăng nhập
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
