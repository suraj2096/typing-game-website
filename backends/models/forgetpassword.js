const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    userid:{
        // here we create a candidate key
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
const forgetPassModel = new mongoose.model("forgetpassword",Schema);
module.exports = forgetPassModel;