// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDM8-OLsjxbg-C8Pk_LGgnx-jc_b3vmpis",
  authDomain: "auth-57b38.firebaseapp.com",
  projectId: "auth-57b38",
  storageBucket: "auth-57b38.firebasestorage.app",
  messagingSenderId: "723236601485",
  appId: "1:723236601485:web:8d78aff6e8cb8c32a76cc4",
  measurementId: "G-SLLCNX8DF2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
