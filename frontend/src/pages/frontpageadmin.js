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

function FrontpageAdmin() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [isSignIn, toggleSignIn] = useState(true);
  const [errorwithpincode, setError] = useState('');
  const [errorwithemail, setErroremail] = useState('');
  const [errorsigninemail, setErrorsigninemail] = useState('');
  const [errorsigninadminid, setErrorsigninadminid] = useState('');
  const [errorsigninpwd, setErrorsigninpwd] = useState('');
  const [errorwithadminpincode, setErrorwithadminpincode] = useState('');
  const [errorwithcnfpwd, setErrorwithcnfpwd] = useState('');
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

  const handleSubmitSignUp = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (errorwithpincode) {
      // If there's an error, prevent the form submission
      return;
    }
    try {
      // Make an HTTP POST request to your backend server
      const response = await axios.post("http://localhost:8004/create_admin", formDatasignup); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful", response.data);
      setErroremail('');
      setErrorwithadminpincode('');
      setErrorwithcnfpwd('');

      toggleSignIn(true);
    } catch (error) {
      console.error('Registration failed', error);

      if (error.response.data.field === 'email') {
        setErroremail('AN ADMIN ALREADY EXISTS WITH SUCH EMAIL')
        setErrorwithcnfpwd('');
        setErrorwithadminpincode('');

      }
      else if (error.response.data.field === 'pincode') {
        setErrorwithadminpincode('AN ADMIN ALREADY EXISTS FOR THAT PINCODE');
        setErrorwithcnfpwd('');
        setErroremail('');

      }
      else if (error.response.data.field === 'cnfpwd') {
        setErrorwithcnfpwd('confirm password does not match with originalpassword');
        setErrorwithadminpincode('');
        setErroremail('');


      }
    }
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an HTTP POST request to your backend server
      //check if adminID matches
      const adminIDToCheck = formDatalogin.adminID;
      const adminemail = formDatalogin.email;
      const adminCheckResponse = await axios.get(`http://localhost:8004/check-adminID?adminID=${adminIDToCheck}&adminemail=${adminemail}`);
      const response = await axios.post("http://localhost:8004/create-session", formDatalogin); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful and this is the data of user", response.data);
      setErrorsigninadminid('');
      setErrorsigninemail('');
      setErrorsigninpwd('');
      navigate('/home', { state: { userData: response.data } });


      // Optionally, you can redirect the user or perform other actions
    } catch (error) {
      console.error('Login failed', error);
      if (error.response.data.field === 'noAdminEmail') {
        setErrorsigninemail('No such email exists')
        setErrorsigninadminid('');
        setErrorsigninpwd('');
      }
      else if (error.response.data.field === 'email') {
        setErrorsigninemail('No such email exists')
        setErrorsigninadminid('');
        setErrorsigninpwd('');
      }
      else if (error.response.data.field === 'adminid') {
        setErrorsigninadminid('Admin Id is incorrect');
        setErrorsigninpwd('');
        setErrorsigninemail('')

      }
      else {
        setErrorsigninpwd('Password is incorrect');
        setErrorsigninadminid('');
        setErrorsigninemail('')
      }
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
        setError('Pincode must be exactly 6 digits.');
      } else {
        // If the Pincode is valid, clear the error message
        setError('');
      }
    }
    if (name === 'confirm_password') {
      if (value !== formDatasignup.password) {
        setErrorwithcnfpwd('Confirm password does not match with the original password');
      } else {
        setErrorwithcnfpwd('');
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
              {errorsigninemail && <p>{errorsigninemail}</p>}
              <Components.Input
                type="text"
                name="adminID"
                placeholder="Admin ID"
                onChange={handleInputChangelogin}
                required // Make email field mandatory
              />
              {errorsigninadminid && <p>{errorsigninadminid}</p>}

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
              {errorsigninpwd && <p>{errorsigninpwd}</p>}
            
              <Components.Button type="submit">Sign In</Components.Button>
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
                type="number"
                name="pincode"
                placeholder="Pincode(NoAlphabets)"
                onChange={handleInputChangesignup}
                required // Make email field mandatory
              />
              {errorwithpincode && <p>{errorwithpincode}</p>}
              {errorwithadminpincode && <p>{errorwithadminpincode}</p>}
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChangesignup}
                required // Make email field mandatory
              />
              {errorwithemail && <p>{errorwithemail}</p>}
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
              {errorwithcnfpwd && <p>{errorwithcnfpwd}</p>}
              <Components.Button type="submit">Sign Up</Components.Button>
            </Components.Form>
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

export default FrontpageAdmin;
