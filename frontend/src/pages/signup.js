import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';


function Signup(){
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        pincode: "",
        password: "",
        confirm_password: "",
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
          const response = await axios.post("http://localhost:8004/create", formData); // Replace "/api/register" with your backend endpoint
          console.log("Registration successful", response.data);
          navigate('/login', { state: { userData: response.data } });

    
          // Optionally, you can redirect the user or perform other actions
        } catch (error) {
          console.error("Registration failed", error);
        }
      };
    
      const handlelogin=async(e)=>{
        e.preventDefault();
        navigate('/login');
      }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg=white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" >
                        <strong>name</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="off"
                      name="user_name"
                      className="form-control rounded-10"
                      
                      onChange={handleInputChange}
                    />
                    </div>
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
                                <strong>pincode</strong>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter pincode"
                                autoComplete="off"
                                name="pincode"
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
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name = "confirm_password"
                                className="form-control rounded-10"
                                
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-10">
                            Register
                        </button>
                        
                </form>
                <p><center>Already Have an Account??</center></p>
                        <button onClick={handlelogin} className = "btn btn-default border w-100 bg-light rounded-10 text-decoration-none">
                            Login
                        </button>
            </div>
        </div>

    );
}
export default Signup;
