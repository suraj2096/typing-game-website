const express = require('express');
const GamesDetailsModel = require('../models/gamedetails');
const totalMatchmodel = require('../models/totalmatch');
const fetchdata = require('../middleware/authtoken'); 
const leaderboardModel = require('../models/leaderboard');
const route = express.Router();

// here we specify the endpoint for post 
route.post('/',fetchdata,async(req,res)=>{
  try{
    let checkplayermatch = await totalMatchmodel.findOne({player_Id:req.user});
   if(!checkplayermatch){
        // if user first time play the game then this code will execute and set the totalMatch to 1
        let {speed,accuracy} = req.body;
        
          const firstmatch = await totalMatchmodel({player_Id:req.user,totalMatch:1}).save();
          const data = await GamesDetailsModel({player_Id:req.user,speed,accuracy,show:1}).save();
          res.status(200).json({firstmatch,data});
     }
      else{
          // we first update the totalmatch tabel kae andar totalmatch koa 
          let updatetotalMatch = await totalMatchmodel.findByIdAndUpdate(checkplayermatch.id,{$inc:{totalMatch:1}},{new:true});
          // we will insert plauer data like speed and accuracy in gamesdetil collection
          let {speed,accuracy} = req.body;
          let data = await GamesDetailsModel({player_Id:req.user,speed,accuracy,show:updatetotalMatch.totalMatch}).save();
        //   await GamesDetailsModel.findByIdAndUpdate(data.id,{show:data.show+1});
          res.status(200).json({updatetotalMatch,data});
      }
    }
    catch(err){
      console.log("sorry there is some err"+err);
 }
});

// here we will get the record on the stats card of the total matches played and we also get the last match speed and accuracy
route.get('/totalplayed',fetchdata,async (req,res)=>{
    const player_Id = req.user;
    const fetchtotalMatchesPlay = await totalMatchmodel.findOne({player_Id}).select('totalMatch');
    // here we will get the maximum speed and maximum accuracy  in the all documents using the below query
    const maxspeed = await GamesDetailsModel.findOne().sort({speed:-1}).select('speed');
    const maxaccuracy = await GamesDetailsModel.findOne().sort({accuracy:-1}).select('accuracy');
    // here we will get the last match speed and accuracy
    const lastspeedandAccuracy = await GamesDetailsModel.findOne().sort({show:-1}).select('-player_Id');

    res.status(202).json({fetchtotalMatchesPlay,maxspeed,maxaccuracy,lastspeedandAccuracy});
});

// here we will get all the records and store it in the tabel that owr site show player history
route.get('/allresult',fetchdata,async (req,res)=>{
    const player_Id = req.user;
    // here we will fetch the resutl newest to oldest 1 is used for oldest to newest and -1 is used for newest to oldest
  const fetchalldata = await GamesDetailsModel.find({player_Id}).sort({show:-1}).limit(10);
  res.json({fetchalldata});
})

// here we will send the data to the leadboard collection
route.post('/sendleaderboard',fetchdata,async (req,res)=>{
  try{
    let checkplayerinleaderBoard = await leaderboardModel.findOne({player_Id:req.user});
   if(!checkplayerinleaderBoard){
     // if user is not in leaderboard then insert it into leaderboard
        let {speed,accuracy,name} = req.body;
          await leaderboardModel({player_Id:req.user,speed,accuracy,name}).save();
          res.status(200).send();
     }
      else{
         // here we will update the player speed and accuracy in leaderboard
          let {speed,accuracy} = req.body;
          await leaderboardModel.findByIdAndUpdate(checkplayerinleaderBoard.id,{speed,accuracy});
          res.status(200).send();
      }
    }
    catch(err){
      console.log("sorry there is some err"+err);
 }
})

// here we will get the leaderboard data 
route.get('/readleaderboard',async (req,res)=>{
  try{
    const readleaderboard = await leaderboardModel.find().sort({speed:-1,accuracy:-1}).limit(5);
    res.status(201).json({readleaderboard});
}
catch(err){
     console.log(err);
}
})




module.exports = route