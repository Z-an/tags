import * as firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: "AIzaSyCRHHknxMJdBEC0_4gxnJLefw-qGxkI5Qg",
  authDomain: "tags-a56cc.firebaseapp.com",
  databaseURL: "https://tags-a56cc.firebaseio.com",
  projectId: "tags-a56cc",
  storageBucket: "tags-a56cc.appspot.com",
  messagingSenderId: "958361573405"
}

const initFirebase = async () => await firebase.initializeApp(config)

initFirebase()

const firestore = firebase.firestore()