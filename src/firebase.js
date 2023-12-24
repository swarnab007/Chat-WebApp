// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE9LsVzcDtOEbtR0j40Kmx-ieUFmKUh94",
  authDomain: "chat-c9545.firebaseapp.com",
  projectId: "chat-c9545",
  storageBucket: "chat-c9545.appspot.com",
  messagingSenderId: "1052327401377",
  appId: "1:1052327401377:web:58d0da581c762789e31de0",
  measurementId: "G-T6S49BF0HS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// function for authentication
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()