import React, { useState } from 'react'
import Counter from './components/Counter'

const App = () => {
// const [count,setCount] = useState(0)
let initialVal = 0;
  return (
    <div>
      {/* <button onClick={()=>setCount(count+1)}>Increment</button>
      <Counter number={count}/>
      <button onClick={()=>setCount(count-1)}>Increment</button> */}
      <Counter initialVal = {initialVal}/>
    </div>
  )
}

export default App