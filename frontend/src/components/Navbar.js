import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { useNavigate,useLocation } from 'react-router-dom';
import { Button, Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import { logo } from '../assets'; // Assuming you have the logo import
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const userdata = localStorage.getItem('userDataa');
  
 // const location = useLocation();
 // const userstate = location.state;
 // const userdata = userstate.userData;
   const [active, setActive] = useState('');

  const handleclick = (i) => {
    navigate(`/${i}`, { state: { userData: userdata } });
  };

  const handlelogout = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get("https://communiconnect-backend.onrender.com/destroy-session");
      localStorage.removeItem('userDataa');
      console.log(res.data);
      localStorage.removeItem('loggedIn')
      navigate('/');
    } catch (error) {
      console.error('logout failed', error);
    }
  };

  return (
    <>
      <BootstrapNavbar
        className={`
    ${styles.paddingX}
    w-full flex items-center py-3 fixed top-0 z-20 bg-tertiary text-white`}
        expand="lg"
      >
        <Link
          to="/home"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            CommuniConnect
          </p>
        </Link>

        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggle-button" />


        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* {navLinks.map((link) => (
              <Nav.Link
                key={link.id}
                onClick={() => {
                  setActive(link.title);
                  handleclick(link.title);
                }}
                className={`${active === link.title ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
              >
                {link.title}
              </Nav.Link>
            ))} */}

            {/* NavDropdown for Announcements */}
            <Link
              to="/chats"
              onClick={() => {
                setActive('Chats');
                handleclick('chats');
              }}
              className={`nav-link text-white mynavbar-link hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
            >
              Chats
            </Link>
            <Link
              to="/posts"
              onClick={() => {
                setActive('Posts');
                handleclick('posts');
              }}
              className={`nav-link text-white mynavbar-link hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
            >
              Posts
            </Link>
            <Link
              to="/weeklyanalysis"
              onClick={() => {
                setActive('Weekly Analysis');
                handleclick('weeklyanalysis');
              }}
              className={`nav-link text-white mynavbar-link hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
            >
              Weekly Analysis
            </Link>
            <NavDropdown title={<span className="text-white mynavbar-link text-[18px]">Announcements</span>} id="announcements-dropdown" className="text-white mynav-dropdown">
              <NavDropdown.Item onClick={() => handleclick('announcements')}>
                Announcements
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleclick('multilingannc')}>
                Multilingual Announcements
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleclick('polls')}>
                Polls
              </NavDropdown.Item>
            </NavDropdown>

            {/* NavDropdown for Maps */}
            <NavDropdown title={<span className="text-white mynavbar-link text-[18px]">Maps</span>} id="maps-dropdown" className="text-white mynav-dropdown">
              <NavDropdown.Item onClick={() => handleclick('maps')}>
                Add Markers
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleclick('viewmarkers')}>
                View Markers
              </NavDropdown.Item>
            </NavDropdown>

            {/* NavDropdown for Profile */}
            <NavDropdown title={<span className="text-white mynavbar-link text-[18px]">Profile</span>} id="profile-dropdown" className="text-white mynav-dropdown">
              <NavDropdown.Item onClick={() => handleclick('editprofile')}>
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handlelogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
