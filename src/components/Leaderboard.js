import React, { useEffect, useRef, useState } from 'react'
import '../styles/history.css'
function Leaderboard(props) {
  const fetchonce = useRef(false);
  const [fetchstate,setfetchstate] = useState(null);
useEffect(()=>{
  if(!fetchonce.current){
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


// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
  return (
  
    <div className='historyparent'>  
  <div className='parenttable'>
      <div className='heading-history'>
       <h2>Top 10 Players</h2>
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
  </div>
  </div>
  </div>
  
)
}
        

export default Leaderboard
