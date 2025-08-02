import { useState } from 'react'
import './App.css'
import { allRecipes } from './context/recipes'
import RecipeCard from './components/RecipeCard'
import {Route, Routes} from "react-router-dom";

function App() {
  const [theme,setTheme]=useState(true)
  return (
   
    <div style={{width:'100vw',height:'100vh', backgroundColor:theme?"white":"black" , color:theme?"black":"white"}}>
    <button onClick={()=> setTheme(!theme)}>{theme?'Dark':'Light'}</button>
    <Routes>
    <Route path='/' element={<RecipeCard/>}/>
    </Routes>
  </div>
  )
}

export default App
