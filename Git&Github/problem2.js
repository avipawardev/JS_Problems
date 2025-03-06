let n=19;
function recur(n){
    n=n.toString();
    let l = +n[0];
    let r = +n[1];
    for(let i=1;i<n;i++){
      
      let sum = l*l + r*r;
      if(sum == 1){
        return 'happy number';
      }else{
        sum=sum.toString();
        l = +sum[0];
        r = +sum[1]
      }
    }
};
console.log(recur(n))