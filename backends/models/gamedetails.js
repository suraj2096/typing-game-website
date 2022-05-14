const mongoose = require("mongoose");
const gameschema = new mongoose.Schema({
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
    show:{
        type:Number
    }
});
const GamesDetailsModel = new mongoose.model('playergamedetails',gameschema);
module.exports = GamesDetailsModel;