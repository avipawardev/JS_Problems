require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/db');
const doctorModel = require('./models/doctor.model');
const patientModel = require('./models/patient.model');
const consultationModel = require('./models/consultation.model');
const app = express();
app.use(express.json());


app.post('/doctors',async (req,res)=>{
    try {
        let doctor = await doctorModel.create(req.body);
        res.status(201).json(doctor)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/patients',async (req,res)=>{
    try {
        let patient = await patientModel.create(req.body);
        res.status(201).json(patient)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/consultations',async (req,res)=>{
    try {
        let consultation = await consultationModel.create(req.body);
        res.status(201).json(consultation)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/doctors/:id/patients', async (req,res)=>{
    try {
        let consultations = await consultationModel.find({doctorId: req.params.id, isActive: true})
            .populate('patientId', 'name age gender')
            .select('patientId consultedAt')
            .sort({consultedAt: -1})
            .limit(10);
        let patients = consultations.map(c => c.patientId);
        res.json(patients);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/patients/:id/doctors', async (req,res)=>{
    try {
        let consultations = await consultationModel.find({patientId: req.params.id, isActive: true})
            .populate('doctorId', 'name specialization')
            .select('doctorId consultedAt');
        let doctors = consultations.map(c => c.doctorId);
        res.json(doctors);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/doctors/:id/consultations/count', async (req,res)=>{
    try {
        let count = await consultationModel.countDocuments({doctorId: req.params.id, isActive: true});
        res.json({count});
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/patients', async (req,res)=>{
    try {
        let patients = await patientModel.find({gender: "Male", isActive: true});
        res.json(patients);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/consultations/recent', async (req,res)=>{
    try {
        let consultations = await consultationModel.find({isActive: true})
            .sort({consultedAt: -1})
            .limit(5);
        res.json(consultations);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/doctors/:id', async (req,res)=>{
    try {
        await doctorModel.findByIdAndUpdate(req.params.id, {isActive: false});
        await consultationModel.updateMany({doctorId: req.params.id}, {isActive: false});
        res.json({message: 'Doctor deleted successfully'});
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/patients/:id', async (req,res)=>{
    try {
        await patientModel.findByIdAndUpdate(req.params.id, {isActive: false});
        await consultationModel.updateMany({patientId: req.params.id}, {isActive: false});
        res.json({message: 'Patient deleted successfully'});
    } catch (error) {
        res.status(500).send(error.message)
    }
})


app.listen(3000,()=>{
    connectToDb();
    console.log("server is running on port 3000")
})