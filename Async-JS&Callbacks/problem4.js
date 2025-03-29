console.log("Begin");
setTimeout(() => {
  console.log("Timeout Task");
}, 0);


let firstPromise = Promise.resolve().then(() => {
    console.log("Promise Task");
  });
  
console.log("End");
