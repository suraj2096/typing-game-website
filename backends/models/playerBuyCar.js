// this is the module of player buy car
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    playerId:{
        // here we create a foreign key 
        type:mongoose.Types.ObjectId,
        required:true,
    },
    // here we create an array  of object means an array containing a set of object.............
    carpurcImage:[{cars:String,index:Number,equipped:{type:Boolean,default:false}}]
    // // here equipped will also go 
    // equipped:{
    //     type:Boolean,
    //     default:false
    // }
});
const carBuyModel = new mongoose.model("carimagebuy",Schema);
module.exports = carBuyModel;