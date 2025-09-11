const express = require('express');
const connectToDB = require('./config/db');
const userModel = require('./models/userModel');
const app = express();
app.use(express.json());


app.post('/users',async (req,res)=>{
    try {
        let user = await userModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({msg:'something went wrong!',error})
    }
})

app.post('/users/:userId/address',async(req,res)=>{
    try{
        let {userId} = req.params;
        let user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({msg:'user not found'})
        }

        user.addresses.push(req.body)
        await user.save()
        res.status(201).json(user)
    }catch(error){
        res.status(401).json({msg:error})
    }
})

app.get('/user/:userId',async(req,res)=>{
    try{
        let {userId} = req.params;
        let user = await userModel.findById(userId)

        if(!user) return res.status(404).json({msg:'user not found'});

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({msg:'something went wrong'})
    }
})

app.listen(3000,()=>{
    connectToDB();
    console.log('Server is started on port 3000')
})