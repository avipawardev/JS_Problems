import React, { useEffect, useState } from 'react'
import ThemeBox from './components/ThemeBox';

const App = () => {

  const [theme,setTheme] = useState('light');


  //getting default data from local storage at when component rendered first time.
 useEffect(()=>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) setTheme(savedTheme);
  },[])

  useEffect(()=>{
    localStorage.setItem('theme',theme)
  },[theme])

  const toggleTheme=()=>{
    setTheme((prev)=>prev=='light'?'dark':'light')
  }

  return (
    <div>
      <button onClick={toggleTheme}>{theme=='light'? 'dark':'light'}</button>

      <ThemeBox theme={theme}>This is Box 1</ThemeBox>
      <ThemeBox theme={theme}>This is Box 2</ThemeBox>
      <ThemeBox theme={theme}>This is Box 3</ThemeBox>
    </div>
  )
}

export default App