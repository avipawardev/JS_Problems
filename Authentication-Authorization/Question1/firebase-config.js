  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCyn8UHmOn7KgzvYCL-v4rijOBghgycryI",
    authDomain: "login-logout-project-82f3b.firebaseapp.com",
    projectId: "login-logout-project-82f3b",
    storageBucket: "login-logout-project-82f3b.firebasestorage.app",
    messagingSenderId: "908080118715",
    appId: "1:908080118715:web:8f0a10ce75e8482cf6e29e",
    measurementId: "G-SHS4MEZZWV"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
