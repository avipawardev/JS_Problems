import React from 'react'

export const UserCard = ({ name, email, city }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>City:</strong> {city}</p>
    </div>
  )
}
