import React, { useState } from 'react'
import Logincontext from './Logincontext'

function LoginState(props) {
    const [showMessage,setShowMessage] = useState({display:false,message:"",success:false});
    const [name,setname] = useState('');
    const [dislogout,setdislogout] = useState(false);
    const [date,setdate] = useState();
    // this state for choosing the game and work on regarding the game that is choosing
    const [chooseGame,setChooseGame] = useState('');
    // choosen car
    const [chooseCar,setChooseCar] = useState(undefined);
  return (
   <Logincontext.Provider value={{showMessage,setShowMessage,name,setname,dislogout,setdislogout,date,setdate,chooseGame,setChooseGame,chooseCar,setChooseCar}}>
        {props.children}
   </Logincontext.Provider>
  )
}

export default LoginState
