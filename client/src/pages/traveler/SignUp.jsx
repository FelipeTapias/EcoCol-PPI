import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../../components/NavbarLogIn";
import SignUp from "../../components/traveler/SignUp";
import Footer from "../../components/Footer";

const signUp = () => {
  return (
    <>
      <Navbar />
      <SignUp />
      <Footer />
    </>
  );
};

export default withRouter(signUp);
