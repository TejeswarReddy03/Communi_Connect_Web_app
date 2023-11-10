import React, { useState } from 'react';
import axios from 'axios';
import {useLocation } from 'react-router-dom';
import {useRef } from "react";
import {motion} from 'framer-motion';
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

function Editprofile() {


  const navigate=useNavigate();

  const userDataa = JSON.parse(localStorage.getItem('userDataa'));

  const [userData, setUserData] = useState({
    username: userDataa.name,
    password: userDataa.password,
    pincode: userDataa.pincode,
    email: userDataa.email,
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to update the user data
      console.log(userData);
      const response = await axios.post('https://communiconnect-backend.onrender.com/api/updateUserProfile', userData);
  
      // Handle the response from the server
      console.log('Response from the server:', response.data);
  
      // Make a logout request and wait for it to complete
      await axios.get("https://communiconnect-backend.onrender.com/destroy-session");
      localStorage.removeItem('userDataa');
      // Now navigate to the desired page
      navigate('/');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  







  return (
    <div
    className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn('left','tween',0.2,1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}> Update your details</p>
        <h3 className={styles.sectionHeadText}>Edit Profile</h3>
        <form 
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Edit Username</span>
            <input 
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
           
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          
        
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Change Password</span>
            <input type="text"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
           
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Change Pincode</span>
            <input type="number"
            name="pincode"
            value={userData.pincode}
            onChange={handleInputChange}
           
            className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
      
          <button 
          type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shandow-md shadow-primary rounded-xl">
          Update Profile
          </button>
        </form>
      </motion.div>
      <motion.div
       variants={slideIn('right','tween',0.2,1)} 
       className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]" >
        <EarthCanvas/>

      </motion.div>
    </div>
   
  );
}

export default Editprofile;
