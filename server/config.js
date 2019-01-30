var firebase = require("firebase")

var config = {
  apiKey: "AIzaSyCRHHknxMJdBEC0_4gxnJLefw-qGxkI5Qg",
  authDomain: "tags-a56cc.firebaseapp.com",
  databaseURL: "https://tags-a56cc.firebaseio.com",
  projectId: "tags-a56cc",
  storageBucket: "tags-a56cc.appspot.com",
  messagingSenderId: "958361573405"
}

const initFB = async () => await firebase.initializeApp(config)
initFB()

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true
})
