// import * as firebase from 'firebase'
// import firebase from 'firebase/app'
import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2E42mnThT94E6c2NYYdmZ4BCZyKbTwlc",
  authDomain: "fomter-f4b9d.firebaseapp.com",
  projectId: "fomter-f4b9d",
  storageBucket: "fomter-f4b9d.appspot.com",
  messagingSenderId: "465296332179",
  appId: "1:465296332179:web:7aadcc90503a619cc00466",
  measurementId: "G-VPV2YCH8J9",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { email, photoURL, uid } = user
  return {
    avatar: photoURL,
    username: email,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        console.log(createdAt)

        const fecha = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(fecha)

        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        }
      })
    })
}
