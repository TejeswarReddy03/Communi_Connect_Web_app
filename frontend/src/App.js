// src/App.js
import React from 'react';
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Chats from './components/chats';
import Maps from './components/maps';
import Posts from './components/posts';
import Announcements from './components/announcements';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route  index element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </BrowserRouter>
    </div>
    //<h1>this is app</h1>
  );
}

export default App;
