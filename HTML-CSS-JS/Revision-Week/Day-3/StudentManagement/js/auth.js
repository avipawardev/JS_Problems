import {auth} from "../firebase_config.js"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
  } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded',()=>{
    let signUp = document.getElementById('signup-btn');
    let login = document.getElementById('login-btn');
    let logout = document.getElementById('logout-btn');

    if(signUp){
        signUp.addEventListener('click',()=>{
            let email = document.getElementById('signup-email').value;
            let password = document.getElementById('signup-password').value;

            createUserWithEmailAndPassword(auth,email,password)
            .then(()=>{
                window.location.href="dashboard.html"
                // window.location.href="login.html"
            }).catch((error)=>{
                document.getElementById('signup-msg').innerText = error.message;
            })
        })
    }
    if(login){
        login.addEventListener('click',()=>{
            let email = document.getElementById('login-email').value;
            let password = document.getElementById('login-password').value;

            signInWithEmailAndPassword(auth,email,password)
            .then(()=>{
                window.location.href="dashboard.html"
            }).catch((error)=>{
                document.getElementById('login-msg').innerText = error.message;
            })
        })
    }
    if(logout){
        logout.addEventListener('click',()=>{
            signOut(auth)
            .then(()=>{
                window.open("login.html")
            }).catch((error)=>{
                alert(error.message)
            })
        })
    }
})