require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDb = require('./config/db');
const userModel = require('./models/user.model');
const authMiddleware = require('./middleware/authMiddleware');
const listModel = require('./models/list.model');
const app = express();
app.use(express.json());

app.post('/signup', async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({name,email,password:hashedPassword});
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
        // console.log(token);
        res.status(200).json({token,user:{id:user._id,email:user.email,name:user.name}});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
app.post('/user', authMiddleware, async (req, res) => {
    const {name} = req.body;
    try {
       let list = await listModel.create({name, admin: req.user.userId})
        res.status(200).json({list});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.listen(3000,()=>{
    connectToDb();
    console.log('server is running on port 3000')
});






