import React, { useEffect, useState } from 'react';
import Markonmap from './markonmap';
function Maps(){
const setstyle={height:'100vh'};
    return (
        <div style={setstyle}>
        <iframe
            title="HTML Content"
            src="../../maps.html" // Adjust the path as needed
            
            width="100%"
            height="100%"
        />
        </div>
    );
}
export default Maps;