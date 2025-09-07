const express = require('express');
const app = express();
app.use(express.json())

const ApiRouter = require('./routes/api');

app.use('/api',ApiRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"})
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});





