import axios from 'axios';
import React, { useState } from "react";
import { BrowserRouter ,Route,Routes } from 'react-router-dom';
import Home from './home';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
   
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


    
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an HTTP POST request to your backend server
      const response = await axios.post("http://localhost:8004/create-session", formData); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful and this is the data of user", response.data);
     navigate('/home', { state: { userData: response.data } });

      // Optionally, you can redirect the user or perform other actions
    } catch (error) {
      console.error("Registration failed", error);
    }
  };







  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg=white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" >
                    <strong>Email</strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter email"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-10"
                    
                    onChange={handleInputChange}
                />
                </div>  
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name = "password"
                        className="form-control rounded-10"
                        onChange={handleInputChange}

                        
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-10">
                    Login
                </button>

        </form>
     
      </div>
    </div>
  );
}

export default Login;
