import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { setDoc, doc, getDoc, getDocs, getFirestore, collection, deleteDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO6NyEcUHrSEkLhoQJKyUe92XCXrPxUmg",
  authDomain: "jeremiah-dean-sandbox.firebaseapp.com",
  projectId: "jeremiah-dean-sandbox",
  storageBucket: "jeremiah-dean-sandbox.firebasestorage.app",
  messagingSenderId: "529078385812",
  appId: "1:529078385812:web:f61fc93e0f4b8760e20881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;