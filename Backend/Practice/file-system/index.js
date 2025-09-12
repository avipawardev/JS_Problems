const fs = require('fs');

// fs.writeFile('example.txt', 'Hello, world!', (err) => {
//   if (err) throw err;
//   console.log('File has been saved!');
// });

// fs.appendFile('example.txt'," appended data",function  (err){
//     if(err) console.log(err);
//     else console.log('data appended!')
// })


// fs.rename('example.txt','renamed.txt', (err)=>{
//     if(err) console.log(err);
//     else console.log('file renamed!')
// })


// fs.unlink('renamed.txt',(err)=>{
//     if(err) console.log(err);
//     else console.log('file deleted!')
// })



//creating new folder

// fs.mkdir('newFolder',(err)=>{
//     if(err) console.log(err);
//     else console.log('new folder created!'  )
// })


//read files 

// fs.readdir('newFolder',{withFileTypes: true}, (err, files) => {
//     if (err) console.log(err);
//      else console.log(files)
// });



//delete folder

fs.rmdir('newFolder',{recursive: true},(err)=>{  ///fs.rm() new way updated
    if(err) console.log(err);
    else console.log('folder deleted!')
});






