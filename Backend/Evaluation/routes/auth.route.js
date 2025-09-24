const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

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

module.exports = authRouter;