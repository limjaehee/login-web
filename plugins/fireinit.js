// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import key from "./key.js";

// Your web app's Firebase configuration
const firebaseConfig = key;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
