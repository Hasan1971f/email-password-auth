// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Don not share config in public
const firebaseConfig = {
  apiKey: "AIzaSyCUngIg-NpR8yMC_t4BoGGw5n6PSxJS_Tc",
  authDomain: "email-password-auth-56d85.firebaseapp.com",
  projectId: "email-password-auth-56d85",
  storageBucket: "email-password-auth-56d85.firebasestorage.app",
  messagingSenderId: "274270051559",
  appId: "1:274270051559:web:e661852473d76d8f055642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);