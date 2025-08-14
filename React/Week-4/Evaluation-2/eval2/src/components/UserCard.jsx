import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Follow } from '../context/FollowContext'

const UserCard = ({users}) => {
   const {followingUsers,setFollowingUsers}= useContext(Follow);

function addFollow(name,email,username,website){
//     let user = {name,email,username,website}
//  setFollowingUsers([...followingUsers,user])
setFollowingUsers(()=> prev=>prev+1)
}

  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:'1rem'}}>
        {users.map((ele,i)=>(
            <div style={{border:'1px solid white',width:'25%',padding:'1rem',borderRadius:'10px'}} key={i}>
                <h2>{ele.name}</h2>
                <p>{ele.email}</p>
                <p>{ele.username}</p>
                <p>{ele.website}</p>
                <Link to={`/users/${ele.id}`} style={{padding:'10px',borderRadius:'5px',color:'white',backgroundColor:'green',marginRight:'5px'}}>VIEW DETAILS</Link>
                <button onClick={()=>addFollow()} style={{color:'white',backgroundColor:'royalblue'}}>Follow</button>
            </div>
        ))}
    </div>
  )
}

export default UserCard