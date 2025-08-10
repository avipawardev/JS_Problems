import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [page,setPage]=useState(1);
  
  const [products,setProducts]=useState([])
  console.log('re-rendered!')

  const fetchData = async()=>{
let response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
let data = await response.json()
setProducts(data.results)
// console.log(data.results)
  }

  useEffect(()=>{
    fetchData()
  },[page])

  return (
    <>
    <div style={{display:'flex', gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
      {products.map((ele,i)=>(
        <div style={{border:'1px solid white'}}>
          <img src={ele.image} alt="" />
          <h2>{ele.name}</h2>
          <div>
            <p>{ele.type}</p>
            <p>{ele.status}</p>
          </div>
        </div>
      ))}
    </div>
   <button disabled={page==1} onClick={()=> setPage(prev=>prev-1)}>Prev</button>
  <button style={{backgroundColor:'green',color:'white'}}>{page}</button>
   <button onClick={()=>setPage(prev=>prev+1)}>Next</button>
    </>
  )
}

export default App
