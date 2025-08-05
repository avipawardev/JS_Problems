import React from 'react'
import { useContext } from 'react'
import { IsLogin } from '../context/IsLoggedIn'

const Footer = () => {
  const {login,setLogin} = useContext(IsLogin)
  return (
    <div>
      {login?"Welcome, User":"Please Login"}
    </div>
  )
}

export default Footer
