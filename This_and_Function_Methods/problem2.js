let obj = {
    a:10,
    b:50
  }
  
  function multiplyNumbers(){
    return this.a * this.b;
  }
  
  console.log(multiplyNumbers.apply(obj))
  //output is : 500;