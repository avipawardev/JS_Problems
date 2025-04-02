
let api = "https://jsonplaceholder.typicode.com/users";
//with Promise
function fetchData(){
    fetch(api)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log('something went wrong',err))
}
// fetchData()


async function fetchDatawithAsync(){
let data = await fetch(api);
let res =await data.json()
console.log(res)
}
fetchDatawithAsync()