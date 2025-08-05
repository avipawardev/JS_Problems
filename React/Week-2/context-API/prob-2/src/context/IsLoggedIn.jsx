import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const IsLogin = createContext()

export const IsLoggedIn = ({children}) => {
    const [login,setLogin] = useState(false);
  return (
    <IsLogin.Provider value={{login,setLogin}}>
        {children}
    </IsLogin.Provider>
  )
}

