import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../../components/editor/Navbar";
import SingUp from "../../components/editor/SingUp";
import Footer from "../../components/Footer";

const signUp = () => {
  return (
    <>
      <Navbar />
      <SingUp />
      <Footer />
    </>
  );
};

export default withRouter(signUp);
