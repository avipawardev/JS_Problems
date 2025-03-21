function outerFunction(){
    let count = 0;
    return function innerfn(){
        count++;
        return count;
    }
};

let counter=outerFunction();
console.log(counter())
console.log(counter())
console.log(counter())