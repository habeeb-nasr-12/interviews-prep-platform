import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  "AIzaSyDeA9k48GhuM9F4lT8gBb-mCAFmhDA_qmA",
  authDomain: "prephabeeb.firebaseapp.com",
  projectId: "prephabeeb",
  storageBucket: "prephabeeb.firebasestorage.app",
  messagingSenderId: "820379227789",
  appId: "1:820379227789:web:5d302f17babf55f9a834c4",
  measurementId: "G-HFMPWXPRML"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
// Initialize Firebase Analytics when not in production mode
// const analytics = getAnalytics(app);