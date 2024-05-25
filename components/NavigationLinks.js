

// NavigationLinks.js
import React from "react";
import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <>

      <Link to="/view">View Parking Lots</Link>
      <br/> 
      <Link to="/add">About Us</Link>

    </>
  );
}

export default NavigationLinks;