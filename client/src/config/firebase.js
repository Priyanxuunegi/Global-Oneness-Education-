// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5y1F1kz4amnMkergFUZ6j7UgH8KM-Wso",
  authDomain: "global-oneness-education-9008d.firebaseapp.com",
  projectId: "global-oneness-education-9008d",
  storageBucket: "global-oneness-education-9008d.appspot.com",
  messagingSenderId: "1039426630471",
  appId: "1:1039426630471:web:5003fa4a0d9a4c5a4a9262",
  measurementId: "G-139HMTF7C2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);