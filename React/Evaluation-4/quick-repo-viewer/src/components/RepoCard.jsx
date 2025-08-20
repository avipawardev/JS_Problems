import React from 'react'

const RepoCard = ({name, description, stars, forks}) => {
  return (
    <div style={{border:'1px solid', padding:'10px'}}>
        <h3>Name: {name}</h3>
        <p>Description: {description}</p>
        <p>Stars: {stars}</p>
        <p>Forks: {forks}</p>
    </div>
  )
}

export default RepoCard;