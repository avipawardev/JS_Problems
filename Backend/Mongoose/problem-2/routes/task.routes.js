const express = require('express');
const { getAllTasks, taskUpdateById, deleteTaskById, addTask } = require('../controllers/task.controller');
const { validateTask } = require('../middlewares/task.middleware');

const taskRouter = express.Router();

taskRouter.get('/',getAllTasks);

taskRouter.post('/task',validateTask,addTask)

taskRouter.put('/update/:id',taskUpdateById)

taskRouter.delete('/delete/:id',deleteTaskById);


module.exports = taskRouter;