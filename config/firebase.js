import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQGyurP-hiQeA_A2VLu7rKMrGIGQIGaKc",
  authDomain: "vendingmachineex.firebaseapp.com",
  projectId: "vendingmachineex",
  storageBucket: "vendingmachineex.appspot.com",
  messagingSenderId: "652269658041",
  appId: "1:652269658041:web:6eb77033290c72baf36068",
  measurementId: "G-EEHMHH10FF",
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization Error", err.stack);
  }
}
const db = firebase.firestore();

export default db;
