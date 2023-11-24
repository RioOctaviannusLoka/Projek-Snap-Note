// const settingButton = document.querySelectorAll(".settings");
// const settingContainer = document.querySelectorAll(".setting-details");

// settingButton.forEach((element) => {
//   element.addEventListener("click", () => {
//     settingButton.forEach((elem) => {
//       elem.classList.remove("active");
//     });
//     element.classList.add("active");
//     let current = element.className;
//     current = current.split(" ");
//     current = current[2];
//     console.log(current);

//     settingContainer.forEach((el) => {
//       el.classList.remove("inactive");
//     });
//     settingContainer.forEach((el) => {
//       let el_class = el.className;
//       el_class = el_class.split(" ");
//       console.log(el_class);
//       el_class.forEach((ele) => {
//         if (current == ele) {
//           el.classList.remove("inactive");
//           console.log("Hello");
//           console.log(el.className);
//           console.log(el.innerHTML);
//         } else {
//           console.log("Dor");
//           el.classList.add("inactive");
//           console.log(el.className);
//         }
//       });
//     });
//   });
// });

// console.log("Hello World");

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh_865N7AfrYMZp6Ht1IMz4TNYRZ4pV1Y",
  authDomain: "snap-note.firebaseapp.com",
  projectId: "snap-note",
  storageBucket: "snap-note.appspot.com",
  messagingSenderId: "810060069048",
  appId: "1:810060069048:web:2fbaf1e5392b256083dc4d",
  measurementId: "G-HCK5BJEHWD",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const colRef = collection(db, "notes");
console.log(colRef);
