// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfCUssxsKh5JdK8k17TFarBR-cK863lfk",
    authDomain: "studyhub-ktu.firebaseapp.com",
    projectId: "studyhub-ktu",
    storageBucket: "studyhub-ktu.firebasestorage.app",
    messagingSenderId: "573711017148",
    appId: "1:573711017148:web:7e66d50e6a391fb7219cb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//submit

const login = document.getElementById('login');
login.addEventListener("click", function (event) {

    event.preventDefault()
    // inputs

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

     createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("creating user...")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
        
})  