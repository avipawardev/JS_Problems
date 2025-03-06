
function calculatePrice(price,discount){
    if(!discount) return price * (1 - 10/100);
    if(!price || '') return 'Try Again!';
    if(price && discount) return Math.ceil(price * (1 - discount/100));
    
}
console.log(calculatePrice(100,90));