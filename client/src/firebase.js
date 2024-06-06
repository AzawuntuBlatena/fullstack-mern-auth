// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-6c63c.firebaseapp.com",
  projectId: "mern-auth-6c63c",
  storageBucket: "mern-auth-6c63c.appspot.com",
  messagingSenderId: "568214384054",
  appId: "1:568214384054:web:e440cf72bd6e70cc75a517"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);