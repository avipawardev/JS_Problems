function processProducts(arr){
    let names = arr.map((ele)=>ele)
    .forEach(ele=>{
        console.log(ele.price>50 ? `${ele.name} is above $50` : `${ele.name} is below $50`)
    });
}
let arr = [{ name: "Laptop", price: 1000 }, { name: "Mouse", price: 20 }];
processProducts(arr)








