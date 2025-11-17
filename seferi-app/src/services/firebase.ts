// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANAH91waUETdC1mLDc0CnXQ1vfdBC2bGU",
  authDomain: "seferi-b0d22.firebaseapp.com",
  projectId: "seferi-b0d22",
  storageBucket: "seferi-b0d22.firebasestorage.app",
  messagingSenderId: "947665600370",
  appId: "1:947665600370:web:77959cff507066e81327eb",
  measurementId: "G-4GL84LHVFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
