import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2JK-Z02muxJf4Gg2D09K5h1cgH1_YlWY",
  authDomain: "online-wordle-8c404.firebaseapp.com",
  projectId: "online-wordle-8c404",
  storageBucket: "online-wordle-8c404.appspot.com",
  messagingSenderId: "257440840716",
  appId: "1:257440840716:web:b7b89eb5d388d90e754229",
  databaseURL:
    "https://online-wordle-8c404-default-rtdb.europe-west1.firebasedatabase.app/",
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
export const GET_DB_REF = (path) => ref(FIREBASE_DATABASE, path);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
