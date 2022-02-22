import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  where,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

let store;
const collection_name = "messages";

function useDB(room) {
  const [messages, setMessages] = useState([]);

  function add(m) {
    setMessages((current) => {
      const msgs = [m, ...current];
      msgs.sort(
        (a, b) => (a.time && a.time.seconds) - (b.time && b.time.seconds)
      );
      return msgs;
    });
  }
  function remove(id) {
    setMessages((current) => current.filter((m) => m.id !== id));
  }

  useEffect(async () => {
    const q = room
      ? query(collection(store, collection_name), where("room", "==", room))
      : query(collection(store, collection_name));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const { doc, type } = change;
        if (type === "added") add({ ...doc.data(), id: doc.id });
        if (type === "removed") remove(doc.id);
      });
    });
  }, [room]);
  return messages;
}

const db = {};
db.send = async function (msg) {
  return addDoc(collection(store, collection_name), msg);
};
db.edit = async function (id, msg) {
  return setDoc(doc(store, collection_name, id), msg);
};
db.delete = async function (id) {
  return deleteDoc(doc(store, collection_name, id));
};

export { db, useDB };

// const firebaseConfig = {
//   apiKey: "AIzaSyB1yH6qnCipRP8ud2m2wHvCiXQv-pAOLmA",
//   authDomain: "chatter-2022.firebaseapp.com",
//   projectId: "chatter-2022",
//   storageBucket: "chatter-2022.appspot.com",
//   messagingSenderId: "608856859166",
//   appId: "1:608856859166:web:05c87cf0e97c6c63bd440f"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB1yH6qnCipRP8ud2m2wHvCiXQv-pAOLmA",
  authDomain: "chatter-2022.firebaseapp.com",
  projectId: "chatter-2022",
  storageBucket: "chatter-2022.appspot.com",
  messagingSenderId: "608856859166",
  appId: "1:608856859166:web:05c87cf0e97c6c63bd440f",
};

const app = initializeApp(firebaseConfig);
store = getFirestore(app);
