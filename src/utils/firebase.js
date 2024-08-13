
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6jBiP2un2pwj68HLnJ9ziVq_6zsG3EjE",
    authDomain: "tenedores-24966.firebaseapp.com",
    projectId: "tenedores-24966",
    storageBucket: "tenedores-24966.appspot.com",
    messagingSenderId: "31628227386",
    appId: "1:31628227386:web:33bfc1a5397a06a4c25603"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);