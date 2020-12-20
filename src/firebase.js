
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    //your config
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const increment = firebase.firestore.FieldValue.increment(1)
const decrement = firebase.firestore.FieldValue.increment(-1)
export { db, auth, storage , increment, decrement}
