import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/CounterSlice";

export default function App() {
  // Get the counter value from Redux store
  const count = useSelector((state) => state.counter.value);

  // Dispatch actions to Redux store
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>

      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ marginLeft: "10px" }}
        >
          Decrement
        </button>
      </div>

      <h3>State as JSON:</h3>
      <pre>{JSON.stringify({ value: count }, null, 2)}</pre>
    </div>
  );
}
