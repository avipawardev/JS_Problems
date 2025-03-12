function firstUniqueChar(str){
    let obj = {};
    for(let i=0;i<str.length;i++){
      if(obj[str[i]]){
        obj[str[i]]++;
      }else{
        obj[str[i]]=1;
      }
    }
    let char = ''
    for(let key in obj){
      let flag = false;
      if(obj[key]==1){
        char = key
      }
    }
    return char?`${char}`:null;
  }
  console.log(firstUniqueChar("aabbccdeeff"))
  console.log(firstUniqueChar("xxyyzzaabb"))