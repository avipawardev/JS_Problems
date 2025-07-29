import React from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {
  const [memes , setMemes]= useState([])

  async function fetchData(){
    let res = await axios.get('https://api.imgflip.com/get_memes')
    setMemes(res.data.data.memes)
  }
  return (
    <div>
{console.log(memes)}

<button onClick={fetchData}>Load Memes</button>
 <div style={{display:'grid', gridTemplateColumns:"repeat(4, 1fr)" , gap:'10px', alignItems:'center'}}>
    {memes.map((ele,i)=>(
      <div style={{border:'1px solid'}}>
        <div style={{width:'300px'}}>
        <img style={{width:'100%'}} src={ele.url} alt="" />
        </div>
        <h3>{ele.name}</h3>
      </div>
    ))}
 </div>
    </div>
  )
}

export default App