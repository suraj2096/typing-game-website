const express = require("express");
const razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const carBuyModel = require("../models/playerBuyCar");
const fetchdata = require("../middleware/authtoken");
const {key_id,key_secret} = require("../pass");

// payment send route
router.post('/orders',async(req,res)=>{
    try{
        let{amount} = req.body;
// first we create an object of razorpay or intantiate razorpay
const reazorpayInstance = new razorpay({
    key_id,
    key_secret
}) ;
// now we will create order like this
var options = {
    amount:amount*100,
    currency:"INR",
    receipt:crypto.randomBytes(10).toString("hex")
};
// here we will create otder:
reazorpayInstance.orders.create(options,(err,order)=>{
  if(err){
      console.log(err);
      return res.status(500).json({message:"something went wrong!!!"})
  }
  res.status(200).json({data:order});
})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
})

// payment verify route
router.post('/verify',async(req,res)=>{
try{
    const{razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    // console.log(req.body);
    // combine order_id and payment_id with vertical bar means string concatenation
    const sign = razorpay_order_id+"|"+razorpay_payment_id;

    // now we create a signature and razorpay provide a way to decrypt the signature
    const expectedSignature = crypto.createHmac("sha256",'ArvAJffTt9q0FgCc0kW5riFw').update(sign.toString()).digest("hex");
    
    // now we will check the signature that come from body with the signature that create  if two are same than payment done successfully otherwise failed
    if(razorpay_signature === expectedSignature){
        console.log("matched successfully");
        return res.status(200).json({message:"Payment verified successfully"})
    }
    else{
        return res.status(400).json({message:"Invalid Signature Sent"})
    }
}
catch(err){
    console.log(err);
    return res.status(500).json({message:"Internal server error"})
}
})


// now we create a route in which we store player car in its database
router.post('/carpurchase',fetchdata,async(req,res)=>{
    try{
    const {cars,index} = req.body;
    // console.log({cars});

    const checkcar = await carBuyModel.findOne({playerId:req.user});
    // console.log(checkcar);
  if(!checkcar){
      console.log("here");
    //   here {cars} we write car because to insert it in an array first time as an array of objects
      const insertcheckcar = await carBuyModel({playerId:req.user,carpurcImage:{cars,index}}).save();
      res.status(200).json({insertcheckcar});
}
else{
    // here we use $push because we want to insert array as an object after an existing array of object if we use $push operator   and if we donot use the $push then it will isert the object as first and remove the existing object in the array so we lost the previous data or object so we use push operator to insert data after an existing object .
      const updatecheckcar = await carBuyModel.findByIdAndUpdate(checkcar.id,{$push:{carpurcImage:{cars,index}}},{new:true});
      res.status(200).json({updatecheckcar});
  }
}
catch(error){
    console.log(error);
    res.status(400).json({error,message:"problem occur in your code"});
    
}
})

// here we will get the user purchase cars that he will own this is for that work api
router.get('/getusercars',fetchdata,async(req,res)=>{
    try{
        let getusercars = await carBuyModel.findOne({playerId:req.user}).select('-playerId');
        res.status(200).json({getusercars});

     }
     catch(err){
         res.status(500).json({message:"Something went wrong"});
     }
})

module.exports = router;