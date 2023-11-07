import React from 'react';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
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
import WeeklyAnalysisChart from './components/weeklyanalysis';
function App() {
  return (
    <div  >
    <BrowserRouter>
      <Routes>
        {/* <Route  index element={<Home/>}/> */}
        <Route index element ={<Startpage />} />
        <Route path='/frontpage_user'  element={< Frontpage/>} />
        <Route path='/frontpage_admin'  element={< FrontpageAdmin/>} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path= "/home" element={<Homepage />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/viewmarkers" element={<Viewmarkers />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/multilingannc" element={<Announcementsmultiling />} />
        <Route path="/weeklyanalysis" element={<WeeklyAnalysisChart />} />
        <Route path="/homes" element={<Homepage/>}/>
        <Route path="/editprofile" element={<Editprofile/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
    
  );
 
}

export default App;