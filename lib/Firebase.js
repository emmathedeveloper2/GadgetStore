// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  doc,
  deleteDoc,
  getDoc,      
  updateDoc,    
  collection,   
  getDocs,      
  query,        
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmp1nJo_qeQXbfxcD1CNqNoK9AnqPRI", 
  authDomain: "schoolreg-a7ca6.firebaseapp.com",
  projectId: "schoolreg-a7ca6",
  storageBucket: "schoolreg-a7ca6.appspot.com",
  messagingSenderId: "683307695591",
  appId: "1:683307695591:web:1511bc2ca3421fbdb8d142",
  measurementId: "G-G8B81BK6JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const deleteDevice = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    ("Document successfully deleted!");
    return true;
  } catch (error) {
    error("Error deleting document:", error);
    return false;
  }
};

export const fetchDevice = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      ("Document data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // docSnap.data() will be undefined in this case
      ("No such document!");
      return null;
    }
  } catch (error) {
    error("Error fetching document:", error);
    return null;
  }
};

export const fetchDevices = async (collectionName, queryConstraints = []) => {
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    const devices = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      devices.push({ id: doc.id, ...doc.data() });
    });
    ("Fetched devices:", devices);
    return devices;
  } catch (error) {
    error("Error fetching devices:", error);
    return [];
  }
};

export const updateDevice = async (collectionName, docId, newData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
    ("Document successfully updated!");
    return true;
  } catch (error) {
    error("Error updating document:", error);
    return false;
  }
};