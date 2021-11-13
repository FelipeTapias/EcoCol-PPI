import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../components/NavbarLogIn'
import Home from '../components/traveler/Home'
import Footer from "../components/Footer";

const homeGeneral = () => {
 return(
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
 );
}

export default withRouter(homeGeneral); 