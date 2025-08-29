import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcb1e6j4tVUmR_PVlo7xTw4EDibTTGd2Q",
  authDomain: "library-09.firebaseapp.com",
  projectId: "library-09",
  storageBucket: "library-09.firebasestorage.app",
  messagingSenderId: "688733419064",
  appId: "1:688733419064:web:aff3906d37bb83bf12d8cd",
  measurementId: "G-VF5XW2SDKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export auth properly
export const auth = getAuth(app);
