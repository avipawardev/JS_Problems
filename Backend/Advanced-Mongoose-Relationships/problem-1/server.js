const express = require('express');
const connectToDB = require('./config/db');
const userModel = require('./models/userModel');
const profileModel = require('./models/profileModel');
const app = express();
app.use(express.json());

app.post('/add-user', async (req, res) => {
    try {
        const user = await userModel.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.post('/add-profile', async (req, res) => {
    try {
        const user = await userModel.findById(req.body.user);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const profile = await profileModel.create(req.body);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find().populate('profile');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.get('/profiles', async (req, res) => {
    try {
        const profiles = await profileModel.find().populate('user');
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.listen(3000, () => {
    connectToDB();
    console.log('Server is running on port 3000');
});

