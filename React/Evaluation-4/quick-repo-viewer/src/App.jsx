import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import RepoCard from './components/RepoCard'

function App() {
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
const [repoData, setRepoData] = useState([])
const [loading,setLoading]=useState(false)
const [search,setSearch]=useState('')
const [errorMsg,setErrorMsg]=useState('')
const [searchClicked,setSearchClicked]=useState(false)


useEffect(()=>{
  setLoading(true)
  async function fetchData() {
    try {
      let res = await axios.get(`https://api.github.com/users/${search}/repos`)
      setLoading(false)
      setErrorMsg("")
    console.log(res.data)
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  fetchData()
},[searchClicked])

  return (
    <>
     <SearchBar search={search} setSearch={setSearch} setSearchClicked={setSearchClicked}/>
     <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px',padding:'10px'}}>
      {mockRepoObj.map((ele,i)=>(
        <RepoCard key={i} name={ele.name}  description = {ele.description} stars = {ele.stars} forks= {ele.forks} />
      ))}
     </div>
    </>
  )
}

export default App
