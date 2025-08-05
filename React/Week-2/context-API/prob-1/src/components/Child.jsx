import React from 'react'
import { useContext } from 'react'
import { ThemeState } from '../context/Theme'

const Child = () => {
const {theme,setTheme} = useContext(ThemeState)
  return (
    <div style={{backgroundColor:theme=='light' ? 'black' : 'white' , color:theme=='light'?'white':'black',height:'100vh'}}>
        Child
    </div>
  )
}

export default Child