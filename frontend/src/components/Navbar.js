import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { VerticalLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerticalNavbar = ({ VerticalLinks, active, handleclick, isVisible }) => {
  console.log(VerticalLinks);
  return (
    <div
      className={`${
        isVisible ? 'flex' : 'hidden'
      } sm:hidden flex flex-1 flex-col justify-start items-center`}
    >
      <ul className="list-none flex justify-start items-start flex-col gap-4">
        {VerticalLinks.map((link) => (
          <li
            key={link.id}
            className={`${
              active === link.title ? 'text-white' : 'text-secondary'
            } font-poppins font-medium cursor-pointer text-[16px]`}
            onClick={() => {
              console.log("clicked the button")
              handleclick(link.title);
            }}
          >
            <button onClick={() => handleclick(link.title)}>{link.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userstate = location.state;
  const userdata = userstate.userData;

  function handleclick(i) {
    navigate(`/${i}`, { state: { userData: userdata } });
  }

  const handlelogout = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.get("http://localhost:8004/destroy-session");
      console.log(res.data);
      navigate('/');
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showVerticalNavbar, setShowVerticalNavbar] = useState(false);

  return (
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
              onClick={() => setActive(link.title)}
            >
              <button onClick={() => handleclick(link.title)}>
                {link.title}
              </button>
            </li>
          ))}
          
          <button
            onClick={handlelogout}
            className={`${
              active === 'logout' ? 'text-white' : 'text-secondary'
            } hover:text-white text-[18px] font-medium cursor-pointer`}
          >
            Logout
          </button>
        </ul>

        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
        >
           <ul className="list-none hidden sm:flex flex-row gap-10">
          {VerticalLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 'text-white' : 'text-secondary'
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <button onClick={() => handleclick(link.title)}>
                {link.title}
              </button>
            </li>
          ))}
          
          
        </ul>
          {/* <VerticalNavbar
            VerticalLinks={VerticalLinks}
            active={active}
            handleclick={handleclick}
            isVisible={showVerticalNavbar}
          /> */}
        </div>
        <button
          onClick={() => setShowVerticalNavbar(!showVerticalNavbar)}
          className="sm:hidden text-white text-[18px] font-medium cursor-pointer"
        >
          Toggle Vertical Navbar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
