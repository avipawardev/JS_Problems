import React from "react";
import useToggleItems from "./useToggleItems";
import "./style.css";

export default function App() {
  // Array + initial position = 1 (so starts with "B")
  const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div className="container">
      <h1>🔄 useToggleItems Hook Demo</h1>
      <h2>Current Item: {state}</h2>
      <button onClick={toggleState}>Next</button>
    </div>
  );
}
