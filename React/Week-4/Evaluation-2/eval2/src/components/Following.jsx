import React, { useContext, useEffect, useState } from 'react'
import { Follow } from '../context/FollowContext'


const Following = () => {

  const {followingUsers,setFollowingUsers} = useContext(Follow)
  console.log(followingUsers)
  return (
    <div>
      Hello
      </div>
  )
}

export default Following