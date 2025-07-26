import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "goals-app-demo.firebaseapp.com",
  projectId: "goals-app-demo",
  storageBucket: "goals-app-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

