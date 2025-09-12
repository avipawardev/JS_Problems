import React, { useEffect, useState } from 'react'

const Home = () => {
     const [count,setCount]=useState(0)
     const [toggle,setToggle] = useState(false)
     const [posts,setPosts] = useState([])
    console.log('rendered');

   async function fetchData(){
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json();
    setPosts(data)
    console.log(data)
    }
useEffect(()=>{
  console.log('useeffect-mounted')
  fetchData()
},[])

useEffect(()=>{
    async function fetchData2(){
    let res = await fetch('https://fakestoreapi.com/products');
    let data = await res.json();
    setPosts(data)
    }
    fetchData2;
    console.log('fetched second time')
},[count])

  return (
    <>
     <h1>count: {count}</h1>
     <button onClick={()=>setCount(c=>c+1)}>Increment</button>
     <button onClick={()=>setCount(c=>c-1)}>Decrement</button>
     <button onClick={()=>setToggle(!toggle)}>Toggle</button>
    </>
  )
}

export default Home;






