import React, { useState } from 'react';

function Footer(props){

  const latestYear = new Date() 
  const footerPosition = props.footerPosition
  console.log(footerPosition)
  const footerStyle = {
    position: footerPosition,
    width: "100%",
	bottom: "0",
	textAlign: "center",
	color: "#fff",
    background: "rgb(113, 114, 173)",
    fontWeight: "bold"
  }

  return (
    <div style={footerStyle}>
		Copyright © {latestYear.getFullYear()} by Nexent Sdn Bhd
	</div>
       
  );
}

export default Footer;