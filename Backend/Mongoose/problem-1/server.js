const express = require('express');
const connectToDb = require('./config/taskDB');
const taskSchema = require('./models/taskSchema');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/create',async(req,res)=>{
    try {
        const task = await taskSchema.create(req.body);
        res.status(201).json({msg:'Task created successfully', task})
    } catch (error) {
        res.status(500).json({msg:'Failed to create task', error})
    }
})

app.get('/read',async(req,res)=>{
    try {
        let tasks = await taskSchema.find()
        res.status(200).json({msg:'Tasks fetched successfully', tasks})
    } catch (error) {
        res.status(500).json({msg:'Failed to fetch tasks', error})
    }
})

app.put('/update/:id',async(req, res)=>{
    try {
        let task = await taskSchema.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({msg:'Task updated successfully', task})
    } catch (error) {
        res.status(500).json({msg:'Failed to update task', error})
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        await taskSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({msg:'Failed to delete task', error})
    }
})


app.listen(3000, () => {
    connectToDb();
    console.log('Server is running on port 3000');
})



