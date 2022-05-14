// this is a middleware that check or give the auth token
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'nowplaytyperush';
// here we will creating a middleware
const fetchdata = (req,res,next)=>{
 const authtoken = req.header('auth-token');
 if(!authtoken){
     res.status(401).json({success:"false"});
 }
 try{
     const data = jwt.verify(authtoken,JWT_SECRET);
     req.user = data.user.id;
     next();

 }
 catch(err){
     console.log(err);
    res.status(401).json({success:"false"});
 }
 
}
module.exports = fetchdata;