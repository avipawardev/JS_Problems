const fs = require('fs');


const readFileData=() => fs.readFile('./data.txt','utf-8',(err,data)=>{
   if(data){
     console.log(data)
   }else{
    console.log(err)
   }
})

const appendFileData = ()=> fs.appendFile('./data.txt',"This is Appended data",(err)=>{
    if(err){
        console.log('data not appended')
    }else console.log('Data is appended')
})

module.exports=readFileData;
module.exports = appendFileData






