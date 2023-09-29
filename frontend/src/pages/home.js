import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const userstate = location.state;
  
  const userdata=userstate.userData;

  

  return (
    (
      <div>
        <h1>the userdata is {userdata.email} </h1>
        <h1>Welcome to the Homepage</h1>
        <ul>
          <li><Link to="/chats">chats</Link></li>
          <li><Link to="/signup">signup</Link></li>
          <li><Link to="/maps">maps</Link></li>
          <li><Link to="/posts">posts</Link></li>
          <li><Link to="/announcements">announcements</Link></li>
        </ul>
      </div>
    )
  );
}

export default Home;
