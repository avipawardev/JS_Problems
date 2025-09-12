import axios from 'axios';
import React, { useState } from 'react'
import Home from './Home';

const App = () => {
  const [data, setData] = useState([]);

    async function fetchdata(){
      try {
        let products = await axios.get('https://fakestoreapi.com/products');
      setData(products.data)
      console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchdata()
  return (
    <div>
      <h1>Product Titles</h1>
      <Home products={data}/>
    </div>
  )
}

export default App