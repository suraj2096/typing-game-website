import React, { useContext, useEffect, useState } from 'react'
import '../styles/profile.css'
import flag from '../images/flag.png'
import speed from '../images/speed.png'
import target from '../images/target.png'
import rank from '../images/rank.png'
import Logincontext from '../contexts/login/Logincontext'
import { useNavigate } from 'react-router-dom'
const Stats = (props) => {
    const navigate = useNavigate();
    const [playerDetails,setPlayerDetails] = useState(null);
    const {setShowMessage,showMessage,setdislogout,chooseGame,name,date} = useContext(Logincontext);
    useEffect(()=>{
        if(localStorage.getItem('auth-token')&& chooseGame==="simpletype"){
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

else if(localStorage.getItem('auth-token')&& chooseGame==="cartype"){
    const fetchplayerdata = async ()=>{
        props.setprogress(10);
        let url = 'http://localhost:8000/firstgameplayerdetails/totalplayed';
     let fetchdata = await fetch(url,{
         method:'get',
         headers:{
             'auth-token':localStorage.getItem('auth-token')
         }
     });
     props.setprogress(60);
     let playerdatajson = await fetchdata.json();
     console.log(playerDetails);
     if(playerdatajson.success === 'false'){
         navigate("/");
         localStorage.clear();
         props.setprogress(100);
         return;
     }
     else{
         props.setprogress(100);
         setPlayerDetails(playerdatajson);
         console.log(playerDetails.lastspeedandAccuracyPosition.position)
 }
    }
    fetchplayerdata();
    return;
}

else{
    if(localStorage.getItem('auth-token')){
        navigate('/');
        setShowMessage({...showMessage,display:true,message:"Please choose the game which you want to play!",success:true});
        setTimeout(() => {
            setShowMessage({...showMessage,[showMessage.success]:false});
          }, 5000);
    }
    else{
    navigate('/login');
    setdislogout(false);
    return;
    }
}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // {console.log(chooseGame)}
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
                <p className='totalmatch'>{!playerDetails || !playerDetails.lastspeedandAccuracyPosition?0:playerDetails.lastspeedandAccuracyPosition.speed}<span>wpm</span></p>
                <p className='datehere'>Best {!playerDetails || !playerDetails.maxspeed?0:playerDetails.maxspeed.speed} WPM</p>
            </div>
            <div className='match'>
            <div className='round'>
                    <h2>Accuracy</h2>
                    <img className='img3' src={target} alt="target"/>
                </div>
                <p className='totalmatch'>{!playerDetails || !playerDetails.lastspeedandAccuracyPosition?0:playerDetails.lastspeedandAccuracyPosition.accuracy}<span>%</span></p>
                <p className='datehere'>Best {!playerDetails || !playerDetails.maxaccuracy?0:playerDetails.maxaccuracy.accuracy} %</p>
            </div>
            <div className='match'>
            <div className='round'>
                    <h2>Position</h2>
                    <img className='img3' src={rank} alt="rank"/>
                </div>
                <p className='totalmatch'>{!playerDetails || !playerDetails.lastspeedandAccuracyPosition?0:playerDetails.lastspeedandAccuracyPosition.position}<span>/5</span></p>
                {/* {console.log(playerDetails.lastspeedandAccuracyPosition)} */}
                <p className='datehere'>Best {!playerDetails || !playerDetails.bestposition?0:playerDetails.bestposition.position} /5</p>
            </div>
        </div>
      </div>
  
</div>
    }
    </>
  )
}

export default Stats
