import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6d2rzFtMpx6Y3k-usaOOK2onpxyN1mmU",
  authDomain: "ntwitter-8313d.firebaseapp.com",
  projectId: "ntwitter-8313d",
  storageBucket: "ntwitter-8313d.appspot.com",
  messagingSenderId: "135453840930",
  appId: "1:135453840930:web:735c0d5f669e53cd9a5c7b",
};
export const firebaseApp = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage(firebaseApp);
