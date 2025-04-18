// src/firebase.js

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkc4S8nJ0AaGL0jhhf4wImevzeU0IGYwc",
  authDomain: "stanimajstor-4c444.firebaseapp.com",
  projectId: "stanimajstor-4c444",
  storageBucket: "stanimajstor-4c444.firebasestorage.app",
  messagingSenderId: "275539088354",
  appId: "1:275539088354:web:920a5dae6bb71538221fbb",
  measurementId: "G-TMJ17CBH93"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app); 

export { app, analytics, auth, db, storage }
