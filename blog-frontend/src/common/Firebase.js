import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkCszKR-KGemiiGpUvW4IpjXec7e5avto",
  authDomain: "test-auth-2e024.firebaseapp.com",
  projectId: "test-auth-2e024",
  storageBucket: "test-auth-2e024.appspot.com",
  messagingSenderId: "946317643041",
  appId: "1:946317643041:web:dd184aa5f607d7c9570260",
  measurementId: "G-5JNJXGS1JG",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log("User==>", user);

  return user;
};
