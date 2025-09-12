function findMajorityElement(arr){
    let obj = {};
    let maxCount =1;
    let bag = "";
  for(let i=0;i<arr.length;i++){
      if(obj[arr[i]]){
        
       obj[arr[i]]++;
       
      }
     else{
       
       obj[arr[i]] = 1;
       
     }
     if(obj[arr[i]]>maxCount){
       
       maxCount = obj[arr[i]];
       return bag = arr[i];
     }
    }
    
  return null;
}
let arr =  [7, 7, 7, 7, 2, 2, 7, 7];
console.log(findMajorityElement(arr))