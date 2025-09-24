const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const authRouter = express.Router();

authRouter.post('/register',async(req,res)=>{
    try {
        const {email,password} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);

        if(email && password){
            let user = await userModel.create({email,password:hashedPassword})
            res.status(201).json({message:'user registered successfully!',user})
        }
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

authRouter.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body;
        let user = await userModel.findOne({email})
        let match = await bcrypt.compare(password,user.password)
        if(!user || !match){
            return res.status(401).json({message:'something went wrong'})
        }
        else{
            let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.status(201).json({message:'user login successfully!',token,user})
        }
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

module.exports = authRouter;