import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo=()=>{
	return(
		<Tilt className="Tilt shadow-2 br2" options={{ max : 55 }} style={{ height: 125, width: 130 }} >
 		<div className="Tilt-inner pa3"><img style={{paddingTop:"8px"}}src={brain} alt="Logo"/></div>
		</Tilt>

	);
} 

export default Logo;