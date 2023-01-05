// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB63Q5bZ1eTCD2Lu9QTuL8Wd9Z58awOkXA",
  authDomain: "chello-data.firebaseapp.com",
  projectId: "chello-data",
  storageBucket: "chello-data.appspot.com",
  messagingSenderId: "987726040037",
  appId: "1:987726040037:web:b417faef2db4c6350ebd0c",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = () => {
  try {
    getFirestore(app);
    console.log("\nConnected to Firebase");
  } catch (e) {
    console.log("Cannot connect to Firebase");
    return;
  }
};

// Get a list of cities from your database
// async function getCities(db: any) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// getCities(db)
