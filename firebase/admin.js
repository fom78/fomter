
const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");
console.log(serviceAccount)
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
  } catch (e) {}



export const firestore = admin.firestore()