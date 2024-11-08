// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmOTZOpUp0QguLD1jdduS883t90vfeqRQ",
  authDomain: "abcauthentication.firebaseapp.com",
  projectId: "abcauthentication",
  storageBucket: "abcauthentication.appspot.com",
  messagingSenderId: "81247564237",
  appId: "1:81247564237:web:48ab8cbaa6dbc428d11484",
  measurementId: "G-DPHJG0RPQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName
    };
    showMessage('Account Created Successfully', 'signUpMessage');
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);

    await sendEmailVerification(auth.currentUser);
    alert("Email verification link sent!");
    window.location.href = '/DIS1/Home/Home.html';
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') {
      showMessage('Email Address Already Exists !!!', 'signUpMessage');
    } else {
      showMessage('Unable to create User', 'signUpMessage');
    }
  }
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = '/DIS1/Home/Home.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not Exist', 'signInMessage');
      }
    });
});
