import { useContext } from 'react'
import './App.css'
import { CounterContext } from './context/CounterContext'
import Home from './components/Home'
import { Theme } from './context/ThemeContext'

function App() {
 const {count,setCount} = useContext(CounterContext)
 const {theme,setTheme} = useContext(Theme)

  return (
    <>

    <div style={{width:'200px',height:'200px',backgroundColor:theme?'white':'black'}}>
        <h1 style={{color:theme?'black':'white'}}>App</h1>
        <button onClick={()=>setTheme(prev=>!prev)}>Theme</button>
    </div>
     <h1>{count}</h1>
     <button onClick={()=>setCount(prev=>prev+1)}>Increment</button>
     <button onClick={()=>setCount(prev=>prev-1)}>Decrement</button>

     <Home/>


    </>
  )
}

export default App
