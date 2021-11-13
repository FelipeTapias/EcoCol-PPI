import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../../components/traveler/Navbar'; 
import Home from '../../components/traveler/Home';
import Footer from "../../components/Footer";

const homeTraveler = () => {
  console.log("abueno");
  return(
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
 );
}

export default withRouter(homeTraveler); 