function findMissingNumber(arr, N){
    let sum = 0;
   for(let i=1;i<=N;i++){
     sum+=i;
   }
   let sum2 =0;
   for(let i=0;i<arr.length;i++){
     sum2+=arr[i]
   }
   return sum - sum2;
  }
  
  console.log(findMissingNumber([1, 2, 4, 5], 5))
  console.log(findMissingNumber([3, 7, 1, 2, 8, 4, 5], 8))
  // Output: 3
  // Output: 6