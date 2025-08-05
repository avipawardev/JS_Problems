import React from 'react'
import { useContext } from 'react'
import { IsLogin } from '../context/IsLoggedIn'

const Navbar = () => {
  const {login,setLogin} = useContext(IsLogin)
  return (
    <div>
        <button onClick={()=>setLogin(!login)}>{login?"Logout":"Login"}</button>
    </div>
  )
}

export default Navbar