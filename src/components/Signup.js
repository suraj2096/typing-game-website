import React, { useContext, useEffect, useState } from 'react'
import '../styles/login.css';
import img from '../images/carslider.jpg'
import img2 from '../images/carslider2.jpg'
import img3 from '../images/carslider3.jpg'
import img4 from '../images/carload4.jpg'
import user from '../images/userlogo.jpg'
import scroll from '../scoller'
import Logincontext from '../contexts/login/Logincontext';
const  Signup = ()=> {
  const {showMessage,setShowMessage} = useContext(Logincontext);
  const  [userdata,setuserdata] = useState({name:"",email:"",password:""});
  const sendData = async (event)=>{
    let submit = document.querySelector('#submit');
    submit.innerText = "Please wait...";
    const url = "http://localhost:8000/user/signup";
      event.preventDefault();
      // // here the code for if user not enter the same passsword in correct password field
      // if(userdata.password !== userdata.cpassword){
      //     setShowMessage({...showMessage,display:true,message:"please enter the password sane as correct password",success:false});
      //     setuserdata({email:"",password:"",cpassword:""});
      //     return;
      // }
      
        // here we send the data to the webserver here 
          let data = await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userdata) 
        });
        let fetchdata = await data.json();
        setShowMessage({...showMessage,display:true,message:fetchdata.message ||fetchdata.errors[0].msg ,success:fetchdata.success});
        
        submit.innerText = "Sign Up"
        setuserdata({name:"",email:"",password:""});
        setTimeout(() => {
          setShowMessage({...showMessage,[showMessage.success]:false});
        }, 5000);
      

  }

  const onchange = (e)=>{
     setuserdata({...userdata,[e.target.name]:e.target.value});
  }
   useEffect(()=>{
   scroll();
   },[]);
  return (
    <div className='parentContainer'>
      <div className='childContainer'>
      <div className='firstChild'>
        <div className='slider'>
      <img src={img}  alt=""/>
      <img src={img2}  alt=""/>
      <img src={img3}  alt=""/>
      <img src={img4}  alt=""/>
      </div>
      </div>
      <div className="navigation">
        <div className="first" >
            </div>
            <div className="second" >
            </div>
            <div className="third" >

            </div>
            <div className="forth" ></div>
        </div>
      <div className='secondChild'>
        <div className="image">
          <img src={user} alt='user'></img>
          <h2>Sign Up</h2>
        </div>
        <div className='formParent'>
          <form className='form' >
          <input type="text" className="email" name='name' value={userdata.name} id="exampleFormControlInput1" placeholder="Enter your name" onChange={onchange} autoComplete="off" />
            <input type="email" className="pass" name='email'  id="enteremail"  placeholder='enter your email' value={userdata.email} onChange={onchange} min="5" autoComplete="off"/>
            <input type="password" name="password" value={userdata.password} placeholder='enter your password'  onChange={onchange} min="5" autoComplete="off"/>
            <button disabled={userdata.name===""||userdata.email===""||userdata.password===""}type='submit' id="submit" className='btn' onClick={sendData}>Sign Up</button>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Signup