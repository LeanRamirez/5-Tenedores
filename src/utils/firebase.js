
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAU4rxqpXrMPu2FPvEu-6dohvOAThz5Xj4",
    authDomain: "tenedores-v3-1ffd4.firebaseapp.com",
    projectId: "tenedores-v3-1ffd4",
    storageBucket: "tenedores-v3-1ffd4.appspot.com",
    messagingSenderId: "1010632159186",
    appId: "1:1010632159186:web:599afd96817b088090a20b"
};


export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);