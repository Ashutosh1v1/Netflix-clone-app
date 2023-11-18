
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCAMxabtOp0Yoz0vg-mfUtTzkwwVkBT4pU",
  authDomain: "netflix-clone-65cae.firebaseapp.com",
  projectId: "netflix-clone-65cae",
  storageBucket: "netflix-clone-65cae.appspot.com",
  messagingSenderId: "848143053839",
  appId: "1:848143053839:web:48863462a66cf95f67df7a",
  measurementId: "G-46V718Q6S5"
};


const app = initializeApp(firebaseConfig);


export const firebaseauth = getAuth(app)
