// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import './firebase-init';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcel-8yGNbQi1f4mc04b-9AEbqioQea04",
  authDomain: "sokoni-44ef1.firebaseapp.com",
  databaseURL: "https://sokoni-44ef1-default-rtdb.firebaseio.com",
  projectId: "sokoni-44ef1",
  storageBucket: "sokoni-44ef1.appspot.com",
  messagingSenderId: "353018968368",
  appId: "1:353018968368:web:9fb415dc18ac5c8556f0f5",
  measurementId: "G-X0EDZV6QXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
