import React, { useEffect } from 'react';
import { BrowserRouter ,Route,Routes,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Chats from './components/chats';
import Maps from './components/maps';
import Posts from './components/posts';
import Viewmarkers from './components/viewmarkers'
import Announcements from './components/announcements';
import Frontpage from './pages/frontpage';
import Startpage from './pages/startpage';
import FrontpageAdmin from './pages/frontpageadmin';
import Homepage from './Home';
import Editprofile from './components/editprofile'
import Announcementsmultiling from './components/announcementsmultiling';
import Poll from './components/Poll';
import PollForm from './components/PollForm'; 
import PollList from './components/PollList';
import WeeklyAnalysisChart from './components/weeklyanalysis';
import { useLocation } from 'react-router-dom';
// import {logoutAlltabs} from './components/Navbar'

function App() {
  // const isLoggedIn = localStorage.getItem('loggedIn')

  // useEffect(()=>{
  //   logoutAlltabs()
  // },[]);
    
  

  const location = useLocation();
  const userState = location.state;
  const userDataa = userState ? userState.userData : null;
  const userData2 = (localStorage.getItem('userDataa'));

  console.log("userData",userData2);
  console.log("userData2",userData2);

  return (
    <div>
    

      <Routes>
 
      {(!userData2) && <Route path="/*" element={<Frontpage/>}/>}
        {/* <Route  index element={<Home/>}/> */}
        
        {<Route index element ={<Startpage />} />}
        {<Route path='/frontpage_user'  element={< Frontpage/>} />}
        {<Route path='/frontpage_admin'  element={< FrontpageAdmin/>} />}
        {userData2&&<Route path="/signup" element={<Signup />} />}
        {/* <Route path="/login" element={<Login />} /> */}
        {userData2&&<Route path= "/home" element={<Homepage />} />}
        {userData2&&<Route path="/chats" element={<Chats />} />}
        {userData2&&<Route path="/maps" element={<Maps />} />}
        {userData2&&<Route path="/viewmarkers" element={<Viewmarkers />} />}
        {userData2&&<Route path="/posts" element={<Posts />} />}
        
        {userData2&&<Route path="/announcements" element={<Announcements />} />}
        {userData2&&<Route path="/multilingannc" element={<Announcementsmultiling />} />}
        {userData2&&<Route path="/weeklyanalysis" element={<WeeklyAnalysisChart />} />}
        {userData2&&<Route path="/homes" element={<Homepage/>}/>}

        {userData2&&<Route path="/polls" element={<Poll/>} />}
     
        {userData2&&<Route path="/editprofile" element={<Editprofile/>}/>}

      </Routes>
   
    </div>
    
    
  );
 
}

export default App;
