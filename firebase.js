import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBOmG73WVlub9b7n6Bjl1E848ouUAMAcng",
  authDomain: "whatsapp-d5c14.firebaseapp.com",
  projectId: "whatsapp-d5c14",
  storageBucket: "whatsapp-d5c14.appspot.com",
  messagingSenderId: "54799941863",
  appId: "1:54799941863:web:cebdde2ca97fe7766e6242"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new GoogleAuthProvider() 

export {db, auth, provider}