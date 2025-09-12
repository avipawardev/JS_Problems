import React, { useContext } from 'react'
import { Theme } from '../context/ThemeContext'

const Home = () => {
    const {theme,setTheme} = useContext(Theme)
  return (
    <div style={{width:'200px',height:'200px',backgroundColor:theme?'white':'black'}}>
        <h1 style={{color:theme?'black':'white'}}>Home</h1>
        <button onClick={()=>setTheme(prev=>!prev)}>Theme</button>
    </div>
  )
}

export default Home