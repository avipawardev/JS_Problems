function discount(items) {
  const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

const discountedPrice = items.map(ele=>{
    let newItem={...ele};
    if(items.category === 'Electronics'){
        newItem.price = items.price*0.9;
    }
return newItem;
});
const categoryTotal=discountedPrice.reduce((acc,cur)=>{
    return acc+cur.price*cur.quantity
},0);

let finaltotal = categoryTotal;
if(categoryTotal>1000){
    finaltotal=finaltotal*0.95;
}


  console.log(`Original cart Total: $${total}`);
  console.log(`After category discounts: $${categoryTotal}`);
  console.log(`Final total after all discounts: $${finaltotal}`)
}
let items = [
  { name: "Shirt", price: 25.99, quantity: 2, category: "Clothing" },
  { name: "Laptop", price: 999.99, quantity: 1, category: "Electronics" },
  { name: "Book", price: 12.5, quantity: 3, category: "Books" },
  { name: "Headphones", price: 49.99, quantity: 1, category: "Electronics" },
];
discount(items);
