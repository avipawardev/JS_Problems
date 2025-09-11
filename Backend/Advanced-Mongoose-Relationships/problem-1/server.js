const express = require('express');
const connectToDB = require('./config/db');
const userModel = require('./models/userModel');
const profileModel = require('./models/profileModel');
const app = express();
app.use(express.json());

app.post('/add-user',async(req,res)=>{
    try{
        let user = await userModel.create(req.body)
        await user.save()
        res.status(200).json(user);
    }catch(error){
       res.status(500).json(error.message)
    }
})


app.post('/add-profile',async (req,res)=>{
    try {
        let profile = await profileModel.create(req.body)
        await profile.save();
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.listen(3000, () => {
    connectToDB();
    console.log('Server is running on port 3000');
});

