const express = require('express');
const connectToDB = require('./config/db');
const userModel = require('./models/user.model');
const app = express();
const bcrypt = require('bcrypt')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/signup',async(req,res)=>{
    try {
        const {name,email,password} =req.body;
        if(!name || !email || !password){
           return res.status(401).json({message:'All fields are required'})
        }
        let hashedpassword = await bcrypt.hash(password,10)
        let user = await userModel.create({name,email,password:hashedpassword})
        res.status(201).json({message:'User created successfully',user})
    } catch (error) {
        res.status(401).json({message:error.message})
    }
});

app.post('/signin',async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email || !password){
           return res.status(401).json({message:'All fields are required'})
        }
        let user = await userModel.findOne({email:email})
        if(!user){
            return res.status(401).json({message:'User not found'})
        }
        const compredpassword = await bcrypt.compare(password, user.password);
        if(!compredpassword){
            return res.status(401).json({message:'Invalid credentials'})
        }
        res.status(201).json({message:'User logged in successfully', user})
        
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

app.listen(3000,()=>{
    connectToDB()
    console.log('server is running')
})