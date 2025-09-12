const express = require('express');
const connectToDB = require('./config/taskDB');
const taskSchema = require('./models/taskSchema');
const app = express();
app.use(express.json());

app.post('/create',async(req,res)=>{
    try {
        await taskSchema.create(req.body)
        res.status(200).send('Task Created Successfully')
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.get('/all-tasks',async(req,res)=>{
    try {
       let tasks =  await taskSchema.find();
        res.status(201).json({tasks},'data get success')
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.put('/update/:id',async(req,res)=>{
    try {
        let task = await taskSchema.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).json({msg:'Task updated successfully', task})
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        await taskSchema.findByIdAndDelete(req.params.id);
        res.status(201).json('Task deleted!')

    } catch (error) {
        res.status(400).send('something went wrong')
    }
})


app.listen(3000,()=>{
    connectToDB();
    console.log('Server is running on port 3000');
})