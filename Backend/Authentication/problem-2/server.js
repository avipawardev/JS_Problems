require('dotenv').config()
const express = require('express');
const connectToDb = require('./config/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userModel = require('./models/user.model');
const Notesrouter = require('./routes/notes.route');
const app = express();
app.use(express.json());
app.use('/notes',Notesrouter);

app.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password,10);
    let user = await userModel.create({name,email,password:hashedPassword});
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login',async (req,res)=>{
    try {
        const {email, password} = req.body;
        let user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        let isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        let token = jwt.sign({userId:user._id},'shhh');
        res.status(200).json({token , user:{user:user.name,email:user.email,id:user._id }});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

app.listen(3000, () => {
    connectToDb();
  console.log('Server is running on port 3000');
});