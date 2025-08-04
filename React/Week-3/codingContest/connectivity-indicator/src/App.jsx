import React, { useEffect, useState } from 'react'

const App = () => {
  const [users,setUsers]=useState([])
  const [isOnline,setIsOnline]=useState(navigator.onLine)

  useEffect(()=>{
      const handleOnlie =()=> setIsOnline(true);
      const handleOffline =()=> setIsOnline(false);

      window.addEventListener('onlie',handleOnlie);
      window.addEventListener('offline',handleOffline);
  },[])

  useEffect(()=>{
    async function fetchData(params) {
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        let data = await response.json();
        setUsers(data);
    }
    fetchData()
  },[])
  return (
    <div>
      <div style={{ padding: '10px', background: isOnline ? 'lightgreen' : 'salmon' }}>
      {isOnline ? '✅ You are online' : '❌ You are offline'}
    </div>
      {users && users.map(user=>(
        <p key={user.id} style={{border:'1px solid lightgrey'}}>{user.name}</p>
      ))}
    </div>
  )
}

export default App