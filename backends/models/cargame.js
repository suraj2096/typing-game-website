const mongoose = require('mongoose');
// here we will create a schema of car game
const carMatchSchema = new mongoose.Schema({
    player_Id:{
        type:mongoose.Types.ObjectId,
        ref:'signups'
    },
    speed:{
        type:Number,
    },
    accuracy:{
        type:Number,
 },
    matchdate:{
      type:Date,
      default:Date.now()
    },
    position:{
      type:Number
    },
    show:{
        type:Number
    }
});
const carMatchModel = new mongoose.model('playercargamedetails',carMatchSchema);
module.exports = carMatchModel;