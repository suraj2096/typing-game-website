import React, { useContext, useEffect } from 'react'
import '../styles/home.css'
import {Link} from 'react-router-dom'
import Logincontext from '../contexts/login/Logincontext'
function Home() {
  const {setChooseGame} = useContext(Logincontext);
  useEffect(()=>{
    setChooseGame("");
})
  let cargameonclick = ()=>{
         setChooseGame("cartype");
  }
  let typeonclick = ()=>{
    setChooseGame("simpletype");

  }
  return (
    <div className='grandparenthome'>
        <div className='parenthome'>
        <div className='firstchildhome'>
         <h1>Choose the game which you want to play </h1>
        </div>
        <div className='cardsofhome'>
         <div className='cardfirstchild'>
             <Link to="/cartypinggame" onClick={cargameonclick} className='abutton'>Play Now</Link>
             </div>   
         <div className='cardsecondchild'>
         <Link to="/play" onClick={typeonclick} className='abutton'>Play Now</Link>
         </div>
        </div>
    </div>
    </div>
  )
}

export default Home
