// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6Fw3SNfe18i6umhyiW9JQqP6wOUiix0",
  authDomain: "bookmykonkan-a9c6e.firebaseapp.com",
  projectId: "bookmykonkan-a9c6e",
  storageBucket: "bookmykonkan-a9c6e.firebasestorage.app",
  messagingSenderId: "667099998973",
  appId: "1:66709999873:web:35371f96d42fb29f700b0",
  measurementId: "G-9XLYFDW4EV" 
};

const app = initializeApp(firebaseConfig);

export {
  app,
  getAuth,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
};
