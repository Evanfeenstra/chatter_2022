import "./TextInput.css";
import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");

  function click() {
    setText("");
  }

  return (
    <footer className="footer">
      <input
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="send" onClick={click}>
        ↑
      </button>
    </footer>
  );
}

export default TextInput;
