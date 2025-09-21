const express = require('express'); 
const authMiddleware = require('../middlewares/authMiddleware');
const Notesrouter = express.Router();
const notesModel = require('../models/notes.model');
const userModel = require('../models/user.model');

Notesrouter.post('/create',authMiddleware, async (req,res)=>{
    try {
        let {title,content} = req.body;
        let user = await userModel.findById(req.user.userId);
        // console.log(user)
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        let note = await notesModel.create({title,content,createdBy:req.user.userId})
        res.status(201).json({message: 'Note created successfully', note});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' } )
    }
})

Notesrouter.get('/all-notes',authMiddleware,async(req,res)=>{
    try {
        let user = await userModel.findById(req.user.userId);
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        let notes = await notesModel.findOne({createdBy:req.user.userId})
        res.status(200).json({notes})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

Notesrouter.put('/update/:id',authMiddleware,async(req,res)=>{
    try {
        let user = await userModel.findById(req.user.userId);
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }
        let note = await notesModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message: 'Note updated successfully', note});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

Notesrouter.delete('/delete/:id',authMiddleware,async(req,res)=>{
    try {
        let user = await userModel.findById(req.user.userId);
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        let deletedNote = await notesModel.findByIdAndDelete(req.params.id,{new:true})
        res.status(201).json({message:'Notes Deleted successfully',deletedNote});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports = Notesrouter;