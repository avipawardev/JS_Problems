import React, { Children, createContext, useState } from 'react'


export const Follow = createContext()

export const FollowContext = ({children}) => {
//    const [followingUsers,setFollowingUsers]= useState([])
const [followingUsers,setFollowingUsers]= useState(0)
  return (
    <Follow.Provider value={{followingUsers,setFollowingUsers}}>
        {children}
    </Follow.Provider>
  )
}






