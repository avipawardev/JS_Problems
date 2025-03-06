let n=197;
let temp = "";
let remender ;
while(n>0){
    remender = n%10;
  n= Math.floor(n/10)
temp+=remender
}
console.log(temp)