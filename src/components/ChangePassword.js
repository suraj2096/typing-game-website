import React from 'react'
import img from '../images/carslider.jpg'
import img2 from '../images/carslider2.jpg'
import img3 from '../images/carslider3.jpg'
import img4 from '../images/carload4.jpg'
import user from '../images/userlogo.jpg'
import Logincontext from '../contexts/login/Logincontext'
import scroll from '../scoller'
import { useEffect,useState,useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const ChangePassword = (props) => {
  const location = useLocation();
  const params = useParams();
  const navigation = useNavigate();
    const {showMessage,setShowMessage} = useContext(Logincontext);
    const  [useremail,setuseremail] = useState({email:""});
    const  [userpass,setuserpass] = useState({password:'',cpassword:''});
    const sendemail = async (event)=>{
        event.preventDefault();
        let submit = document.querySelector('#continue');
        submit.innerText = "Please wait...";
        // here we will call forget password link generate api
        props.setprogress(10)
        const url = "http://localhost:8000/user/forgetpassword";
        const forpass = await fetch(url,{
          method:'post',
          mode: 'cors',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(useremail) 
        });
        props.setprogress(60)
        const jsondata = await forpass.json();
        props.setprogress(100);
        setShowMessage({...showMessage,display:true,message:jsondata.message,success:jsondata.success});
        submit.innerText = "Continue"
        setuseremail({email:''});

        setTimeout(() => {
          setShowMessage({...showMessage,[showMessage.success]:false});
        }, 3000);
        
    }

    //    // here we will change the password through api
    const changepass = async (event)=>{
          event.preventDefault();
          let submit = document.querySelector('#change');
        submit.innerText = "Please wait...";
        if(userpass.password !==userpass.cpassword){
          setShowMessage({...showMessage,display:true,message:"please enter the password and retype password same ",success:false});
          setuserpass({password:'',cpassword:''});
          setTimeout(() => {
            setShowMessage({...showMessage,[showMessage.success]:false});
          }, 3000);
          return;
        }
          const url = `http://localhost:8000/user/changePassword/change/${params.token}`;
          const changepass = await fetch(url,{
            method:'put', // here if we specify patch then cors error will generate .
            mode:'cors',
            headers:{
              'Content-Type':'application/json',
              'token':params.token
            },
            body:JSON.stringify(userpass) 
          });
          const jsondata = await changepass.json();
          submit.innerText = "Confirm"
          setShowMessage({...showMessage,display:true,message:jsondata.message,success:jsondata.success});
          setuserpass({password:'',cpassword:''});
          setTimeout(() => {
            setShowMessage({...showMessage,[showMessage.success]:false});
            navigation('/login');
          }, 3000);


    }

    const onchanges=(event)=>{
         setuseremail({email:event.target.value});
    }
    const onchange=(event)=>{
      setuserpass({...userpass,[event.target.name]:event.target.value});
 }
    useEffect(()=>{
        scroll();
      },[]);
  return (
    <div className='parentContainer'>
    <div className='childContainer'>
    <div className='firstChild'>
      <div className='slider'>
    <img src={img}  alt="car race"/>
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
        <h2>Change Password</h2>
      </div>
      <div className='formParent'>
          {location.pathname ==='/changepassword'?
        <form className='form'>
          <input type="email" name="email" value={useremail.email} placeholder='enter your Email Address' autoComplete="off" onChange={onchanges} />
          <button disabled={useremail.email===""} type='button' id="continue"  className='btn' onClick={sendemail}>Continue</button>
          </form>:
           <form className='form'>
             <input type="password" name="password" value={userpass.password} onChange={onchange} placeholder='Enter new password' autoComplete="off" />
            <input type="password" name="cpassword" value={userpass.cpassword} onChange={onchange}placeholder='Re-enter the password'  autoComplete="off"/>
            <button disabled={userpass.password===""||userpass.cpassword===""} onClick={changepass} type='button' id="change"  className='btn'>Confirm</button>
        </form> }
      </div>
    </div>
    </div>
  </div>
  )
}

export default ChangePassword
