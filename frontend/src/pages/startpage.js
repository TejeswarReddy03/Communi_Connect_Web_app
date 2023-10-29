import React, { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';
import '../components/startpage.css'
function Startpage(){
    return(
    <div className='startpagediv'>
        <div>
        <Link to="/frontpage_admin">Register/Signin ADMIN</Link>
        </div>
        <div>
      <Link to="/frontpage_user">Register/Signin USER</Link>
      </div>
    </div>
    )
}

export default Startpage