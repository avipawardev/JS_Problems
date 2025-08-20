import React from 'react'

const mockRepoObj = [
    {"name": "RepoCard",
    "description": "A component to display repository details",
    "stars": 150,
    "forks": 30},
    {"name": "SearchBar",
    "description": "A component to search for GitHub repositories",
    "stars": 200,
    "forks": 50},
    {"name": "App",
    "description": "Main application component that includes the SearchBar",
    "stars": 300,
    "forks": 100,},
    {
    "name": "App",
    "description": "Main application component that includes the SearchBar",
    "stars": 300,
    "forks": 100
    }
]

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