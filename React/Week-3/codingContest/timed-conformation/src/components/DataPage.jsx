import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DataPage = () => {
    const [posts,setPosts] = useState([]);
    async function fetchData(){
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    setPosts(data)
    }
    useEffect(()=>{
        fetchData()
    })

    const navigate = useNavigate()
  return (
    <>
    <div>
        <button onClick={()=>navigate('/')}>Go to Home</button>
    {posts.map((ele,i)=>(
        <div key={i} style={{border:'1px solid lightgrey',padding:'10px'}}>{ele.title}</div>
    ))}
    </div>
    </>
  )
}

export default DataPage