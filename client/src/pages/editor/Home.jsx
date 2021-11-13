import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../../components/editor/Navbar';
import Home from '../../components/editor/Home';
import Footer from "../../components/Footer";

const homeEditor = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default withRouter(homeEditor);