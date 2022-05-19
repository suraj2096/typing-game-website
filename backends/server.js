// here is owr server code created with the help of express 
const express = require('express');
const cors = require('cors');
const app = express();
const loginsignrouter = require('./routers/loginsignrouter')
const pararoute = require('./routers/pararoute');
const playerDetails = require('./routers/gamedetailsRoute');
const cargameroute = require('./routers/cargameRoute');
const payemtroute = require('./routers/payment');
const portNumber = 8000;
app.use(cors()) //Enable All CORS Requests 

// here we specify owr express app or server accept kar sakta hae json data use it before router
app.use(express.json());

// here we specify when user typw this url then the require will export that file code that is specfied here and the code in that file will execute and the code is whether the user is aldready registered in owr site or not
app.use('/user',loginsignrouter);
app.use('/para',pararoute);
// first game endpoint 
app.use('/firstgameplayerdetails',cargameroute);
// second game endpoint or resource 
app.use('/playerdetails',playerDetails);

//  craating a payment api is here we will give payment router here for handle this api payment
app.use('/payment',payemtroute);


// here owr server will listen 
app.listen(portNumber,()=>{
    console.log("your server will be listen on port 8000");
})