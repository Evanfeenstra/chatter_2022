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
        (a, b) => (b.date && b.date.seconds) - (a.date && a.date.seconds)
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

const firebaseConfig = {
  apiKey: "AIzaSyCxnHdHGicbw16DmQfEbNVy7XD6ENprVNQ",
  authDomain: "chatter2021-2b8fb.firebaseapp.com",
  projectId: "chatter2021-2b8fb",
  storageBucket: "chatter2021-2b8fb.appspot.com",
  messagingSenderId: "778098356347",
  appId: "1:778098356347:web:c396b31d7a0a5c0c6c32de",
};

const app = initializeApp(firebaseConfig);
store = getFirestore(app);
