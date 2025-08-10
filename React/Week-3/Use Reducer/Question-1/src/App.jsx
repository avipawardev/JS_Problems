import { useEffect, useReducer} from 'react'
import './App.css'

function reducer(state,action){
  switch(action.type){
    case "TOGGLE" :
      return {mode : state.mode == "Light" ? "Dark" : "Light"}

      default : 
      return state;
  }
}


function App() {

  const [state,dispatch] = useReducer(reducer,{mode : "Light"})

  useEffect(()=>{
  document.body.style.backgroundColor = state.mode == "Light" ? "White" : "Black";
  document.body.style.color = state.mode === "Light" ? "black" : "white";
},[state.mode])


  return (
    <>
     <button onClick={()=>dispatch({type : "TOGGLE"})}>{state.mode == "Light" ? "Dark" : "Light"}</button>
    </>
  )
}

export default App
