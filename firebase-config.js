// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBa3W5hLroJdD070ps0dSCTWrxXEplOwcI",
  authDomain: "medusa-7a733.firebaseapp.com",
  projectId: "medusa-7a733",
  storageBucket: "medusa-7a733.appspot.com",
  messagingSenderId: "347190790414",
  appId: "1:347190790414:web:0cdf780c0354afb3896f5f",
  measurementId: "G-7JYLS18CGJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
