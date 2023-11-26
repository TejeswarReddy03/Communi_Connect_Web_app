import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // Import navigate for routing
import Login from './login';
import Signup from './signup';
import Home from './home';
import Chats from '../components/chats';
import Maps from '../components/maps';
import Posts from '../components/posts';
import Announcements from '../components/announcements';
import * as Components from '../styles/Components';
import './frontpage.css';

function Frontpage() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignIn, toggleSignIn] = useState(true);
 const [errorloginuser,setErrorloginuser]=useState('');
 const [errorsignupuser,setErrorsignupuser]=useState('');
 const [errorsignuppincode,setErrorsignuppincode]=useState('');
 const [errorsignupconfrm,setErrorsignupconfrm]=useState('');
 const [isLoading,setIsloading]=useState(false);
 
  const [formDatalogin, setFormDatalogin] = useState({
    email: '',
    password: '',
  });
  const [formDatasignup, setFormDatasignup] = useState({
    user_name: '',
    email: '',
    pincode: '',
    password: '',
    confirm_password: '',
  });
  const YourLoadingSpinner = () => (
    // Replace this with your loading spinner component or any other loading animation
    <div className="loading-spinner">Loading...</div>
  );


  const handleSubmitSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsloading(true);
    try {
      // Make an HTTP POST request to your backend server
      const response = await axios.post("https://communiconnect-backend.onrender.com/create", formDatasignup); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful", response.data);
      setIsloading(false);
      setErrorsignupuser('');
      setErrorsignupconfrm('');
      setErrorsignuppincode('');
      
      toggleSignIn(true);
    } catch (error) {
      setIsloading(false);
      console.error('Registration failed', error);
      setErrorsignupuser('Entered fields are incorrect');
    }
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsloading(true);
    try {
      // Make an HTTP POST request to your backend server
      const adminCheckResponse = await axios.get(`https://communiconnect-backend.onrender.com/check-ifadmin?adminemail=${formDatalogin.email}`);
      const response = await axios.post("https://communiconnect-backend.onrender.com/create-session", formDatalogin); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful and this is the data of user", response.data);
      setErrorloginuser('');
      localStorage.setItem("userDataa", JSON.stringify(response.data));
      setIsloading(false);
      navigate('/home', { state: { userData: response.data} });


      // Optionally, you can redirect the user or perform other actions
    } catch (error) {
      setIsloading(false);
      console.error('Login failed', error);
      setErrorloginuser('Invalid username or password');
     
    }
  };

  const handleInputChangelogin = (event) => {
    const { name, value } = event.target;
    setFormDatalogin({
      ...formDatalogin,
      [name]: value,
    });
  };
  const handleInputChangesignup = (event) => {
    const { name, value } = event.target;
    setFormDatasignup({
      ...formDatasignup,
      [name]: value,
    });
    if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        // If the Pincode is not 6 digits, show an error message or prevent form submission
        // For this example, I'm setting an error message.
        setErrorsignuppincode('Pincode must be exactly 6 digits.');
      } else {
        // If the Pincode is valid, clear the error message
        setErrorsignuppincode('');
      }
    }
    if (name === 'confirm_password') {
      if (value !== formDatasignup.password) {
        setErrorsignupconfrm('Confirm password does not match with the original password');
      } else {
        setErrorsignupconfrm('');
      }
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div>
      <Components.Container >
        {isSignIn ? (
          <Components.SignInContainer signlnln={isSignIn.toString()}>
            <Components.Form onSubmit={handleSubmitLogin}>
            <Components.Title>Sign in</Components.Title>
              
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChangelogin}
                required // Make email field mandatory
              />
           
              <Components.Input
                 type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                onChange={handleInputChangelogin}
                required // Make password field mandatory
              />
               <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
              {errorloginuser&&<p>{errorloginuser}</p>}
            
            {isLoading?<div className="loading-spinner"></div>:<Components.Button type="submit">Sign in</Components.Button>}  
            </Components.Form>
          </Components.SignInContainer>
        ) : (
          <Components.SignUpContainer signlnln={isSignIn ? 'true' : 'false'}>
            <Components.Form onSubmit={handleSubmitSignUp}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                name="user_name"
                placeholder="user_name"
                onChange={handleInputChangesignup}
                required // Make name field mandatory
              />
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChangesignup}
                required // Make email field mandatory
              />
              <Components.Input
                type="number"
                name="pincode"
                placeholder="Pincode"
                onChange={handleInputChangesignup}
                required // Make email field mandatory
              />
               {errorsignuppincode&&<p>{errorsignuppincode}</p>}
              <Components.Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChangesignup}
                required // Make password field mandatory
              />
                <Components.Input
                type="password"
                name="confirm_password"
                placeholder="confirm_Password"
                onChange={handleInputChangesignup}
                required // Make password field mandatory
              />
              {errorsignupconfrm&&<p>{errorsignupconfrm}</p>}
             {errorsignupuser&&<p>{errorsignupuser}</p>}

             {isLoading?<div className="loading-spinner"></div>:<Components.Button type="submit">Sign Up</Components.Button>}              </Components.Form>
          </Components.SignUpContainer>
        )}

        <Components.OverlayContainer signlnln={isSignIn.toString()}>
          <Components.Overlay signlnln={isSignIn.toString()}>
            <Components.LeftOverlayPanel signlnln={isSignIn.toString()}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggleSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signlnln={isSignIn.toString()}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start the journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggleSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
      </div>
    
  );
}

export default Frontpage;
