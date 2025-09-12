import React from 'react'

const Home = ({products}) => {
  return (
    <>
    {products.map(ele=>(
        <div style={{border : "1px solid white"}}>
            <p>{ele.title}</p>

        </div>
    ))}
    </>
  )
}

export default Home