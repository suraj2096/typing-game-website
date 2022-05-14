import React, {useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logincontext from '../contexts/login/Logincontext';
import '../styles/history.css'


function MatchHistory(props) {
    const navigate = useNavigate();
    const fetchonce = useRef(false);
    const [fetchstate,setfetchstate] = useState(null);
    const {setdislogout} = useContext(Logincontext);
useEffect(()=>{
 if(localStorage.getItem('auth-token')){
    if(!fetchonce.current){
        props.setprogress(10)
    let fetchallresutl = async ()=>{
        let url = 'http://localhost:8000/playerdetails/allresult'
        props.setprogress(60)
        let fetchhistory = await fetch(url,{
            method:'get',
            headers:{
                'auth-token':localStorage.getItem('auth-token')
            }
        });
        let fetchhistoryjson = await fetchhistory.json();
        if(fetchhistoryjson.success === 'false'){
            navigate('/login');
            props.setprogress(100);
            localStorage.clear();
            return;
        }
        else{
            props.setprogress(100)
            setfetchstate(fetchhistoryjson.fetchalldata);
         }
    }
    fetchallresutl();
    fetchonce.current = true;
}
 }
 else{
      navigate('/login')
      setdislogout(false);
 }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
    return (
    
      <div className='historyparent'>  
    <div className='parenttable'>
        <div className='heading-history'>
         <h2>Typing History</h2>
     </div>
       <div className="tables">
         {fetchstate === null?
        <table id="table">
            <thead>
            <tr className="first">
                <th>Play Date</th>
                <th>Speed</th>
                <th>Accuracy</th>
            </tr>
            </thead>
            </table>:
             <table id="table">
             <thead>
             <tr className="first">
                 <th>Play Date</th>
                 <th>Speed</th>
                 <th>Accuracy</th>
             </tr>
             </thead>
             <tbody>
        {fetchstate.map((element,index)=>{
            return(
                <tr key={index}>
                 <td>{new Date(element.matchdate).toLocaleString()}</td>
                 <td>{element.speed}</td>
                 <td>{element.accuracy}<b>%</b></td>
                 </tr>)
                 
                })}
                </tbody>
                </table>}
    </div>
    </div>
    </div>
    
  )
}

export default MatchHistory
