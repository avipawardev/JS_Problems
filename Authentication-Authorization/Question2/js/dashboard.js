import { auth,db } from "../firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

import {
  doc,
  getDoc, 
  setDoc,
  collection,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded" , async()=>{
    const notestList = document.getElementById("notes-list");
    const noteInput = document.getElementById("note-input");
    const addNoteBtn = document.getElementById("add-note-btn");

    let currentUser = null;
   //Check Auth state
   onAuthStateChanged(auth,async(user)=>{
    if(user){
        currentUser = user
        document.getElementById("user-email").innerText = currentUser.email
    }
   })

})





