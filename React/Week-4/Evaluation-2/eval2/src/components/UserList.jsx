import React, { useEffect, useState } from 'react'
import axios from 'axios';
import UserCard from './UserCard';

const UserList = () => {
    const [users,setUsers]=useState([]);



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
        <UserCard users={users}/>
    </div>
  )
}

export default UserList