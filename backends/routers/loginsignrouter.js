// signup endpoint code will be here or router 
// here we will require express in owr application and create an router object
const express = require('express');
const { body, validationResult} = require('express-validator');
const signupModel = require('../models/signup');
const authicateModel = require('../models/authticate');
const crypto = require("crypto"); // global package 
// const jwt = require("jsonwebtoken");
const router = new express.Router();
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

const send = require('../secure/mail');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'nowplaytyperush';
const fetchdata = require('../middleware/authtoken');
const forgetPassModel = require('../models/forgetpassword');

// here we speify router for signup page 
router.post('/signup',body('email',"please enter the correct format email").isEmail(),body('password',"Please enter the password more than 5 characters").isLength({ min: 5 }),body('name',"Please enter the name  more than 2 characters").isLength({ min: 2 }),async (req,res)=>{
    // here req.params return an object that is send from the url
    // let {useremail,password} = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        let {name,email,password} = req.body;
        // here we will find user that will in database but not verified then only send a message we send a link to your gmail
        let exitinguser = await signupModel.findOne({email});
        console.log(exitinguser);
        if(exitinguser.verified === false){
          // here we create authicate collection 
         let  authicateuser = await authicateModel({userId:exitinguser._id,token:crypto.randomBytes(32).toString("hex")}).save();
         const url = `http://localhost:3000/user/login/user/${authicateuser.userId}/verify/${authicateuser.token}`
        send(url,exitinguser,"verify your email","please click on the limk to verify your email ");
        res.status(201).json({success:true,message:"you are successfully sign up we send a link to you mail acccount to login "});   
        }
        else{
        let hashpassword = await bcrypt.hash(password,salt);
        password = hashpassword;
        let signupuser = await signupModel({name,email,password}).save();
        // here we create authicate collection 
        let  authicateuser = await authicateModel({userId:signupuser._id,token:crypto.randomBytes(32).toString("hex")}).save();
        const url = `http://localhost:3000/user/login/user/${authicateuser.userId}/verify/${authicateuser.token}`
        send(url,signupuser,"verify your email","please click on the limk to verify your email ");
        res.status(201).json({success:true,message:"you are successfully sign up we send a link to you mail acccount to login "});   
        }
    }
    catch(error){
         console.log(error);
         res.status(409).json({success:false,message:"You are already signup ",error});
    }
})

// here we specify route or endpoint for that come from gmail 

router.get('/login/user/:userId/verify/:token',async (req,res)=>{
  try{
    // here we will check the link 
    const user = await signupModel.findOne({_id:req.params.userId});
    // console.log(user);
    if(!user) return res.status(400).json({success:false,message:"Invalid link"});
     let {userId,token} = req.params;
    const authicateuser = await authicateModel.findOne({userId,token});
    if(!authicateuser) return res.status(400).json({success:false,message:"Invalid link"});

   await signupModel.findByIdAndUpdate(req.params.userId,{verified:true},{new:true});
   res.status(200).json({success:true,message:"you are verified successfully please login to continue..."});
   }
  
  catch(err){
    res.status(500).json({success:true,message:"something went wrong "});
  }
   
});
// here delete the token
router.delete('/login/user/:userId/verify/:token',async (req,res)=>{
  try{
    await authicateModel.deleteOne({userId:req.params.userId});
  }
   catch(err){
         console.log(err);
   }
   
});
// here we specify the endpoint for login page 
router.post('/login',async (req,res)=>{
  try{
    let {email,password} = req.body;
   const signupuser = await signupModel.findOne({email});
   if(!signupuser) return res.status(400).json({success:false,message:"Invalid email and password"});
   if(!bcrypt.compareSync(password,signupuser.password)) return res.status(400).json({success:false,message:"Invalid email and password "});
   if(!signupuser.verified){
    let  authicateuser = await authicateModel.findOne({userId:signupuser._id});
    const url = `http://localhost:3000/user/login/user/${authicateuser.userId}/verify/${authicateuser.token}`
    send(url,signupuser);
    res.status(201).json({success:true,message:"we will send a link to your email please verify "});   
   }
   const data = {
    user:{
      id:signupuser.id
    }
  }
  const jwtauth = jwt.sign(data,JWT_SECRET);
   res.status(200).json({success:true,message:"Login successfully we will redirect you to play page ",authtoken:jwtauth,name:signupuser.name,date:signupuser.date});  
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:true,message:"something went wrong sirji"});
  }
   
})

// here in this route we will get the user its using its auth token 
router.get('/getuser',fetchdata,async (req,res)=>{
  const user = req.user;
  const userData = await signupModel.findById(user).select('-password');
  res.status(200).json({username:userData.name,joindate:userData.date});
})
module.exports = router;


// here in this route we will take email in request or body and send a link to the user email for process of forget password
router.post('/forgetpassword',async (req,res)=>{
  try{
    const {email} = req.body;
    const check = await signupModel.findOne({email},{password:0,verified:0});
    if(!check){
      res.status(401).json({success:false,message:"You enter a wrong ceredentials"});
      return;
    }
    const fortoken = crypto.randomBytes(32).toString('hex');
    const fordata = await forgetPassModel({userid:check._id,token:fortoken}).save();
    const url = `http://localhost:3000/changePassword/change/${fordata.token}`
    send(url,check,"Reset Password","You can use the following link to reset your password: ");
    res.status(200).json({success:true,message:"We will send an email to you for change the passwprd"});
  }
  catch(err){
    console.log(err);
    res.status(500).send({success:false,message:"Already sent a link for change the password"});
  }
})

// here we will change the password 
router.put('/changePassword/change/:token',body('password',"Please enter the password more than 5 characters").isLength({ min: 5 }),async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
try{
  const token = req.headers.token;
  const checklink = await forgetPassModel.findOne({token});
  if(!checklink){
    res.status(401).json({success:false,message:"Sorry!!! this is not a valid link please check the link again "});
  }
  let {password} = req.body;
  password = bcrypt.hashSync(password,salt);
  await signupModel.findByIdAndUpdate(checklink.userid,{password});
  const a = await forgetPassModel.deleteOne({userid:checklink.userid});
  // console.log(a);
  res.status(200).send({success:true,message:"Your password will be changed successfully we will redirect you to login page..."});
}
catch(err){
         console.log(err);
         res.status(400).json({success:false,message:"Something went wrong ...."});
}
});