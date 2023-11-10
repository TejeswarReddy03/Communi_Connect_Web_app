import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { useLocation } from 'react-router-dom';
import { logo, menu, close } from '../assets';
import { useNavigate } from 'react-router-dom';
import {BroadcastChannel} from 'broadcast-channel'
import { Button, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const userdata = localStorage.getItem('userDataa');

  const handleclick = (i) => {
    navigate(`/${i}`, { state: { userData: userdata } });
  };

  const handlelogout = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get("http://localhost:8004/destroy-session");
      localStorage.removeItem('userDataa');
      console.log(res.data);
     localStorage.removeItem('loggedIn')
      navigate('/');
    } catch (error) {
      console.error('logout failed', error);
    }
  };

  const [active, setActive] = useState('');
  const [showAnnouncementsNavbar, setShowAnnouncementsNavbar] = useState(false);
  const [showProfileNavbar, setShowProfileNavbar] = useState(false);
  const [showMapsNavbar, setShowMapsNavbar] = useState(false);

  return (
    <>
      <nav
        className={`
          ${styles.paddingX}
          w-full flex items-center py-3 fixed top-0 z-20 bg-tertiary`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

          <Link
            to="/"
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

          <ul className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? 'text-white' : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => {
                  setActive(link.title);
                  handleclick(link.title);
                }}
              >
                {link.title}
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2 ml-auto">
          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => setShowAnnouncementsNavbar(!showAnnouncementsNavbar)}
          >
            Announcements
          </Button>
          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => setShowMapsNavbar(!showMapsNavbar)}
          >
            Maps
          </Button>

          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => handleclick('chats')}
          >
            Chats
          </Button>

          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => handleclick('posts')}
          >
            Posts
          </Button>

          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => handleclick('weeklyanalysis')}
          >
            WeeklyAnalysis
          </Button>

          <Button
            variant="outline-light"
            className="text-[18px] font-medium cursor-pointer"
            onClick={() => setShowProfileNavbar(!showProfileNavbar)}
          >
            Profile
          </Button>
        </div>
        </div>
      </nav>

      {showAnnouncementsNavbar && (
        <BootstrapNavbar
          className={`${styles.paddingX} w-full fixed top-0 z-20`}
          bg="tertiary"
          expand="lg"
        >
          <div className="container">
            <Link
              to="/"
              className="navbar-brand text-white text-[18px] font-bold cursor-pointer flex"
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
                setShowAnnouncementsNavbar(false);
              }}
            >
              CommuniConnect
            </Link>

            <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />

            <BootstrapNavbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link
                  onClick={() => {
                    handleclick('announcements');
                    setShowAnnouncementsNavbar(false);
                  }}
                  className={`${
                    active === 'announcements' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  Announcements
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    handleclick('multilingannc');
                    setShowAnnouncementsNavbar(false);
                  }}
                  className={`${
                    active === 'multilingannc' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  MultilingualAnnouncements
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    handleclick('polls');
                    setShowAnnouncementsNavbar(false);
                  }}
                  className={`${
                    active === 'polls' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  Polls
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    setShowAnnouncementsNavbar(false);
                  }}
                  className="text-white text-[18px] font-medium cursor-pointer"
                >
                  Close
                </Nav.Link>
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>
        </BootstrapNavbar>
      )}

      {showMapsNavbar && (
        <BootstrapNavbar
          className={`${styles.paddingX} w-full fixed top-0 z-20`}
          bg="tertiary"
          expand="lg"
        >
          <div className="container">
            <Link
              to="/"
              className="navbar-brand text-white text-[18px] font-bold cursor-pointer flex"
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
                setShowMapsNavbar(false);
              }}
            >
              CommuniConnect
            </Link>

            <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />

            <BootstrapNavbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link
                  onClick={() => {
                    handleclick('maps');
                    setShowMapsNavbar(false);
                  }}
                  className={`${
                    active === 'maps' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  AddMarkers
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    handleclick('viewmarkers');
                    setShowMapsNavbar(false);
                  }}
                  className={`${
                    active === 'viewmarkers' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  ViewMarkers
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    setShowMapsNavbar(false);
                  }}
                  className="text-white text-[18px] font-medium cursor-pointer"
                >
                  Close
                </Nav.Link>
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>
        </BootstrapNavbar>
      )}

      {showProfileNavbar && (
        <BootstrapNavbar
          className={`${styles.paddingX} w-full fixed top-0 z-20`}
          bg="tertiary"
          expand="lg"
        >
          <div className="container">
            <Link
              to="/"
              className="navbar-brand text-white text-[18px] font-bold cursor-pointer flex"
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
                setShowProfileNavbar(false);
              }}
            >
              CommuniConnect
            </Link>

            <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />

            <BootstrapNavbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link
                  onClick={() => {
                    handleclick('editprofile');
                    setShowProfileNavbar(false);
                  }}
                  className={`${
                    active === 'editprofile' ? 'text-white' : 'text-secondary'
                  } hover:text-white text-[18px] font-medium cursor-pointer mr-3`}
                >
                  Editprofile
                </Nav.Link>

                <Nav.Link
              onClick={handlelogout}
              className={`${
                active === 'logout' ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer`}
            >
              Logout
            </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    setShowProfileNavbar(false);
                  }}
                  className="text-white text-[18px] font-medium cursor-pointer"
                >
                  Close
                </Nav.Link>
              </Nav>
            </BootstrapNavbar.Collapse>
          </div>
        </BootstrapNavbar>
      )}
    </>
  );
};

export default Navbar;
