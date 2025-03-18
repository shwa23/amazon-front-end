import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// configuration for the Firebase project
const firebaseConfig = {
    apiKey: "AIzaSyD6rq9YUjEcjeW5MRLHVAGfx798U4_8NCE",
    authDomain: "fir-8be4d.firebaseapp.com",
    projectId: "fir-8be4d",
    storageBucket: "fir-8be4d.firebasestorage.app",
    messagingSenderId: "818215471593",
    appId: "1:818215471593:web:0bf8194fd05f05e8892378"
  };

// Initialize the Firebase app with the configuration
const app = firebase.initializeApp(firebaseConfig);

// Get the auth instance which is used for authentication
export const auth = getAuth(app);

// Get the Firestore database instance
export const db = app.firestore();