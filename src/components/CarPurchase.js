import React, { useEffect, useRef, useState } from 'react'
import '../styles/carpurchase.css';
import imagesset from '../imagesget/ImagesGet';
import keys from '../images/carkeys.png'
import axios from 'axios';
import success from '../images/success.png';
function CarPurchase(props) {
const [usercars,setUserCars] = useState([]);
const i = useRef(0);
// component did mount is used here means useeffect hook
// useEffect(()=>{
//   props.setprogress(10);
//   props.setprogress(50);
//   props.setprogress(100);
// // eslint-disable-next-line react-hooks/exhaustive-deps
// },[])
useEffect(()=>{
const  getusercars = async()=>{
let url = "http://localhost:8000/payment/getusercars";
// props.setprogress(10)
let data = await fetch(url,{
  method:"get",
  headers:{
    'auth-token':localStorage.getItem('auth-token')
  }
});
// props.setprogress(60);
let jsondata = await data.json();
// props.setprogress(100);
// console.log(jsondata.getusercars.carpurcImage);
if(jsondata.getusercars !== null){
  setUserCars(jsondata.getusercars.carpurcImage);
}
// console.log(jsondata.getusercars.)
// console.log(usercars);
}
getusercars();
// eslint-disable-next-line
},[usercars]);

// function to also use in cars and in buy button
const changes = ({event,index})=>{
  if(!event){

    
    let buybutton = document.querySelector(`.getname${index}`);
    // console.log(buybutton);
    // console.log(buybutton);
    // button related code
      buybutton.style.background = "grey";
      buybutton.style.color = "white";
      buybutton.style.cursor="";
      buybutton.disabled = true;
      // here we append the child inside the div
      const succelement = document.createElement('div');
      succelement.setAttribute("class","success");
      const img = document.createElement("img");
      img.setAttribute("src",`${success}`);
      img.setAttribute("class","successimg");
      succelement.appendChild(img);
      // console.log(succelement);
      const btnparent = buybutton.parentElement;
      // console.log(btnparent);
      btnparent.appendChild(succelement);
        // here we will set kuch properties of cars so stay tuned with us
        btnparent.style.zIndex = 0;
        btnparent.style.opacity=0.5;
        // console.log(index);
        // btnparent.children[index].classList.remove(".carsimg");
}
else{
  event.target.style.background = "grey";
  event.target.style.color = "white";
  event.target.style.cursor="";
  const succelement = document.createElement('div');
  succelement.setAttribute("class","success");
  const img = document.createElement("img");
  img.setAttribute("src",`${success}`);
  img.setAttribute("class","successimg");
  succelement.appendChild(img);
  // console.log(succelement);
  const btnparent = event.target.parentElement;
  btnparent.appendChild(succelement);
  // here we will set kuch properties of cars so stay tuned with us
  btnparent.style.zIndex = 0;
  btnparent.style.opacity=0.5;
  btnparent.children[index].classList.remove("carsimg")
  // event.target.classList.remove("getname");
  event.target.disabled = true;
}
}


// on mouse out is 
const mouseout = (event)=>{
  event.target.style.color="white";
  event.target.style.background="black";
}
// on mouse in is 
const mouseover = (event)=>{
  event.target.style.color="white";
  event.target.style.background="#413d3d";
}

// console.log(usercars);





//  here we will defing initPayment function
const initPayment = (data,carImage,event,index)=>{
const options = {
  key_id:'rzp_test_GUlwUydzhlFJqY',
  amount:data.amount,
  currency:data.currency,
  description:"Text Transaction",
  image:carImage,
  order_id:data.id,
  // this function will be called after successfull payment so  in thsi function we will call verify api
  handler:async(response)=>{
    try{
   const verifyurl = "http://localhost:8000/payment/verify";
   // this response will includer payment id , signature and order id as well
  const data = await axios.post(verifyurl,response);
  // console.log(data);
  // console.log(data.data.message);
  // console.log(data.status);
  // here we will disable the buy now button and change its value to already buy
  if(data.status === 200){
          // first we append an element inside 
          const sendcarpurcdata = async()=>{
            let url = "http://localhost:8000/payment/carpurchase";
            await fetch(url,{
              method:"post",
              headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
               },
               body:JSON.stringify({cars:carImage,index})
              }
            )
            // let jsondata = await data.json();
            // console.log(jsondata);
          }
          sendcarpurcdata();
           changes({event,index});
        
  }
    }
    catch(err){
    console.log(err);
    }
  },
  theme:{
    color:"yellow"
  }
};
// we will create razarpay instance by passing option like this
// document.querySelector("")
// event.target.style.backgroundColor = "grey";
// event.target.style.color= "white";
const rzp1 = new window.Razorpay(options);
// open checkout page
rzp1.open();
event.target.innerText = "Buy Now";

// event.target.classList.add("hover");
// event.target.style.backgroundColor = "grey";
// event.target.style.color= "white";
}





   const buyButton =async(event,carImage,carPrice,index)=>{
    try{
      event.target.innerText = "Please Wait ..";
      event.target.classList.remove("getname");
      event.target.style.backgroundColor = "black";
      event.target.style.color= "white";



    //  url of the order api
    const order_url = "http://localhost:8000/payment/orders";
  //  here we wil call to this url using axios
   const {data} = await axios.post(order_url,{amount:carPrice});
  // console.log(data); // here data will be an object that contain order_id and other informaton
   initPayment(data.data,carImage,event,index);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="parentpurchase">
         <div className='childpurchase'>
           <div className='firstchildpurchase'>
               <div className='contentfirstchild'>
                  <img src={keys} alt="car keys"/>
                   <h1>Car Store</h1>
               </div>
               <div className='navigationfirstchild'>
                   <a className='smbtn' href="/plays">Start Race</a>
                   <a className="smbtn" href="/stats">My Profile</a>
               </div>
           </div>  
           <div className='secondchildpurchase'>
            {imagesset.map(((element,index)=>{
              if(usercars === null || usercars.length === 0){
              return(
                   <div className='cars' key={element.id}> 
                    <img className="carsimg" src={element.image} alt="car images"/>
                    <h2><sup><i className="fa-solid fa-indian-rupee-sign"></i></sup> <b>{element.price}</b></h2>
                    <button className={`getname${index}`} onMouseOut={mouseout} onMouseOver={mouseover}     onClick={(event)=>{buyButton(event,element.image,element.price,index)}}>Buy Now</button>
                    </div>
                  )
                }
                  else{
                    // console.log(i);
                    // console.log(typeof usercars)
                    if(usercars.length-1>=i.current){
                      if(usercars[i.current].index === index){
                        if(usercars[i.current].cars === element.image){
                          // console.log("this is match index",i)
                            i.current = i.current + 1;
                          return(
                            <div className='cars' key={element.id}> 
                             <img className="carsimg" src={element.image} alt="car images"/>
                             <h2><sup><i className="fa-solid fa-indian-rupee-sign"></i></sup> <b>{element.price}</b></h2>
                             <button className={`getname${index}`} onMouseOut={mouseout} onMouseOver={mouseover}     onClick={(event)=>{buyButton(event,element.image,element.price,index)}}>Buy Now</button>
                             {changes({index})}
                             </div>
                           )
                          
                          }
                      }
                    }
                    else{
                      return(
                        <div className='cars' key={element.id}> 
                         <img className="carsimg" src={element.image} alt="car images"/>
                         <h2><sup><i className="fa-solid fa-indian-rupee-sign"></i></sup> <b>{element.price}</b></h2>
                         <button className={`getname${index}`} onMouseOut={mouseout} onMouseOver={mouseover}     onClick={(event)=>{buyButton(event,element.image,element.price,index)}}>Buy Now</button>
                         </div>
                       )
                      }
                      }
                      
                      return(
                        <div className='cars' key={element.id}> 
                         <img className="carsimg" src={element.image} alt="car images"/>
                         <h2><sup><i className="fa-solid fa-indian-rupee-sign"></i></sup> <b>{element.price}</b></h2>
                         <button className={`getname${index}`} onMouseOut={mouseout} onMouseOver={mouseover}     onClick={(event)=>{buyButton(event,element.image,element.price,index)}}>Buy Now</button>
                         </div>
                       )

            }))}
           </div>
         </div>
      
    </div>
  )
}

export default CarPurchase
