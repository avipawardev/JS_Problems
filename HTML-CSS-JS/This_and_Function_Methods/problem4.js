function deepClone(obj){
    deepcopy = JSON.parse(JSON.stringify(obj));
    deepcopy.hobbies.push('coding')
    return deepcopy;
  }
  let obj = { name: "Alice", hobbies: ["reading", "traveling"] }
  console.log('original ',obj)
  console.log("deepcopy",deepClone(obj))

//   output : original  { name: 'Alice', hobbies: [ 'reading', 'traveling' ] }
//            deepcopy { name: 'Alice', hobbies: [ 'reading', 'traveling', 'coding' ] }