import React from 'react';
import { useMemo } from 'react';
import {GoogleMap,useLoadScript,Marker} from "@react-google-maps/api";
import env from "react-dotenv";

const apikeygmaps = env.GMAPSAPI;
function Markonmap() {
  
 
  const { isLoaded }=useLoadScript({
  googleMapsApiKey:apikeygmaps,
  });
  if(!isLoaded) return <div>isloading</div> ;
  return <Gmap></Gmap>

 
    //return <h1>this is mark on map</h1>
  
}

function Gmap(){
  const center=useMemo(()=>({lat:44,lng:-60}),[]);
  return <GoogleMap zoom={10} center={{lat:44, lng: -80}}  mapContainerStyle={{
      width: '100%',
      height: '400px',
    }}>
      <Marker position={center} />
    </GoogleMap> 
}
export default Markonmap;
