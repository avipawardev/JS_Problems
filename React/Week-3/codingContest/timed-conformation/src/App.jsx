import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import DataPage from './components/DataPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/data" element={<DataPage/>}/>
      </Routes>
    </div>
  )
}

export default App



