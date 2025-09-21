const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: String,
    admin: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
}); 

const listModel = mongoose.model('List', listSchema);
module.exports = listModel;