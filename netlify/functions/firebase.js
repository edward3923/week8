const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyAbFbDKkjy18OJKMpnNFRSemFBnOHgqvhI",
  authDomain: "kiei-451-3a150.firebaseapp.com",
  projectId: "kiei-451-3a150",
  storageBucket: "kiei-451-3a150.appspot.com",
  messagingSenderId: "136717414465",
  appId: "1:136717414465:web:e6a733a02b4b3145c8d6c0"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase