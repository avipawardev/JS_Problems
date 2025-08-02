import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import './index.css'
import App from './App.jsx'
import { RecipeContext } from './context/recipes.jsx'
import { BrowserRouter} from "react-router-dom";


    async function fetchData(){
      let response = await axios.get('https://dummyjson.com/recipes')
      let data = response.data;
     return data.recipes
    }
    let data = await fetchData()
    
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecipeContext.Provider value={data}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </RecipeContext.Provider>
  </StrictMode>,
)
