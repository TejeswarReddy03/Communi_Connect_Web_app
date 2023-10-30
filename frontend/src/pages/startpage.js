import React, { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';
import '../components/startpage.css';
import { Canvas } from '@react-three/fiber';
import Textt from './threedtext.js'
import { Sparkles } from '@react-three/drei';
import './startpage.css'

function Startpage(){
    return(
      <>
            <div className="full-page-canvas">
      <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 4, - 2, 6 ]
        } }

    >
  
        <Textt/>
        {/* <Sparkles scale={3}/> */}
        
    </Canvas>
    </div>
    <div className="link-container">
    <div >
        <Link to="/frontpage_admin">Register/Signin ADMIN</Link>
        </div>
        <div>
      <Link to="/frontpage_user">Register/Signin USER</Link>
      </div>

    </div>
    </>

    )
}

export default Startpage