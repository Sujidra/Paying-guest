import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC9-aN4BHGncqaBp7pUescB29Qgw495aAw",
    authDomain: "paying-guest-af970.firebaseapp.com",
    databaseURL: "https://paying-guest-af970.firebaseio.com",
    projectId: "paying-guest-af970",
    storageBucket: "paying-guest-af970.appspot.com",
    messagingSenderId: "1008271882565",
    appId: "1:1008271882565:web:a5101e481848267a1aa62c",
    measurementId: "G-61CEG50HX8"

  };

firebase.initializeApp(firebaseConfig)
const googleAuthProvider= new firebase.auth.GoogleAuthProvider();

export { googleAuthProvider, firebase as default};