let obj = {
    filterEvenNumbers:function(arr){
      return arr.filter((ele)=>ele%2==0);
    },
    sumOfArray:function(arr){
      return arr.reduce((acc,cur)=>acc+cur)
    },
    sortAndConcat:function(arr1, arr2){
      let sort1 = arr1.sort((a,b)=>a-b);
      let sort2 = arr2.sort((a,b)=>a-b);
      return sort1.concat(sort2)
    }
  }
  
  let arr =[15, 30, 45, 60, 75, 90];
  let arr2 =[15, 20, 35, 40, 45, 60];
  
  let filterdata = obj.filterEvenNumbers(arr);
  let findSum = obj.sumOfArray(arr);
  let sortConcat = obj.sortAndConcat(arr,arr2)
  
  console.log(filterdata)
  console.log(findSum)
  console.log(sortConcat)