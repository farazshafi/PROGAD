import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPPkT86i3dcRFbkV6evUPcOpRB0vBEiMU",
  authDomain: "earnest-mark-409910.firebaseapp.com",
  projectId: "earnest-mark-409910",
  storageBucket: "earnest-mark-409910.appspot.com",
  messagingSenderId: "180259714983",
  appId: "1:180259714983:web:2f5a74b5233819d2bf6882",
  measurementId: "G-0X49TV2SV9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);
