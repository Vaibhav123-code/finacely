// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore ,doc ,setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSvg_9HouAMaMxewWUKvLp-3NewLlvok",
  authDomain: "finance-tracker-ae126.firebaseapp.com",
  projectId: "finance-tracker-ae126",
  storageBucket: "finance-tracker-ae126.appspot.com",
  messagingSenderId: "912059594633",
  appId: "1:912059594633:web:8a6d49d0e5161c1987d358",
  measurementId: "G-NMJY4XNWD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };