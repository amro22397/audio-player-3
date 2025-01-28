// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5FnDkmC2qrINrF5xdujnRQwg4xute1XU",
  authDomain: "audio-player-a7cd7.firebaseapp.com",
  projectId: "audio-player-a7cd7",
  storageBucket: "audio-player-a7cd7.firebasestorage.app",
  messagingSenderId: "159893270882",
  appId: "1:159893270882:web:8f86730a3e8bc74adffc3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);