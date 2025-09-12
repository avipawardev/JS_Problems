function canFormPalindrome(str){
    let newstr = '';
    for(let i=str.length-1;i>=0;i--){
      newstr+=str[i]
    }
    return newstr == str;
  }
  console.log(canFormPalindrome('civic'))
  console.log(canFormPalindrome("ivicc"))
  