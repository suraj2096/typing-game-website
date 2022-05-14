import React, { useContext } from "react";
import '../styles/navbar.css';
import Logincontext from "../contexts/login/Logincontext";
const DisplayMessage = ()=>{
    const {showMessage}  = useContext(Logincontext);
return(
    <div className="message" style={{display:`${!showMessage.display?"none":"block"}`,backgroundColor:`${!showMessage.success?"#ff8585":"#a1ff0f"}`}}>
     <p>{showMessage.message}</p>
    </div>
)
}
export default DisplayMessage;