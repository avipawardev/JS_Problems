import React from 'react'

const ToggleButton = ({btnState,setBtnState}) => {
  return (
    <>
    <div style={{width:"200px" , height:"200px" ,backgroundColor:btnState?'green':'red'}}>
     <button onClick={()=> setBtnState(!btnState)}>{btnState?"ON":"OFF"}</button>
    </div>
    </>
  )
}

export default ToggleButton