
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbB8VsvjAwc4WmzSWMiOeWIDwFXidyBOE",
  authDomain: "studio-4867778897-6b167.firebaseapp.com",
  projectId: "studio-4867778897-6b167",
  storageBucket: "studio-4867778897-6b167.firebasestorage.app",
  messagingSenderId: "740922370344",
  appId: "1:740922370344:web:7f3722f6d8eb2f850ec81d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
