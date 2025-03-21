function createFunctionList() {
  let functions = [];

  for(let i = 0; i < 5; i++) {
    functions.push(function () {
      return "Index: "+i;
    });
  }
  return functions;
}
const functionList = createFunctionList();

console.log(functionList[0]()); // Expected Output: "Index: 0", Actual Output: "Index: 5"
console.log(functionList[1]()); // Expected Output: "Index: 1", Actual Output: "Index: 5"
console.log(functionList[2]()); // Expected Output: "Index: 2", Actual Output: "Index: 5"
console.log(functionList[3]()); // Expected Output: "Index: 3", Actual Output: "Index: 5"
console.log(functionList[4]()); // Expected Output: "Index: 4", Actual Output: "Index: 5"
