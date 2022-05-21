import React, { useContext, useEffect,useState,useRef} from 'react'
import "../styles/carstore.css"
import cargarageimg from '../images/cargarage.png'
import Logincontext from '../contexts/login/Logincontext'
import {Link} from 'react-router-dom'
function CarGarage() {
  const car = useRef("");
  const {chooseCar,setChooseCar} = useContext(Logincontext);
  const [usercars,setUserCars] = useState([]);
  const equipbutton = ({selectedcar,index})=>{
      const equippedcar =  document.querySelector(`#equip${index}`);
      if( equippedcar === null){
         
        return ;
     }
     else{
      // console.log("hello");
      
      // console.log(equippedcar);
      // console.log(equippedcar);

     // minut changes here if change 
     const childrens =  document.querySelector('.selectcarscards').children;
     // console.log("hello");
     // console.log(childrens);
     // array.from() this from method will convert an iterable object to an array
     Array.from(childrens).forEach(element => {
       // console.log("inside children event");
       element.style.border= "";
       element.lastChild.innerText = "Equipped Now";
       element.lastChild.disabled = false;
       element.lastChild.background = 'black';
       element.lastChild.color ='white';
     });






      equippedcar.style.border = "2px solid black";
      equippedcar.lastChild.innerText = "Equipped";
      equippedcar.lastChild.disabled = true;
    document.querySelector('.displayactivecar').children[0].src = selectedcar;
    car.current = selectedcar;

    // setChooseCar(selectedcar);
      // console.log(setChooseCar);
     }
}
  const  onclickbutton = (event,selectedcar)=>{
    // console.log(event);
    const childrens =  document.querySelector('.selectcarscards').children;
    // console.log("hello");
    // console.log(childrens);
    // array.from() this from method will convert an iterable object to an array
    Array.from(childrens).forEach(element => {
      // console.log("inside children event");
      element.style.border= "";
      element.lastChild.innerText = "Equipped Now";
      element.lastChild.disabled = false;
      element.lastChild.background = 'black';
      element.lastChild.color ='white';
    });
    const parentactive = event.target.parentElement;
    parentactive.style.border = "2px solid black";
    event.target.innerText = "Equipped";
    event.target.disabled = true;
    document.querySelector('.displayactivecar').children[0].src = selectedcar;
    const sendeselected = async()=>{
      let url = "http://localhost:8000/payment/carequipped"
      await fetch(url,{
        method:"put",
        mode: 'cors',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('auth-token')
        },
        body:JSON.stringify({carimage:selectedcar,equipped:true})
      }
      )
      // console.log(data);
      // setChooseCar(selectedcar);
      car.current = selectedcar;
      // event.target.disabled = false;
      
    }          
    sendeselected();
    // console.log(chooseCar);



  }
//   useEffect(()=>{
//     const  getusercars = async()=>{
//   let url = "http://localhost:8000/payment/getusercars";
//   // props.setprogress(10)
//   let data = await fetch(url,{
//     method:"get",
//     headers:{
//       'auth-token':localStorage.getItem('auth-token')
//     }
//   });

//   let jsondata = await data.json();
//   // console.log(jsondata);
//   if(jsondata.getusercars !== null){
//     setUserCars(jsondata.getusercars.carpurcImage);
//     setChooseCar(car.current);
//   }
//   else{
//     setUserCars(jsondata);
//   }
//   }
//   getusercars();
//   // return;
// // eslint-disable-next-line
//   },[usercars]);
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

  let jsondata = await data.json();
  // console.log(jsondata);
  if(jsondata.getusercars !== null){
    setUserCars(jsondata.getusercars.carpurcImage);
    setChooseCar(car.current);
  }
  else{
    setUserCars(jsondata);
  }
  }
  getusercars();
  // return;
// eslint-disable-next-line
  },[car,chooseCar,setUserCars,usercars]);
//  console.log(usercars);
//  console.log(chooseCar);

  // on mouse out is 
// const mouseout = (event)=>{
//   event.target.style.color="white";
//   event.target.style.background="black";
// }
// // on mouse in is 
// const mouseover = (event)=>{
//   event.target.style.color="white";
//   event.target.style.background="#413d3d";
// }

// here we create equip button 


// },[]);
// console.log(chooseCar);

  return (
    <div className="parentcarbox">
      <div className='childcarbox'>
        <div className='childfirst'>
          <div className='childfirstheader'>
          <div className='contentfirstchild'>
                  <img src={cargarageimg} alt="car keys"/>
                   <h1>Active Car</h1>
               </div>
          <div className='navigationschildfirst'>
                   <Link className='smbtn' to="/cartypinggame">Start Race</Link>
                   <Link className="smbtn" to="/carpurchase">Buy Car</Link>
                   <a className="smbtn" href="#owncars">My Cars</a>
               </div>
          </div>
          <div className='displayactivecar'>
            {car.current===""?
            <div className='Nocarsavailabel'>
            <h1 className='show'>No vehicle equiped please equiped the vehicle</h1>
         </div>:
            <img src={car} alt="car here"/>
}
          </div>
        </div>
        <div className='childsecond'>
        <div className='childsecondheader' id="owncars">
          <div className='contentsecondchild'>
                  <img src={cargarageimg} alt="car keys"/>
                   <h1>My Cars</h1>
               </div>  
          <div className='navigationschildsecond'>
                   <Link className='smbtn' to="/cartypinggame">Start Race</Link>
                   <Link className="smbtn" to="/carpurchase">Buy Car</Link>
               </div>
          </div>
          <div>
          {(usercars !== null && usercars.length !== 0 && usercars.getusercars !== null)?
            <div className='selectcarscards'>
              {/* {usercars.forEach((element,index)=>{
                if(element.equipped){
                  
                <div className="cars" id={`equip${index}`} key={index}> 
                <img className="carsimg" src={element.cars} alt="car images"/>
              <button  onMouseOut={mouseout} onMouseOver={mouseover} onClick={(event,index)=>{equipbutton(event,element.cars)}}>Equipped Now</button>
              </div>
              equipbutton({index,selectedcar:element.cars})
              
                }
                else{
                  <div className="cars" id={`equip${index}`} key={index}> 
              <img className="carsimg" src={element.cars} alt="car images"/>
              <button  onMouseOut={mouseout} onMouseOver={mouseover} onClick={(event,index)=>{equipbutton(event,element.cars)}}>Equipped Now</button>
              </div>
                }
              })} */}
          {usercars.map((element,index)=>{
            if(element.equipped){
              // car.current = element.cars
              // console.log(element.equipped+index);
              return(
              <div className="cars" id={`equip${index}`} key={index}> 
              <img className="carsimg" src={element.cars} alt="car images"/>
              <button  onClick={(event)=>{onclickbutton(event,element.cars)}}>Equipped Now</button>
             {equipbutton({index,selectedcar:element.cars})}
              {/* {setTimeout(() => {
              }, 500)} */}
              </div>
              )
            }
            else{
              return(
                <div className="cars" id={`equip${index}`} key={index}> 
                <img className="carsimg" src={element.cars} alt="car images"/>
                <button onClick={(event)=>{onclickbutton(event,element.cars)}}>Equipped Now</button>
                </div>
              )
            }
           })
          }
            </div>:
             <div className='Nocarsavailabel'>
             <h1 className='show'>No cars purchase please purchase the cars</h1>
          </div>
            
           
        }
        </div>
      </div>
      </div>
      </div>

  )
}

export default CarGarage
