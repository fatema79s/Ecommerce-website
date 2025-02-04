import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDDgBenyo8d1XfFzkQ-teWI6eep10NJWMo",
  authDomain: "commerce-website-9d929.firebaseapp.com",
  projectId: "commerce-website-9d929",
  storageBucket: "commerce-website-9d929.firebasestorage.app",
  messagingSenderId: "814083869817",
  appId: "1:814083869817:web:b91b321f18a0e6b31d98a8",
  measurementId: "G-PTYQ5LYYJY"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error.message);
  });



export { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, auth, db, googleProvider, signOut };