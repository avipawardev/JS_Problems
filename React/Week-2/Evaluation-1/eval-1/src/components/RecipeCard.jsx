import React, { useState } from 'react'
import { allRecipes } from '../context/recipes'
import { ListFormat } from 'typescript'

const RecipeCard = () => {
    const [fav,setFav] = useState(false)
    const recipes = allRecipes()
  return (
    <div style={{display:'grid', gridTemplateColumns:"repeat(4,1fr)",gap:'15px'}}>
    {recipes.map((ele)=><div style={{border:'1px solid white',padding:'10px'}}>
        <div>
            <img style={{width:'100%'}} src={ele.image} alt="" />
        </div>
        <h3>{ele.name}</h3>
        <p>Ingredients</p>
        <ul>{ele.ingredients.map((ele)=> <li>{ele}</li>)}</ul>
        <i onClick={()=>setFav(!fav)} class="ri-heart-line" style={{color:fav?'red':'black'}}></i>
    </div>)}
    {console.log(recipes)}
    </div>
  )
}

export default RecipeCard