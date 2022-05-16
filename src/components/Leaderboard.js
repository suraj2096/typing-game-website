import React, { useEffect, useRef, useState,useContext } from 'react'
import Logincontext from '../contexts/login/Logincontext';
import '../styles/history.css'
function Leaderboard(props) {
  const fetchonce = useRef(false);
  const [fetchstate,setfetchstate] = useState(null);
  const {chooseGame,name} = useContext(Logincontext);
useEffect(()=>{
  if(!fetchonce.current){
    if(chooseGame ==="cartype"){
      props.setprogress(10)
  let fetchallresutl = async ()=>{
      let url = 'http://localhost:8000/firstgameplayerdetails/readleaderboard'
       props.setprogress(60)
      let fetchleaderboard = await fetch(url,{
          method:'get'
      });
      let fetchleaderboardjson = await fetchleaderboard.json();
          props.setprogress(100)
          setfetchstate(fetchleaderboardjson.readleaderboard);
 }
  fetchallresutl();
  fetchonce.current = true;
}
else if(chooseGame ==="simpletype"){
  props.setprogress(10)
let fetchallresutl = async ()=>{
  let url = 'http://localhost:8000/playerdetails/readleaderboard'
  props.setprogress(60)
  let fetchleaderboard = await fetch(url,{
      method:'get'
  });
  let fetchleaderboardjson = await fetchleaderboard.json();
      props.setprogress(100)
      setfetchstate(fetchleaderboardjson.readleaderboard);
}
fetchallresutl();
fetchonce.current = true;
}
else{
  props.setprogress(10);
  setTimeout(() => {
    props.setprogress(100);
    
  }, 200);
  fetchonce.current = true; 
}
}


// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
  return (
    <div className='historyparent'>  
  <div className='parenttable'>
      <div className='heading-history'>
       <h2>Top 10 Players</h2>
   </div>
    {(()=>{
      console.log("hello");
      console.log(chooseGame);
     if(chooseGame ==="cartype"){
       return(
      <div className="tables">
      {fetchstate === null?
     <table id="table">
         <thead>
         <tr className="first">
         <th>Player Name</th>
             <th>Play Date</th>
             <th>Speed</th>
             <th>Accuracy</th>
             <th>Position</th>
         </tr>
         </thead>
         </table>:
          <table id="table">
          <thead>
          <tr className="first">
          <th>Player Name</th>
              <th>Play Date</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Position</th>
          </tr>
          </thead>
          <tbody>
     {fetchstate.map((element,index)=>{
         return(
             <tr key={index}>
              <td>{element.name}</td>
              <td>{new Date(element.date).toLocaleString()}</td>
              <td>{element.speed}</td>
              <td>{element.accuracy}<b>%</b></td>
              <td>{element.position}<b>/5</b></td>
              </tr>)
              
             })}
             </tbody>
             </table>}
 </div>)
     } 
    else if(chooseGame ==="simpletype"){
      return(
      // {console.log("inside simple type")}
      <div className="tables">
      {fetchstate === null?
     <table id="table">
         <thead>
         <tr className="first">
         <th>Player Name</th>
             <th>Play Date</th>
             <th>Speed</th>
             <th>Accuracy</th>
         </tr>
         </thead>
         </table>:
          <table id="table">
          <thead>
          <tr className="first">
          <th>Player Name</th>
              <th>Play Date</th>
              <th>Speed</th>
              <th>Accuracy</th>
          </tr>
          </thead>
          <tbody>
     {fetchstate.map((element,index)=>{
         return(
             <tr key={index}>
              <td>{element.name}</td>
              <td>{new Date(element.date).toLocaleString()}</td>
              <td>{element.speed}</td>
              <td>{element.accuracy}<b>%</b></td>
              </tr>)
              
             })}
             </tbody>
             </table>}
 </div>)
     } 
     else{
       return(
       <h1 style={{margin:"72px auto",textAlign:"center",fontSize:"2em",opacity:"0",animation:"leader 2s ease-in-out 1s infinite"}}>Please choose the game {name?name:""} then Leaderboard detail will show </h1>
       )
     }
    })()}
   
    </div>
  </div>
  
)
}
        

export default Leaderboard
