import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBIvTCZ_N0JZtj-nFXppdBA1DZMwsG9T5g",
    authDomain: "samsung-clone-website.firebaseapp.com",
    projectId: "samsung-clone-website",
    storageBucket: "samsung-clone-website.appspot.com",
    messagingSenderId: "82148789355",
    appId: "1:82148789355:web:46bbcbd26798f1bf53752e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }