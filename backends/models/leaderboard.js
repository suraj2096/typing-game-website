const mongoose = require('mongoose');
const leaderboardSchema = new mongoose.Schema({
    player_Id:{
        type:mongoose.Types.ObjectId
    },
    speed:{
        type:Number,
    },
    accuracy:{
        type:Number
    },
    name:{
        type:String
    },
    date:{
     type:Date,
     default:Date.now()
    }
})
const leaderboardModel = new mongoose.model('leaderboards',leaderboardSchema);
module.exports = leaderboardModel;