import React, {useContext, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import Logincontext from '../contexts/login/Logincontext';
import '../styles/plays.css'

const  Plays=(props)=>{
    // this useeffect is used for typing game code so please distinguish very carefully
    let navigate = useNavigate();
    const {setdislogout,name,setChooseGame} = useContext(Logincontext);
    const callresetgame = useRef(null);
    useEffect(()=>{
        setChooseGame("simpletype");
        // here we will reset the game 
        setdislogout(false)
        const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".input-field"); 
let mistakeTag = document.querySelector(".mistake span"); 
let timeTag = document.querySelector(".time span b"); 
let wpmTag = document.querySelector(".wpm span"); 
let cpmTag = document.querySelector(".cpm span"); 
let tryAgainBtn = document.querySelector("button");

let charIndex =0,mistakes=0, isTyping=0 ,cpm = 0,playonce = false;
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let paragraph;
let wpm,accuracy;
async function randomParagraph(){
    props.setprogress(10);
     let url = 'http://localhost:8000/para';
     typingText.classList.add("gameover");
     typingText.innerHTML="Please wait...."
     let data = await fetch(url);
     props.setprogress(50);
    paragraph = await data.json()
    props.setprogress(100);
 let randomindex = Math.floor(Math.random()* paragraph.length);
 typingText.innerHTML="";
 typingText.classList.remove('gameover');
 paragraph[randomindex].split("").forEach(element => {
     let spantag = `<span>${element}</span>`
     typingText.innerHTML +=spantag
 });
    
    document.addEventListener("keydown",() => inpField.focus());
    typingText.addEventListener("click",() => inpField.focus());
    const characters = typingText.querySelectorAll("span");
    characters[0].classList.add("active");
}


function inittyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
            }
            if(typedChar == null){
                charIndex--;
                if(charIndex ===-1){
                    charIndex = 0;
                }
                if(characters[charIndex].classList.contains("incorrect")){
                    mistakes--;
                    if(mistakes === -1){
                        mistakes = 0;
                    }
                    mistakeTag.innerText = mistakes;
                }
                if(characters[charIndex].classList.contains("correct")){
                    cpm--;
                    if(cpm === -1){
                        cpm = 0;
                    }
                    cpmTag.innerText = cpm;
                }
                characters[charIndex].classList.remove("correct","incorrect");
            }
            else{
                if(typedChar === characters[charIndex].innerText){
                    characters[charIndex].classList.add("correct");
                    cpm++;
                    cpmTag.innerText = cpm;
                }
                else{
                    characters[charIndex].classList.add("incorrect");
                    mistakes++;
                    mistakeTag.innerText = mistakes;
                    }
                    charIndex++;
            }
            characters.forEach((span) => {span.classList.remove("active")});
            characters[charIndex].classList.add("active");
            wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            wpmTag.innerText = wpm;
    }else{
        inpField.value = "";
        clearInterval(timer);
        typingText.classList.add("gameover");
        typingText.innerHTML = "Game Over";
        // here we find accuracy 
        accuracy = ((charIndex - mistakes)/charIndex)*100;
        // cpmtag.innerText = Math.round(accuracy)+"";
        accuracy = Math.round(accuracy);
    
        if(!playonce){
            // here we send the data to the database
            if(localStorage.getItem('auth-token')){
            const sendplayerdata = async ()=>{
                let url = 'http://localhost:8000/playerdetails/';
            const data = await fetch(url,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({speed:wpm,accuracy}) 
            })
            const fetchdata = await data.json();
            if(fetchdata.success ==='false'){
                navigate('/login');
                localStorage.clear();
                return;
            }
            else{
            url = 'http://localhost:8000/playerdetails/sendleaderboard'
            await fetch(url,{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({speed:wpm,accuracy,name}) 
            })
        }
            }
            sendplayerdata();
        }
            playonce = true;
        }
        
    }

}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        typingText.classList.add("gameover");
        typingText.innerHTML = "Game Over";
        clearInterval(timer);
    }
}

function resetGame(){

    randomParagraph();
    charIndex = 0;
    mistakes = 0;
    isTyping =0;
    cpm = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
    timeLeft = maxTime;
    timeTag.innerText = 60;
    inpField.value = "";
    clearInterval(timer);
    playonce = false;
   
}
randomParagraph();
inpField.addEventListener("input",inittyping);
tryAgainBtn.addEventListener("click",resetGame);
callresetgame.current = resetGame;
        
        // else{
        //     navigate('/login');
            // setdislogout(false);
        // }
           
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);      
  return (
     <div className='parent'>
         <div className="wrapper">
        <div className="heading">
            Typing Speed test Game
        </div>
        <input type="text" className="input-field"/>
        <div className="content-box">
            <div className="typing-text">
                <p></p>
            </div>
            <div className="content">
                <ul className="result-details">
                    <li className="time">
                        <p>Time Left:</p>
                        <span><b>60</b>s</span>
                    </li>
                    <li className="mistake">
                        <p>Mistakes:</p>
                        <span>0</span>
                    </li>
                    <li className="wpm">
                        <p>WPM:</p>
                        <span>0</span>
                    </li>
                    <li className="cpm">
                        <p>CPM:</p>
                        <span>0</span>
                    </li>
                </ul>
                <button id="2" onClick={()=>{callresetgame.current()}}>Play Again</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Plays
