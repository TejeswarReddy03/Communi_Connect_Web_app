import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <ul>
        <li><Link to="/chats">chats</Link></li>
        <li><Link to="/maps">maps</Link></li>
        <li><Link to="/posts">posts</Link></li>
        <li><Link to="/announcements">announcements</Link></li>
      </ul>
    </div>
  );
}

export default Home;
