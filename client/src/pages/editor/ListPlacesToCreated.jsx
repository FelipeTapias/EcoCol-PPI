import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../../components/editor/Navbar';
import ListPlacesToCreated from '../../components/editor/ListPlacesToCreated';
import Footer from "../../components/Footer";

const listPlacesToCreated = () => {
  return (
    <div>
      <Navbar />
      <ListPlacesToCreated />
      {/*<Footer />*/}
    </div>
  );
}

export default withRouter(listPlacesToCreated);