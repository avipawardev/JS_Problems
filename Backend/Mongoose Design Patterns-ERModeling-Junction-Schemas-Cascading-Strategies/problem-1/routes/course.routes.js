const express = require('express');
const courseModel = require('../models/course.model');
const enrollmentModel = require('../models/enrollment.model');

const courseRouter = express.Router();

courseRouter.post('/create',async(req,res)=>{
    try {
        let course = await courseModel.create(req.body);
        res.status(201).json({message: 'course created successfully', course});   
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

courseRouter.get('/all/:id/students', async(req,res)=>{
    try {
        let enrollments = await enrollmentModel.find({courseId: req.params.id, isActive: true}).populate('studentId');
        // let students = enrollments.map(e => e.studentId).filter(s => s.isActive);
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

courseRouter.delete('/delete/:id',async (req,res)=>{
    try {
        let courseId = req.params.id;
        await courseModel.findByIdAndUpdate(req.params.id, {isActive: false});
        await enrollmentModel.updateMany({courseId: courseId}, {isActive: false});
        res.status(200).json({message: 'course deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = courseRouter;