import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function Frontpage() {
  const navigate = useNavigate();
  const [isSignIn, toggleSignIn] = useState(true);
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

    try {
      // Make an HTTP POST request to your backend server
      const response = await axios.post("http://localhost:8004/create", formDatasignup); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful", response.data);
      toggleSignIn(true);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make an HTTP POST request to your backend server
      const response = await axios.post("http://localhost:8004/create-session", formDatalogin); // Replace "/api/register" with your backend endpoint
      console.log("Registration successful and this is the data of user", response.data);
     navigate('/home', { state: { userData: response.data } });


      // Optionally, you can redirect the user or perform other actions
    } catch (error) {
      console.error('Login failed', error);
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
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChangelogin}
                required // Make password field mandatory
              />
              <Components.Anchor href="#">Forgot your password?</Components.Anchor>
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

export default Frontpage;
