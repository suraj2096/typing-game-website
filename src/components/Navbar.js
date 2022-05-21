import React, { useContext,useEffect} from 'react'
import '../styles/navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import Logincontext from '../contexts/login/Logincontext'
import userlogo from '../images/logo.jpg'
// import { unstable_renderSubtreeIntoContainer } from 'react-dom';
function Navbar() {
  const navigate = useNavigate();
  let {name,setname,setShowMessage,dislogout,setdislogout,setdate,chooseGame} = useContext(Logincontext);
  // let logoutenabled = useRef(false);
    // this use effect for fetch user name 
    useEffect(()=>{
        // let authtoken = localStorage.getItem('auth-token');
        // if(!authtoken){
        //   navigate('/signup');
        //   return;
        //    }
          //  try{
              // let fetchdata = async()=>{
              //   const url = "http://localhost:8000/user/getuser";
              //   const data = await fetch(url,{
              //     method:'get',
              //      headers:{
              //        'auth-token':authtoken
              //      }
              //   });
              
                // const jsondata = await data.json();
              // if(jsondata.success==="false"){
              // setdislogout(false);
              // navigate('/login');
              // }
              //   setname(jsondata.username);     
              //   setdate(jsondata.joindate);
                
              // }
              // fetchdata();
    
          //  }
          //  catch(err){
          //   console.log(err);
          //  }
          if(localStorage.getItem('auth-token')){
          //  logoutenabled.current = true;
          let authtoken = localStorage.getItem('auth-token');
          let fetchdata = async()=>{
            const url = "http://localhost:8000/user/getuser";
            const data = await fetch(url,{
              method:'get',
               headers:{
                 'auth-token':authtoken
               }
            });
              const jsondata = await data.json();
            if(jsondata.success==="false"){
              setdislogout(false);
              navigate('/login');
              return;
              }
                setname(jsondata.username);     
                setdate(jsondata.joindate);
                
              }
              fetchdata();
          
          setdislogout(true);
          }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[name])
  const logout = ()=>{
    localStorage.clear();
    setname('');
    // logoutenabled.current = false;
    setdislogout(false);
    setShowMessage({display:true,message:"You are successfully logout!!",success:true})
    setdislogout(false);
    navigate('/login');
    setTimeout(() => {
      setShowMessage({display:false,message:'',success:false})
    }, 4000);
  }

  return (
    
    <nav className='navbar'>
        <h1>Type Rush</h1>
        <div className='secondChild'>
        <ul  style={{justifyContent:`${chooseGame==='cartype'?"left":"center"}`}}>
        <li><Link to='/' style={{padding:`${(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?"10px 12px":"10px 15px"}`}}>Home</Link></li>
        <li><Link to='/stats' style={{padding:`${(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?"10px 12px":"10px 15px"}`}}>Profile</Link></li>
        <li><Link to='/matchhistory' style={{padding:`${(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?"10px 12px":"10px 15px"}`}}>Match History</Link></li>
        <li><Link to='/leaderboard'>Leaderboard</Link></li>
        {(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?
        <li><Link to='/carpurchase' style={{padding:`${(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?"10px 12px":"10px 15px"}`}}>Car Purchase</Link></li>:
        <li></li>
  }
   {(chooseGame!=='' || chooseGame==="cartype") && chooseGame!=="simpletype" ?
        <li><Link to='/cargarage' style={{padding:`${chooseGame!=='' || chooseGame==="cartype"?"10px 12px":"10px 15px"}`}}>Car Garage</Link></li>:
        <li></li>
  }
        </ul>
        </div>
        {!dislogout && !localStorage.getItem('auth-token')?
        <div className='thirdChild'>
        <Link to="/login" className='btn'>Login</Link>
        <Link to="/signup" className='btn'>Sign Up</Link>
        </div>
:<div className='thirdChild'>
   {/* <div classname="logos"> */}
  <img  src={userlogo} alt="this is a user logo"/>
    {/* </div> */}
  <h2>{name}</h2>
  <button onClick={logout} className='btn button'>Log Out</button>
</div>}
    </nav>
  )
}

export default Navbar
