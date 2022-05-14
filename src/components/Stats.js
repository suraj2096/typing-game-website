import React, { useContext, useEffect, useState } from 'react'
import '../styles/profile.css'
import flag from '../images/flag.png'
import speed from '../images/speed.png'
import target from '../images/target.png'
import Logincontext from '../contexts/login/Logincontext'
import { useNavigate } from 'react-router-dom'
const Stats = (props) => {
    const navigate = useNavigate();
    const [playerDetails,setPlayerDetails] = useState(null);
    const {setdislogout,chooseGame} = useContext(Logincontext);
    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
    const fetchplayerdata = async ()=>{
        props.setprogress(10);
        let url = 'http://localhost:8000/playerdetails/totalplayed';
     let fetchdata = await fetch(url,{
         method:'get',
         headers:{
             'auth-token':localStorage.getItem('auth-token')
         }
     });
     props.setprogress(60);
     let playerdatajson = await fetchdata.json();
     if(playerdatajson.success === 'false'){
         navigate("/");
         localStorage.clear();
         props.setprogress(100);
         return;
     }
     else{
         setPlayerDetails(playerdatajson);
         props.setprogress(100);
 }
    }
    fetchplayerdata();
}
else{
    navigate('/login');
    setdislogout(false);
    return;
}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    {console.log(chooseGame)}
    let {name,date} = useContext(Logincontext);
    return (
        <>
                {chooseGame ==="simpletype"?
        <div className='parentcontainer'>
        <div className='profile'>
            <div className='logo'>
            </div>
            <div className='name'>
                <p>{name}</p>
                <p>{new Date(date).toDateString()}</p>
            </div>
            <div className='resultbox'>
                <div className='match'>
                    <div className='round'>
                        <h2>Rounds</h2>
                        <img className='img1' src={flag} alt="rounds"/>
                    </div>
                    <p className='totalmatch'>{!playerDetails || !playerDetails.fetchtotalMatchesPlay?0:playerDetails.fetchtotalMatchesPlay.totalMatch}</p>
                    <p className='datehere'>{new Date(date).toDateString()}</p>
                </div>
                <div className='match'>
                <div className='round '>
                        <h2>Speed</h2>
                        <img className="img2"src={speed} alt="speed"/>
                    </div>
                    <p className='totalmatch'>{!playerDetails || !playerDetails.lastspeedandAccuracy?0:playerDetails.lastspeedandAccuracy.speed}<span>wpm</span></p>
                    <p className='datehere'>Best {!playerDetails || !playerDetails.maxspeed?0:playerDetails.maxspeed.speed} WPM</p>
                </div>
                <div className='match'>
                <div className='round'>
                        <h2>Accuracy</h2>
                        <img className='img3' src={target} alt="target"/>
                    </div>
                    <p className='totalmatch'>{!playerDetails || !playerDetails.lastspeedandAccuracy?0:playerDetails.lastspeedandAccuracy.accuracy}<span>%</span></p>
                    <p className='datehere'>Best {!playerDetails || !playerDetails.maxaccuracy?0:playerDetails.maxaccuracy.accuracy} %</p>
                </div>
            </div>
          </div>
      
    </div>:
    <div>
        hello
    </div>}
    </>
  )
}

export default Stats
