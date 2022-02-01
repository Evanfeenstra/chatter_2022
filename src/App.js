import "./App.css";
import TextInput from "./TextInput";
import React, { useState } from "react";
import Message from "./Message";
import { use100vh } from "react-div-100vh";

// this is a Component call App
function App() {
  const height = use100vh();
  // useState creats a magic variable
  // here its called "messages"
  // the initial value is an empty array []
  // "setMessages" is a function that is used to update "messages"
  let [messages, setMessages] = useState([]);

  // "sendMessage" runs whenver we click the send button
  function sendMessage(text) {
    if (!text) return;
    // we'll create a new message object
    const newMessage = {
      text: text,
      time: Date.now(),
      user: "Evan",
    };
    // set the "messages" to be a new array
    // that contains the new message + all the old messages
    setMessages([newMessage, ...messages]);
  }

  // every time state changes, React "re-renders"
  // so this console.log will run again
  console.log(messages);

  // we return the HTML
  return (
    <div
      className="App"
      style={{ height: height, minHeight: height, maxHeight: height }}
    >
      <header className="header">
        <div className="logo" />
        <span className="title">CHATTER!</span>
      </header>
      <div className="messages">
        {messages.map((msg, i) => {
          // loop over every message in the "messages" array
          // and return a Message component
          // we are "spreading" all the items in "msg" into the props
          // "key" needs to be a unique value for each item
          return <Message {...msg} key={i} />;
        })}
      </div>
      {/* the sendMessage prop on TextInput = the sendMessage function */}
      <TextInput sendMessage={sendMessage} />
    </div>
  );
}

export default App;
