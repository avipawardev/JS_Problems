import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import PostsDetail from './components/PostsDetail'

const App = () => {
  return (
    <div>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/post/:id' element={<PostsDetail/>}/>
      </Routes>
      </div>
  )
}

export default App