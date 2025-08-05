import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    const [posts,setPosts]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts= async()=>{
            let response = await fetch('https://dummyjson.com/posts');
            let data = await response.json();
            setPosts(data.posts);
            setFilteredPosts(data.posts)
            // console.log(data.posts)
        }
        fetchPosts()
    },[])

    useEffect(()=>{
        const filtered = posts.filter(post =>
      post.title.includes(searchTerm) 
    );
    setFilteredPosts(filtered)
    },[posts,searchTerm])

  return (
    <>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search by Title (case-sensitive)"
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

      </div>
    <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  }}
>
  {filteredPosts.map((post) => (
    <div
      key={post.id}
      style={{
        border: '1px solid #e0e0e0',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <h3 style={{ fontSize: '18px', color: '#333' }}>{post.title}</h3>

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
        <p>👍 {post.reactions.likes}</p>
        <p>👎 {post.reactions.dislikes}</p>
        <p>👁️ {post.views}</p>
      </div>

      <Link
        to={`/post/${post.id}`}
        style={{
          textDecoration: 'none',
          color: 'white',
          backgroundColor: '#007bff',
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'inline-block',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
      >
        VIEW POST
      </Link>
    </div>
  ))}
</div>
</>
  )
}

export default Home