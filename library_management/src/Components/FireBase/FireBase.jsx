// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCJ9bf8kNWgzGIU0KA-V662nx3l-YS6I0",
  authDomain: "library-mangement-system-aba83.firebaseapp.com",
  projectId: "library-mangement-system-aba83",
  storageBucket: "library-mangement-system-aba83.firebasestorage.app",
  messagingSenderId: "237301887326",
  appId: "1:237301887326:web:4d21811f9f8a4527549fcf",
  measurementId: "G-RZGRQTKGV5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);