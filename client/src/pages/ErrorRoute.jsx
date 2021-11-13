import React from "react";
import { withRouter } from "react-router-dom";
import { getFromLocal } from "../config/localStorage";
import NavbarEditor from "../components/editor/Navbar";
import NavbarTraveler from "../components/traveler/Navbar";
import NavbarGeneral from "../components/NavbarLogIn";
import Footer from "../components/Footer";
import ErrorRoute from "../components/ErrorRoute";
const userData = JSON.parse(getFromLocal("user"));

const errorRoute = () => {
  return ( 
    <div>
      {userData !== undefined &&
      userData !== null &&
      userData.typeUser === "editor" ? (
        <>
          <NavbarEditor />
          <ErrorRoute />
          <Footer />
        </>
      ) : userData !== undefined &&
        userData !== null &&
        userData.typeUser === "traveler" ? (
        <>
          <NavbarTraveler />
          <ErrorRoute />
          <Footer />
        </>
      ) : (
        <>
          <NavbarGeneral />
          <ErrorRoute />
          <Footer />
        </>
      )}
    </div>
  );
};

export default withRouter(errorRoute);
