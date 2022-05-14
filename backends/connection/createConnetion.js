// here we crete a connection
const mongoose = require('mongoose');
const connect =  mongoose.connect('mongodb://localhost:27017/typeRush').then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log("database not connected due to: "+err);
});
module.exports = connect;