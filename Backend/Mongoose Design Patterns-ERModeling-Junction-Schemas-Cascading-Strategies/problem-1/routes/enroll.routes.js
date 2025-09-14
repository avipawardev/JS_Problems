const express = require('express');
const enrollmentModel = require('../models/enrollment.model');

const enrollRoutes = express.Router();

enrollRoutes.post('/create',async(req,res)=>{
    try {
        let enroll = await enrollmentModel.create(req.body);
        res.status(201).json({message: 'enrolled', enroll});   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = enrollRoutes;