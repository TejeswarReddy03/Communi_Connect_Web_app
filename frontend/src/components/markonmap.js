import React from 'react';
import { useMemo } from 'react';
import {GoogleMap,useLoadScript,Marker} from "@react-google-maps/api";
import env from "react-dotenv";

const apikeygmaps = env.GMAPSAPI;
function Markonmap() {
  
 
  const { isLoaded }=useLoadScript({
  googleMapsApiKey:apikeygmaps,
  });
  if(!isLoaded) return <div>isloading</div> 
  
    return <GoogleMap zoom={10} center={{lat:44, lng: -80}}  mapContainerStyle={{
        width: '100%',
        height: '800px',
      }}></GoogleMap>
  
}

export default Markonmap;
