// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyBu3Zcbw-hVwPHReVLFcGRNZ_459vAR8KY",
  authDomain: "chello-ba5d2.firebaseapp.com",
  projectId: "chello-ba5d2",
  storageBucket: "chello-ba5d2.appspot.com",
  messagingSenderId: "328005742126",
  appId: "1:328005742126:web:93765f3d40fee67b84f9bf"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = () =>  {
    getFirestore(app);
    console.log('\nConnected to Firebase');
};

// Get a list of cities from your database
// async function getCities(db: any) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// getCities(db)