import React, { useRef, useState } from "react";

function FocusInput() {
  const inputRef = useRef(null); // reference to input
  const [message, setMessage] = useState("");

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus on input
      inputRef.current.style.backgroundColor = "lightyellow"; // change background
      setMessage("Focused!"); // show message
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
      />
      <button onClick={handleFocus} style={{ marginLeft: "10px" }}>
        Focus Input
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FocusInput;
