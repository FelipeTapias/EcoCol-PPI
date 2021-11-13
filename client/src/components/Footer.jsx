import React from "react";
import "../styles/body.css";

const Footer = () => {
  return (
    <>
      <div className="footer-copyright">
        <div className="bd-footer mt-5 bg-dark text-light text-center p-2 ">
          © 2021 EcoCol, All rights reserved.
          <a
            className="footer-link"
            target="_blank"
            href="https://github.com/LeisyVasquez/EcoCol"
          >
            GitHub Code
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
