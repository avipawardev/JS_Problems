import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import UserList from './components/UserList'
import { Route, Routes } from 'react-router-dom'
import UserDetails from './components/UserDetails'
import Following from './components/Following'

function App() {

  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element={<UserList/>}/>
      <Route path='/users/:userId' element={<UserDetails/>}/>
      <Route path='following' element={<Following/>}/>
     </Routes>
     
    </>
  )
}

export default App
