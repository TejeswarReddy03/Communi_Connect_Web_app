import React, { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom';
import '../components/startpage.css';
import { Canvas } from '@react-three/fiber';
import Textt from './threedtext.js'
import { Sparkles } from '@react-three/drei';
import { Suspense } from 'react';
import CanvasLoader from '../components/Loader'

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
  <Suspense fallback={<CanvasLoader/>}>
        <Textt/>
        </Suspense>
        {/* <Sparkles scale={3}/> */}
        
    </Canvas>
    </div>
    <div className="link-container rounded-lg p-4 flex justify-center items-center">
  <div className="mx-4 ">
    <Link to="/frontpage_admin" className="text-xl text-white-500 rounded-full  px-2 py-2 border border-blue-500 hover:bg-white hover:text-blue-500 hover:border-white transition-all bg-black">Register/Signin ADMIN</Link>
  </div>
  <br/>
  <div className="mx-4">
    <Link to="/frontpage_user" className="text-xl text-white-500 rounded-full px-2 py-2 border border-blue-500 hover:bg-white hover:text-blue-500 hover:border-white transition-all bg-black">Register/Signin USER</Link>
  </div>
</div>






    </>

    )
}

export default Startpage