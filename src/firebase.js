import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBOFZFaIaJSZumKEeTgWZkfmiYvJj4b_38",
  authDomain: "phone-login-8aac9.firebaseapp.com",
  projectId: "phone-login-8aac9",
  storageBucket: "phone-login-8aac9.appspot.com",
  messagingSenderId: "716649546671",
  appId: "1:716649546671:web:1d382cfd7779e88381a55a"
};


export const app = initializeApp(firebaseConfig);
