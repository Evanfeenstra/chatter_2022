import "./App.css";
import TextInput from "./TextInput";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import { use100vh } from "react-div-100vh";
import NamePicker from "./NamePicker";
import { useDB, db } from "./db";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page1" element={<div>PAGE 1</div>} />
        <Route path="/:room" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

// this is a Component call App
function App() {
  // these parameters come from the URL
  const params = useParams();
  const room = params.room || "home";

  const height = use100vh();

  const messages = useDB(room);

  const myName = localStorage.getItem("name") || "";
  // our username
  let [username, setUsername] = useState(myName);

  // "sendMessage" runs whenver we click the send button
  function sendMessage(text) {
    if (!text.trim()) return;
    // we'll create a new message object
    const newMessage = {
      text: text,
      time: Date.now(),
      user: username,
      room: room,
    };
    db.send(newMessage);
  }

  // every time state changes, React "re-renders"
  // so this console.log will run again
  // console.log(messages);

  // we return the HTML
  return (
    <div
      className="App"
      style={{ height: height, minHeight: height, maxHeight: height }}
    >
      <header className="header">
        <div className="logo" />
        <span className="title">CHATTER!</span>
        {/* the NamePicker */}
        <NamePicker setUsername={setUsername} initialName={myName} />
      </header>
      <div className="messages">
        {messages.map((msg, i) => {
          // loop over every message in the "messages" array
          // and return a Message component
          // we are "spreading" all the items in "msg" into the props
          // "key" needs to be a unique value for each item
          return (
            <Message {...msg} key={msg.id} fromMe={msg.user === username} />
          );
        })}
      </div>
      {/* the sendMessage prop on TextInput = the sendMessage function */}
      <TextInput sendMessage={sendMessage} />
    </div>
  );
}
