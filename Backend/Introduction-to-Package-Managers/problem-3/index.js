const express = require('express');

const app = express();

app.get("/text",((req,res)=>{
    res.send("Test route is working!");
}))

app.get("/data",((req,res)=>{
    res.send("This is some sample data inside Data.txt.");
}))

app.listen(3000,(()=>{
    console.log("Server Started....")
}))

