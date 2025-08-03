import React from 'react'

const ThemeBox = ({theme,children}) => {
  return (
    <div style={{backgroundColor:theme=='light'?'white':'black', color:theme=='light'?'black':'white',width:'50%',height:'300px'}}>
        {children}
    </div>
  )
}

export default ThemeBox