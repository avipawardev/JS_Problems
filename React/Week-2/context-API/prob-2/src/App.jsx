import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useContext } from 'react'
import { IsLogin } from './context/IsLoggedIn'

const App = () => {
  const {login} = useContext(IsLogin)
  return <>
  <Navbar/>
  <h1>{login?"User Logged In!":"Please LogIn!"}</h1>
  <Footer/>
  </>
}
export default App;