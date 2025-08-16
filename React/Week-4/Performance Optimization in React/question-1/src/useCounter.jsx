import { useState } from "react";

// Custom Hook: useCounter
export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  // return state + functions
  return { count, increment, decrement, reset };
}
