import React, { useContext, useEffect } from 'react'
import '../styles/cargame.css'
import Logincontext from '../contexts/login/Logincontext'



function CarTyping() {
  const {setChooseGame,chooseCar} = useContext(Logincontext);
  useEffect(()=>{
    setChooseGame("cartype");
    console.log(chooseCar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chooseCar])
  return (
    <>
    <div className="road">
    <div className="threestrips">
        <div className="road1"></div>
          <div className="road2"></div>
          <div className="road3"></div>
    </div>
        <div className="playerlane">
            <div className="com1">COM1</div>
            <div className="com2">COM2</div>
            <div className="p1">1P</div>
            <div className="com3">COM3</div>
        </div>
        <div className="whitestrip">
            <div className="startstrip"></div>
            <div className="endstrip"></div>
        </div>
        <div className="startline">
          <div className="strip1"></div>
          <div className="strip2"></div>
          <div className="strip3"></div>
          <div className="strip4"></div>
        </div>
        <img src="" alt="car1" className="car car1"/>
        <img src="" alt="car2" className="car car2"/>
        <img src="" alt="car3" className="car car3"/>
        <img src="" alt="car4" className="car car4"/>
    </div>

    <div className="circle"></div>
    
    <div className="incorrectshow">
        <p>Incorrect Character!</p>
    </div>
    <input type="text" className="input-field"/>
    <div className="speed">
        <span>0</span><small>wpm</small>
        <p>SPEED</p>
    </div>

    <div className="timer">
        <span>0</span><small>s</small>
        <p>TIME</p>
    </div>

    <button className="button1">Play</button>
    <button className="button2">Play Again</button>

    <div className="typing-texts">
        <p></p>
        </div> 
        
    <div id="fixbox">
        <div id="keyimg"></div>
       </div>  
       </>

  )
}

export default CarTyping
