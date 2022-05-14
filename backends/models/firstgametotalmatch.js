const mongoose = require('mongoose');
const schema = mongoose.Schema({
    player_Id:{
        type:mongoose.Types.ObjectId,
    },
    totalMatch:{
        type:Number
    }
});
const firsttotalMatchmodel = mongoose.model('firsttotalmatches',schema);
module.exports = firsttotalMatchmodel;