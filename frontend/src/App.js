import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import Chats from './components/chats';
import Maps from './components/maps';
import Posts from './components/posts';
import Announcements from './components/announcements';
import * as Components from './styles/Components';


function App() {
  const [signIn, toggle] = React.useState(true);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;