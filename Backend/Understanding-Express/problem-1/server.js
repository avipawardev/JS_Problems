const express = require('express');
const app = express();

app.get('/home',(req,res)=>{
res.send("Welcome to Home Page")
})

app.get('/aboutus',(req,res)=>{
    res.json({ "message": "Welcome to About Us" })
})

app.get('/contactus',(req,res)=>{
    res.send('contact us page')
})

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});


app.listen(3000,()=>{
    console.log('server is running on 3000')
})