import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

function App() {

  const count = useSelector((state) => state.count)

  const dispatch = useDispatch()
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={()=>dispatch({type:'Increment'})}>Increment</button>
      <button onClick={()=>dispatch({type:'Decrement'})}>Decrement</button>
    </>
  )
}

export default App
