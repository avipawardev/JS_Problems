import { useContext, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import RepoCard from './components/RepoCard'
import { Theme } from './context/ThemeContext'

function App() {
  const {theme,setTheme} = useContext(Theme)
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
      setRepoData(res.data)
      setLoading(false)
      setErrorMsg("")
    console.log(res.data)
    } catch (error) {
      setErrorMsg(error.message)
      console.log(errorMsg)
    }
  }
  fetchData()
},[searchClicked])

  return (
    <div style={{width:'100vw',height:'100vh',backgroundColor:theme?'white':'black',color:theme?'black':'white'}}>
    <div style={{display:'flex', justifyContent:"space-evenly",width:'100vw',alignItems:'center'}}>
      <h1 style={{fontSize:'3rem'}}>QuickRepo Viewer</h1>
      <button onClick={()=>setTheme(prev=>!prev)} style={{width:'60px',padding:'10px',backgroundColor:theme?'white':'black',color:theme?'black':'white',border:`1px solid ${theme?'black':'white'}`}}>☼</button>
    </div>
     <SearchBar search={search} setSearch={setSearch} setSearchClicked={setSearchClicked}/>
     {loading?<h3>Loading.....</h3>:
     <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px',padding:'10px'}}>
      {repoData.map((ele,i)=>(
        <RepoCard key={i} name={ele.name}  description = {ele.description} stars = {ele.stars} forks= {ele.forks} />
      ))}
     </div>
     }
    </div>
  )
}

export default App
