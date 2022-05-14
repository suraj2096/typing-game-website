const express = require("express");
const route = express.Router();
const fetchdata = require('../middleware/authtoken');
const carMatchModel = require('../models/cargame')
const firsttotalMatchmodel = require('../models/firstgametotalmatch');
const carleaderboardModel = require("../models/cargameleaderboard");
// here we will send the game data to the database using post 
route.post('/',fetchdata,async(req,res)=>{
    try{
      let checkplayermatch = await firsttotalMatchmodel.findOne({player_Id:req.user});
     if(!checkplayermatch){
          // if user first time play the game then this code will execute and set the totalMatch to 1
          let {speed,accuracy,position} = req.body;
          
            const firstmatch = await firsttotalMatchmodel({player_Id:req.user,totalMatch:1}).save();
            const data = await carMatchModel({player_Id:req.user,speed,accuracy,show:1,position}).save();
            res.status(200).json({firstmatch,data});
       }
        else{
            // we first update the totalmatch tabel kae andar totalmatch koa 
            let updatetotalMatch = await firsttotalMatchmodel.findByIdAndUpdate(checkplayermatch.id,{$inc:{totalMatch:1}},{new:true});
            // we will insert plauer data like speed and accuracy in gamesdetil collection
            let {speed,accuracy,position} = req.body;
            let data = await carMatchModel({player_Id:req.user,speed,accuracy,show:updatetotalMatch.totalMatch,position}).save();
          //   await GamesDetailsModel.findByIdAndUpdate(data.id,{show:data.show+1});
            res.status(200).json({updatetotalMatch,data});
        }
      }
      catch(err){
        console.log("sorry there is some err"+err);
   }
  });

// next we will get the record of user all game played 
route.get('/totalplayed',fetchdata,async (req,res)=>{
  const player_Id = req.user;
  const fetchtotalMatchesPlay = await firsttotalMatchmodel.findOne({player_Id}).select('totalMatch');
  // here we will get the maximum speed and maximum accuracy  in the all documents using the below query
  const maxspeed = await carMatchModel.findOne().sort({speed:-1}).select('speed');
  const maxaccuracy = await carMatchModel.findOne().sort({accuracy:-1}).select('accuracy');
  // here we will get the last match speed and accuracy and also position
  const lastspeedandAccuracyPosition = await carMatchModel.findOne().sort({show:-1}).select('-player_Id');
  // here we will get the player best position
 const bestposition  = await carMatchModel.findOne().sort({position:1}).select('position');
  

  res.status(202).json({fetchtotalMatchesPlay,maxspeed,maxaccuracy,lastspeedandAccuracyPosition,bestposition});
});

// here we will get all the records and store it in the tabel that owr site show player history
route.get('/allresult',fetchdata,async (req,res)=>{
  const player_Id = req.user;
  // here we will fetch the resutl newest to oldest 1 is used for oldest to newest and -1 is used for newest to oldest
const fetchalldata = await carMatchModel.find({player_Id}).sort({show:-1}).limit(10);
res.json({fetchalldata});
})

// here we will send the data to the leadboard collection
route.post('/sendleaderboard',fetchdata,async (req,res)=>{
  try{
    let checkplayerinleaderBoard = await carleaderboardModel.findOne({player_Id:req.user});
   if(!checkplayerinleaderBoard){
     // if user is not in leaderboard then insert it into leaderboard
        let {speed,accuracy,name,position} = req.body;
          await carleaderboardModel({player_Id:req.user,speed,accuracy,name,position}).save();
          res.status(200).send();
     }
      else{
         // here we will update the player speed and accuracy in leaderboard
          let {speed,accuracy,position} = req.body;
          await carleaderboardModel.findByIdAndUpdate(checkplayerinleaderBoard.id,{speed,accuracy,position});
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
    const readleaderboard = await carleaderboardModel.find().sort({speed:-1}).limit(5);
    res.status(201).json({readleaderboard});
}
catch(err){
     console.log(err);
}
})

  module.exports = route;