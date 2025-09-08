const taskModel = require('../models/task.model');

const getAllTasks = async (req,res)=>{
try {
    let tasks = await taskModel.find();
    res.status(200).json({msg:'Tasks fetched successfully', tasks})
} catch (error) {
    res.status(500).json({msg:'Failed to get tasks', error})
}
}

const taskUpdateById =async (req,res)=>{
try {
    let task = await taskModel.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({msg:'Task updated successfully', task})
} catch (error) {
    res.status(500).json({msg:'Failed to update task', error})
}
}

const addTask = async(req,res)=>{
    try {
        const task = await taskModel.create(req.body);
        res.status(201).json({msg:'Task created successfully', task})
    } catch (error) {
        res.status(500).json({msg:'Failed to create task', error})
    }
}

const deleteTaskById = async (req,res)=>{
try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.status(200).json({msg:'Task deleted successfully'})
} catch (error) {
    res.status(500).json({msg:'Failed to delete task', error})
}
}

module.exports = {getAllTasks,taskUpdateById,addTask,deleteTaskById}