import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCrjNrv7SpqyR-_rPR4qt29nSYMLuDt7SM",
  authDomain: "user-authentication-60ff3.firebaseapp.com",
  databaseURL: "https://user-authentication-60ff3.firebaseio.com",
  projectId: "user-authentication-60ff3",
  storageBucket: "user-authentication-60ff3.appspot.com",
  messagingSenderId: "721586466667",
  appId: "1:721586466667:web:f0c62e1ce84b59c775a62e",
  measurementId: "G-GNVPF6LLQ7",
});

const auth = firebase.auth();

export { auth };
