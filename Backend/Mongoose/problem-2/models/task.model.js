const mongoose = require('mongoose');

const taskModel = new mongoose.Schema({
    title: String,
    description: String,
    priority: String,
    dueDate: Date,
    isCompleted: Boolean,
    completionDate:Date
})

module.exports = mongoose.model('Task',taskModel);