import React from 'react'
import Home from './components/Home'
import {Routes,Route} from 'react-router-dom'
import ProductDetails from './components/ProductDetails'

const App = () => {
  return (
    <div>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/product/:id' element={<ProductDetails/>}/>
      </Routes>
    </div>
  )
}

export default App