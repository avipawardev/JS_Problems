function generatePassword(length, includeNumbers, includeSpecialChars) {
    let finalPassword =''
    if(length && includeNumbers && includeSpecialChars){
        
    }
    if(!length) return 'Length is required for creating a password!';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*abcdefghijklmnopqrstuvwxyz';
    let randomChars = ''
    for(let i=0;i<=chars.length;i++){
        randomChars+=chars[Math.ceil(Math.random()*chars.length)];
    }
return finalPassword;
}
// console.log(randomNum)

console.log(randomChars)
let randomNum = Math.ceil(Math.random()*100);
console.log(generatePassword(8,randomNum,randomChars))


