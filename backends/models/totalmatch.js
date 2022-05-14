const mongoose = require('mongoose');
const schema = mongoose.Schema({
    player_Id:{
        type:mongoose.Types.ObjectId,
    },
    totalMatch:{
        type:Number
    }
});
const totalMatchmodel = mongoose.model('totalmatches',schema);
module.exports = totalMatchmodel;