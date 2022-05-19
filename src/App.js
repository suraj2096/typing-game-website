import Navbar from "./components/Navbar";
import './App.css'
import {
  BrowserRouter as Router,
 Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DisplayMessage from "./components/DisplayMessage";
import Footer from "./components/footer";
import LoginState from "./contexts/login/LoginState";
import Notfound from "./components/Notfound";
import Stats from './components/Stats'
// import Play from "./components/play";
import ChangePassword from "./components/ChangePassword";
import Plays from "./components/Plays";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";
import MatchHistory from "./components/MatchHistory";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/home";
import CarPurchase from "./components/CarPurchase";


function App() {
  const [progress,setprogress] = useState({progress:0});
  return (
    <div>
      <LoginState>
    <Router>                        
     <Navbar/>
     <LoadingBar
      height={3.5}
      loaderSpeed={500}
        color='#f11946'
        progress= {progress}
      />
     <DisplayMessage/>
     <Routes>
          <Route path="/matchhistory" element={<MatchHistory setprogress={setprogress} />}/>
          <Route path="/leaderboard" element={<Leaderboard setprogress={setprogress} />}/>
          <Route path="/play" element={<Plays setprogress={setprogress}/>}/>
          
          <Route path="/" element={<Home/>}/>

          {/* <Route path="/stats" element={<Stats setprogress={setprogress}/>}/> */}
          <Route path="/stats" element={<Stats setprogress={setprogress}/>}/>
          {['/login','/user/login/user/:userId/verify/:token'].map((elementpath,index)=>{
             return  <Route key={index} path={elementpath} element={<Login />}/>
          })}
          <Route  path="/signup" element={<Signup />}/>
          {['/changepassword','/changePassword/change/:token'].map((element,index)=>{
              return <Route key={index} path={element} element={<ChangePassword/>}/>
          })}
          <Route  path="/changepassword" element={<ChangePassword setprogress={setprogress}/>}/>
          <Route  path="/carpurchase" element={<CarPurchase setprogress={setprogress}/>}/>
          
          <Route  path="*" element={<Notfound />}/>

        </Routes>
        <Footer/>
    </Router>
    </LoginState>
    </div>
  );
}

export default App;
