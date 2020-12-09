
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7r2MbTkAYQ42ADYUXg_2PiQZ4Nw0g_8A",
    authDomain: "peer-village.firebaseapp.com",
    databaseURL: "https://peer-village.firebaseio.com",
    projectId: "peer-village",
    storageBucket: "peer-village.appspot.com",
    messagingSenderId: "386469041118",
    appId: "1:386469041118:web:cf10793c8134be9353c34f",
    measurementId: "G-H7VNGJ5242" 
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const increment = firebase.firestore.FieldValue.increment(1)
const decrement = firebase.firestore.FieldValue.increment(-1)
export { db, auth, storage , increment, decrement}