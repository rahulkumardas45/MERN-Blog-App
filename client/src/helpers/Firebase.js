import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "yt-mern-blog-8cd12.firebaseapp.com",
  projectId: "yt-mern-blog-8cd12",
  storageBucket: "yt-mern-blog-8cd12.firebasestorage.app",
  messagingSenderId: "887435697015",
  appId: "1:887435697015:web:503b00ad1a0b9f3422df72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}