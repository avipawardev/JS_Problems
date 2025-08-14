import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users,setUsers]=useState([]);
    const navigate = useNavigate()

useEffect(()=>{
   const fetchData =  async () => {
        let res = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(res.data)
        setUsers(res.data)
    }
    fetchData()
},[])

  return (
    <div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',}}>
    <button onClick={()=> navigate('/following')} style={{color:'white',backgroundColor:'salmon'}}>♡ Following</button>
    </div>
        <UserCard users={users}/>
    </div>
  )
}

export default UserList