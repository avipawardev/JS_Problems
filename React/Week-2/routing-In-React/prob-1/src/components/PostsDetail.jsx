import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PostsDetail = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [product,setProduct]=useState(null);

    useEffect(()=>{
        const fetchProduct = async()=>{
            let response = await fetch(`https://dummyjson.com/posts/${id}`);
            let data = await response.json();
            // console.log(data)
            setProduct(data)
        }
        fetchProduct()
    },[])
  return (
    <>
    <button style={{backgroundColor:'royalblue',border:'none',color:'white',borderRadius:'5px',padding:'5px'}} onClick={()=>navigate('/')}>Go to Home</button>
    <h1 style={{textAlign:'center'}}>Product Details</h1>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        {product ? (
      <div style={{width:'60%',border:'1px solid',padding:'10px', textAlign:'center'}}>
        <h3>{product.title}</h3>
        <p>{product.body}</p>
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '10px 0',
          fontSize: '14px',
          color: '#555',
        }}
      >
        <p>👍 {product.reactions.likes}</p>
        <p>👎 {product.reactions.dislikes}</p>
        <p>👁️ {product.views}</p>
      </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
        </div>
        </>
  )
}

export default PostsDetail