import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
    getFirestore, collection, getDocs,addDoc
} from 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

// init firestore service
const db = getFirestore()

// // collection reference
// const colRef = collection(db, 'users')

// //get collection data
// getDocs(colRef)
//     .then((snapshot)=>{
//         let users = []
//         snapshot.docs.forEach((doc)=>{
//             users.push({...doc.data(), id: doc.id})
//         })
//         console.log(users)
//     })
//     .catch(err=> {
//         console.log(err.message)
//     })  

// // adding documents
// const addUser = document.querySelector('singup')
// addUser.addEventListener('submit', (e) => {
//     e.preventDefault()

//     addDoc(colRef, {
//         email: addUser.email.value,
//         password: addUser.password.value,
//     })
// })

export const auth = app.auth()
export {db}
export default app 