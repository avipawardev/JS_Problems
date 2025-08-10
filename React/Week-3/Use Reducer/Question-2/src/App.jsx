/** @format */

import {React, useReducer } from "react";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    default :
      return state;  
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return(
     <>
    <h1>Count : {state.count}</h1>
    <button onClick={()=>dispatch({type:'increment'})}>INCREMENT</button>
    <button onClick={()=>dispatch({type:'decrement'})}>DECREMENT</button>
   </>
  )
  
}

export default App;
