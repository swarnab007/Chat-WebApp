// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVDtbSpsF5SF385hEn2B5nyCQ1p10HQIE",
  authDomain: "chat-webapp-50720.firebaseapp.com",
  projectId: "chat-webapp-50720",
  storageBucket: "chat-webapp-50720.appspot.com",
  messagingSenderId: "1096555086038",
  appId: "1:1096555086038:web:fdee0af39e1985eacd4977",
  measurementId: "G-MHDMQX4FGM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// function for authentication
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();