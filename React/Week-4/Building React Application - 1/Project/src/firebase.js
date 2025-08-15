// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9QbNKpyqWpwdMgLVQuTNhSsyq9teHsSw",
  authDomain: "trackerapp-d5f07.firebaseapp.com",
  projectId: "trackerapp-d5f07",
  storageBucket: "trackerapp-d5f07.firebasestorage.app",
  messagingSenderId: "873613623591",
  appId: "1:873613623591:web:516857bad2fee89e01e902",
  measurementId: "G-0VZXEQ6X1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);