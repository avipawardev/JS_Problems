import React from "react";
import useCounter from "./useCounter";
import "./style.css";

export default function App() {
  // useCounter hook
  const counter1 = useCounter(0);
  const counter2 = useCounter(10); // another instance

  return (
    <div className="container">
      <h1>⚡ Custom Hooks Demo</h1>

      <section>
        <h2>Counter 1</h2>
        <p>Value: {counter1.count}</p>
        <button onClick={counter1.increment}>+</button>
        <button onClick={counter1.decrement}>-</button>
        <button onClick={counter1.reset}>Reset</button>
      </section>

      <section>
        <h2>Counter 2</h2>
        <p>Value: {counter2.count}</p>
        <button onClick={counter2.increment}>+</button>
        <button onClick={counter2.decrement}>-</button>
        <button onClick={counter2.reset}>Reset</button>
      </section>
    </div>
  );
}
