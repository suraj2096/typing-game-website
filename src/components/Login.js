import React, { useEffect,useState,useContext } from 'react'
import '../styles/login.css';
import img from '../images/carslider.jpg'
import img2 from '../images/carslider2.jpg'
import img3 from '../images/carslider3.jpg'
import img4 from '../images/carload4.jpg'
import user from '../images/userlogo.jpg'
import scroll from '../scoller'
import Logincontext from '../contexts/login/Logincontext';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
const  Login = ()=> {
  const navigate = useNavigate();
  const location = useLocation();
  let params = useParams();
  const {showMessage,setShowMessage,setdislogout,setname,setdate} = useContext(Logincontext);
  const  [userdata,setuserdata] = useState({email:"",password:""});

  // the function for request to  delete the token stored in the database 
  async function deletetoken(url){
    try{
      await fetch(url,{method:'delete'});   
     }
     catch(err){
       console.log(err);
     }
    };
  // this useeffect for slider execute only once when page reload because dependancy list is empty
  useEffect(()=>{
    scroll();
  },[]);


  // this useeffect for url that is user verified successfully
    useEffect(()=>{
    
    if(location.pathname ==="/login"){
        return;
    }
    else {
      // this method for request the server for verified the user 
      const verifieddata = async ()=>{
        let url = `http://localhost:8000/user/login/user/${params.userId}/verify/${params.token}`;
        try{
          let data = await fetch(url,{method:'GET'});
          let jsondata = await data.json();
          setShowMessage({...showMessage,display:true,message:jsondata.message,success:jsondata.success});
          setTimeout(() => {
            setShowMessage({...showMessage,[showMessage.success]:false});
            deletetoken(url);
          }, 3000);
        }
        catch(err){
            console.log(err)
        }
      
      };
      verifieddata();
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[location]); // here when the params variable change then useeffect will render or update the page 

    // -----------------------------------------------
   
  const sendData = async (event)=>{
    let submit = document.querySelector('#login');
    submit.innerText = "Please wait...";
    const url = "http://localhost:8000/user/login";
      event.preventDefault();
        // here we send the data to the webserver here 
        let data = await fetch(url,{
          method:'POST',
          mode: 'cors',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userdata) 
        });
        let fetchdata = await data.json();
        setShowMessage({...showMessage,display:true,message:fetchdata.message,success:fetchdata.success});
        submit.innerText = "Login"
        setuserdata({email:"",password:""});
        setTimeout(() => {
          setShowMessage({...showMessage,[showMessage.success]:false});
          if(fetchdata.success === true){
            navigate('/');
            localStorage.setItem('auth-token',fetchdata.authtoken);
            setdislogout(true);
            setname(fetchdata.name)
            setdate(fetchdata.date)
           }
        }, 2000);
      }
      const onchange = (e)=>{
        setuserdata({...userdata,[e.target.name]:e.target.value});
     }

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
          <h2>Login</h2>
        </div>
        <div className='formParent'>
          <form className='form'>
            <input type="email" name="email" value={userdata.email} onChange={onchange} placeholder='enter your Email' autoComplete="off" />
            <input type="password" name="password" value={userdata.password} onChange={onchange}placeholder='enter your Password'  autoComplete="off"/>
            <button disabled={userdata.email===""||userdata.password===""} type='button' id="login" onClick={sendData} className='btn'>Login</button>
          </form>
            <a href='/changepassword' className='anchor'>Forget password</a>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Login