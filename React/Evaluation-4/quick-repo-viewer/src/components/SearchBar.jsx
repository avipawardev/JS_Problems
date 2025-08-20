import React from 'react'

const SearchBar = ({search,setSearch,setSearchClicked}) => {
  return (
    <div>
        <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='EnterGitHub username here...'/>
        <button onClick={()=>setSearchClicked(prev=>!prev)}>Search</button>
    </div>
  )
}

export default SearchBar