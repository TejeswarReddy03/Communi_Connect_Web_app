import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home() {

  const navigate=useNavigate();
  const location = useLocation();
  const userstate = location.state;
  
  const userdata=userstate.userData;

  function handleclick(i){
   navigate(`/${i}`, { state: { userData:userdata} });
  }


  const handlelogout = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      
      console.log("heyyyyy");
     
    const res=  await axios.get("http://localhost:8004/destroy-session"); 
      console.log(res.data);
      navigate('/');
     
    

      
    } catch (error) {
      console.error("logout failed", error);
    }
    
  };

  return (
    (
      <div>
        <h1>hello user {userdata.email} </h1>
        <h1>Welcome to the Homepage</h1>
       
        <button onClick={()=>handleclick("chats")}>chats</button>
        <button onClick={()=>handleclick("maps")}>maps</button>
        <button onClick={()=>handleclick("posts")}>posts</button>
        <button onClick={()=>handleclick("announcements")}>announcements</button>
        <button onClick={handlelogout}>logout</button>
        <button onClick={()=>handleclick("viewmarkers")}>viewmarkers</button>
        <button onClick={()=>handleclick("homes")}>home</button>
        <button onClick={()=>handleclick("editprofie")}>editprofile</button>
      </div>
    )
  );
}

export default Home;
