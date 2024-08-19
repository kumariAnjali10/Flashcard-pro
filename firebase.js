// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSoUMfhI9RrtucvaZSFeQ2FB4Ng0Wb_aY",
  authDomain: "flashcard-saas-c2bb5.firebaseapp.com",
  projectId: "flashcard-saas-c2bb5",
  storageBucket: "flashcard-saas-c2bb5.appspot.com",
  messagingSenderId: "258722220527",
  appId: "1:258722220527:web:b0404567b2572028808e1a",
  measurementId: "G-6M6MMT9P2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}
