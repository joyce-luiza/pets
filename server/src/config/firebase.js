// Importe os módulos necessários do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtenha uma referência para o armazenamento do Firebase
const firebaseStorage = getStorage(firebaseApp);

export default firebaseStorage;
