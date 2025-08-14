import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserDetails = () => {
    const {userId} = useParams();
    const [user,setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(()=>{
     const fetchUser = async () => {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            console.log(res.data)
            setUser(res.data)
        }
        fetchUser()
    },[])
  return (
    <>
    <button style={{color:'white',backgroundColor:'salmon',marginBottom:'20px'}} onClick={()=> navigate('/')}>↖️ Back</button>
    <div>
        {user?(<div style={{border:'1px solid white',padding:'1rem',borderRadius:'10px'}}>
            <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.username}</p>
                <p>{user.website}</p>
                <button style={{color:'white',backgroundColor:'royalblue'}}>Follow</button>
        </div>):
        <p>Loading......</p>}
    </div>
    </>
  )
}

export default UserDetails