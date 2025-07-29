import React from 'react'
import { useState } from 'react'

const App = () => {
  const [count ,setCount] = useState(0)
  return (
    <div className='flex justify-center items-center h-screen'>
     <h1 className='text-2xl'>{count}</h1>
     <button className='border-1 p-2 mr-2' onClick={()=> setCount(count+1)}>Increment</button>
     <button className='border-1 p-2 mr-2' onClick={()=> setCount(count-1)}>Decrement</button>
     <button className='border-1 p-2 ' onClick={()=> setCount(0)}>Reset</button>
    </div>
  )
}

export default App

