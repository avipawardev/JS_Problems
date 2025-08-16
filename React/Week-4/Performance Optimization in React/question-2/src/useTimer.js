import { useState, useRef, useEffect } from "react";

export default function useTimer() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // store interval ID

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Reset timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer(0);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { timer, isRunning, startTimer, stopTimer, resetTimer };
}
