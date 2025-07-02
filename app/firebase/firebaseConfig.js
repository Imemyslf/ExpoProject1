import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyW0X3CsGImnL0UrBqoqpdhc6VheYjymY",
  authDomain: "forage-a35a4.firebaseapp.com",
  projectId: "forage-a35a4",
  storageBucket: "forage-a35a4.firebasestorage.app",
  messagingSenderId: "91055519553",
  appId: "1:91055519553:web:a402314ae47c158e40d3c0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);