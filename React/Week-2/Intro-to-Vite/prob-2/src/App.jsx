import React, { useState } from 'react'
import ToggleButton from './ToggleButton'

const App = () => {
  const [btnState,setBtnState] = useState(false)
  return (
    <div>
      <ToggleButton btnState={btnState} setBtnState={setBtnState}/>
    </div>
  )
}

export default App