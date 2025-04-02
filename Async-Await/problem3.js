
let api = 'https://fakestoreapi.com/products';
async function fakeStoreApi(){
try{
let data = await fetch(api);
let res = await data.json();
   console.log(res);
   let sum = res.reduce((acc,cur)=>{
    return acc+cur.price;
   },0);
   console.log(sum)
}
catch(err){
console.log("Failed to fetch products. Please try again later")
}
};
fakeStoreApi()