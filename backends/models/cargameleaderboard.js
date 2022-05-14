const mongoose = require('mongoose');
const carleaderboardSchema = new mongoose.Schema({
    player_Id:{
        type:mongoose.Types.ObjectId
    },
    speed:{
        type:Number,
    },
    accuracy:{
        type:Number
    },
    position:{
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
const carleaderboardModel = new mongoose.model('carleaderboards',carleaderboardSchema);
module.exports = carleaderboardModel;