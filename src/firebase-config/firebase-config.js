import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIDYbCgvMw4vnSQxoAvz9ga0ckOurWUa0",
  authDomain: "personal-post-6cec4.firebaseapp.com",
  projectId: "personal-post-6cec4",
  storageBucket: "personal-post-6cec4.appspot.com",
  messagingSenderId: "696004016562",
  appId: "1:696004016562:web:15a5450b9e726eb4f14cab",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
