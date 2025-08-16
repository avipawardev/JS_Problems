import React from "react";
import useTimer from "./useTimer";
import "./style.css";

export default function App() {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div className="container">
      <h1>⏱️ useTimer Hook Demo</h1>

      <h2>Timer: {timer} sec</h2>
      <p>Status: {isRunning ? "Running 🟢" : "Stopped 🔴"}</p>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
