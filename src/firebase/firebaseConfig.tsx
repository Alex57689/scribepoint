import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase confirm

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APP_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID,
};

/*
const firebaseConfig = {
  apiKey: "AIzaSyD6J9HNVleqw-qf_NPe3ZAX6EavcE8iJAc",
  authDomain: "scribepoint-e575f.firebaseapp.com",
  projectId: "scribepoint-e575f",
  storageBucket: "scribepoint-e575f.firebasestorage.app",
  messagingSenderId: "66443196930",
  appId: "1:66443196930:web:9d57454e8b03c8fb6c451b",
  measurementId: "G-0W4SBPQR50",
};
*/
// initalise firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export default firebaseConfig;
