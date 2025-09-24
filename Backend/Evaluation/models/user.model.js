// Create a Mongoose schema for your User. It must include:
// email: String, required, unique, valid email format.
// password: String, required.
// passwordResetToken: String.
// passwordResetExpires: Date.

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    passwordResetToken:String,
    passwordResetExpires:Date
})

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;