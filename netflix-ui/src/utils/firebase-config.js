
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIRE_API,
  authDomain: "react-netflix-clone-d34d0.firebaseapp.com",
  projectId: "react-netflix-clone-d34d0",
  storageBucket: "react-netflix-clone-d34d0.appspot.com",
  messagingSenderId: "469144006427",
  appId: "1:469144006427:web:471e77fbb1d1e2bf30adbe",
  measurementId: "G-7ST3J0R53B"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);