const mongoose = require('mongoose');

const taskModel = new mongoose.Schema({
    title : String,
    description: String,
    status: Boolean
});


module.exports = mongoose.model('Task',taskModel)