// here we create a schema where we store the signup collection ka andar user ki object id and use that object id to verify  the user
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    userId:{
        // here we create a foreign key 
        type:mongoose.Types.ObjectId,
        required:true,
        // here refer to signup collection
        ref:'signups',
        unique:true
    },
    token:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        expires:3600 // expire in 1 howr
    }
});
const authicateModel = new mongoose.model("authicate",Schema);
module.exports = authicateModel;