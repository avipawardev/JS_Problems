import React, { Children, createContext, useState } from 'react'


export const Follow = createContext()

export const FollowContext = ({children}) => {
   const [followingUsers,setFollowingUsers]= useState([])
  return (
    <Follow.Provider value={{followingUsers,setFollowingUsers}}>
        {children}
    </Follow.Provider>
  )
}
