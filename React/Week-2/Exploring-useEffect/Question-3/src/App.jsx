import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { UserCard } from './UserCard'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="container">
      <h1>User Profiles</h1>
      <div className="cards">
        {users.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            city={user.address.city}
          />
        ))}
      </div>
    </div>
  )
}

export default App
