import React from 'react'

const FetchData = () => {
    async function fetchData(){
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json()
        console.log(data)
    }
  return (
    <div>
        <button onClick={fetchData}>Fetch Products</button>
    </div>
  )
}

export default FetchData