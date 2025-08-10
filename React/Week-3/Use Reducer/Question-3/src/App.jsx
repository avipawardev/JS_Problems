/** @format */
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible }; // flip true/false
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { isVisible: false });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
     {/* Conditionally show message */}
      {state.isVisible && <h1>Hello, World!</h1>}
      <button onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}>
        Toggle Message
      </button>

    
    </div>
  );
}

export default App;
