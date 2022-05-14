const mongoose = require('mongoose');
require('../connection/createConnetion'); // jere we use the createconnection.js file 

// now we will create a schema
const schema = mongoose.Schema({
  name:{
    type:String,
  },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
      type:String,
      required:true ,
    },
    date:{
     type:Date,
     default:Date.now()
    },
    verified:{
      type:Boolean,
      default:false
    }

});
// here we create a collection or tabel
const signupModel = mongoose.model('signup',schema);
module.exports = signupModel;
