import React, { useState } from 'react'

const Counter = ({initialVal}) => {
    const [count,setCount]=useState(initialVal)
  return (
    <div>
         <button onClick={()=>setCount(count => count+1)}>Increment</button>
         <h2>counter: {count}</h2>
         <button onClick={()=>setCount(count => count-1)}>Decrement</button>
        </div>
  )
}

export default Counter