let person ={
    name:'Johnny Depp',
    age:50
  }
  function personInfo(){
    return `My name is : ${this.name} and age is : ${this.age}`
  }
  
  console.log(personInfo.call(person))