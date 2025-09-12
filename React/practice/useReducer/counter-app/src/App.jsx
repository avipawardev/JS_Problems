import { useReducer, useState } from 'react'
import './App.css'

function reducer(state,action){
  switch(action.type){
    case 'Increment':
      return {count: state.count+1};

      case 'Decrement':
        return {count : state.count-1};

        case 'Reset':
          return {count : state.count = 0}

      default : return state;
  }
}

function App() {
const [state,dispatch] = useReducer(reducer,{count:0})

  return (
    <>
      <div>
       <h1>Counter app with useREducer</h1>
       <h2>count : {state.count}</h2>
       <button onClick={()=>dispatch({type:'Increment'})}>Increment</button>
       <button onClick={()=>dispatch({type:'Decrement'})}>Decrement</button>
       <button onClick={()=>dispatch({type:'Reset'})}>Reset</button>
      </div>
    </>
  )
}

export default App
