import React from 'react'
import { increment,decrement,reset } from './Counterslice'
import {useSelector,useDispatch} from 'react-redux'

const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  return (
    <div>
        <h1>count : {count}</h1>
        <button onClick={()=> dispatch(increment())}>Increment</button>
        <button onClick={()=> dispatch(decrement())}>Decrement</button>
        <button onClick={()=> dispatch(reset())}>Reset</button>
    </div>
  )
}

export default Counter