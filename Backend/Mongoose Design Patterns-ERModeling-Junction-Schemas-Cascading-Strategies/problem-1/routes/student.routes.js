const express = require('express');
const studentModel = require('../models/student.model');
const enrollmentModel = require('../models/enrollment.model');

const studentRouter = express.Router();

studentRouter.post('/create',async(req,res)=>{
    try {
        let student = await studentModel.create(req.body);
        res.status(201).json({message: 'Student created successfully', student});   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
studentRouter.get('/all/:id/courses', async(req,res)=>{
    try {
        let enrollments = await enrollmentModel.find({studentId: req.params.id, isActive: true}).populate('courseId');
        // let courses = enrollments.map(e => e.courseId).filter(c => c.isActive);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

studentRouter.delete('/delete/:id', async(req,res)=>{
    try {
        await studentModel.findByIdAndUpdate(req.params.id, {isActive: false});
        await enrollmentModel.updateMany({studentId: req.params.id}, {isActive: false});
        res.json({message: 'Student deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = studentRouter;