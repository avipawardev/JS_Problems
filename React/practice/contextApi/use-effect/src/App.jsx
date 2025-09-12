import { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  const [toggle,setToggle] = useState(true)
return (
  <>
  {toggle?<Home/>:<Login/>}
 <button onClick={()=> setToggle(!toggle)}>
  Switch
 </button>
  </>
)
}

export default App


