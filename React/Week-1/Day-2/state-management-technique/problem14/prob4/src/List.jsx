import React from 'react'
import { useState } from 'react'

export const List = () => {

  const [task,setTask] = useState("")
  const [list,setList] = useState([])

  function AddList(){

    setList([...list,task]);
    setTask("")
  }

  function clearList(){
    setList([])
  }

  return (
    <>
       <input placeholder='Task' onChange={(e)=>setTask(e.target.value)}/> 
       <button onClick={AddList}>Add Task</button>
       <button onClick={clearList}>Clear Task</button>

       <ul>
        {list.map((item,index)=>(
          <li key={index}>{item}</li>
        ))}
       </ul>
    </>
  )
}