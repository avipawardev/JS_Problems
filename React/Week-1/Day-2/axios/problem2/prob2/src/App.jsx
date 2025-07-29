import React from 'react'
import { useState } from 'react'
import axios from 'axios';


const App = () => {
  const [products, setProducts] = useState([])

  async function fetchData(){
    
    let res = await  axios.get('https://fakestoreapi.com/products');

    setProducts(res.data)
  }
  return (
    <div>
<button onClick={fetchData}>Load Products</button>
    { products? products.map((ele,i)=> (<div style={{alignItems:'center'}} key={i}>
      <div style={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
      <img style={{width:'200px'}} src={ele.image} alt="" />
      <p>{ele.title}</p>
      <h4>{ele.price}</h4>
      <p>{ele.description}</p>
      </div>
    </div>)) : <p>Loading....</p>}
    </div>
  )
}

export default App