let url = "https://fakestoreapi.com/products";

async function displayData(){
  let res = await fetch(url);
  let data = await res.json();
  console.log(data)

  let box = document.getElementById("box");
  box.innerHTML = "";
  
  data.forEach((ele)=>{
    let card = document.createElement("div");
    card.innerHTML=`
    <img src="${ele.image}" alt="${ele.title}">
    <div id="box2">
    <h2>Title : ${ele.title}</h2>
    <h3>Price : Rs. ${ele.price} /-</h3>
    </div>
    `
    box.appendChild(card)
  })

}

displayData()