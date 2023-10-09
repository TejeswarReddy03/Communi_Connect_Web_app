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
import Homepage from './Home';
function App() {
  return (
    <div  >
    <BrowserRouter>
      <Routes>
        {/* <Route  index element={<Home/>}/> */}
        <Route index  element={< Frontpage/>} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path= "/home" element={<Homepage />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/viewmarkers" element={<Viewmarkers />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/homes" element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
    
  );
 
}

export default App;