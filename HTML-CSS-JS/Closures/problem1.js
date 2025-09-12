function outerFunction(){
    let message='hey buddy!';
    return function inner(){
        return(message);
    }
}
let fncall = outerFunction();
console.log(fncall());