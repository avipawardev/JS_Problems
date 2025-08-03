import React, { useState, useEffect } from 'react';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          if (next === 10) {
            console.log("🔔 Play sound at 10 seconds");
            // new Audio('/beep.mp3').play(); // (optional real sound)
          }
          return next;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>⏱ Time: {seconds} sec</h2>
      <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start</button>
      <button onClick={() => setIsRunning(false)} disabled={!isRunning}>Stop</button>
    </div>
  );
}

export default App;
 