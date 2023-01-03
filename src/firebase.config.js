import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAurHOq86kjezBV5wOwtDPN32tNjtp6tSU",
  authDomain: "multimart-b1d79.firebaseapp.com",
  projectId: "multimart-b1d79",
  storageBucket: "multimart-b1d79.appspot.com",
  messagingSenderId: "1033881271191",
  appId: "1:1033881271191:web:0573ec043766e2db2d22d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
