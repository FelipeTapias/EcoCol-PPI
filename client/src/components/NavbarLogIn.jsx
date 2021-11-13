import React, { useState } from "react";
import "../styles/navbar.css";
import { Input } from "antd";
import swal from "sweetalert2";
import axios from "axios";
import { URL_SERVER_NODE } from "../config/urlServers";
import { saveToLocal } from "../config/localStorage";

const LogInNavbar = () => {
  const [data, setData] = useState({});
  const onChangeInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const singIn = () => {
    axios
      .post(`${URL_SERVER_NODE}/singIn`, data)
      .then((res) => {
        if (res.status === 200) {
          saveToLocal("user", JSON.stringify(res.data));
          if (res.data.typeUser === "editor")
            window.location.pathname = "/home-editor";
          else if (res.data.typeUser === "traveler")
            window.location.pathname = "/home-traveler";
        }
      })
      .catch((err) => {
        const error = {err}; 
        const status = error.err.response.status; 
         if (status === 300) {
          swal.fire({
            icon: "error",
            title: "Credenciales incorrectas",
            text: "Revise de nuevo los datos ingresados",
            showConfirmButton: false,
            timer: 3000,
          });
        } else if(status === 500){
          swal.fire({
            icon: "error",
            title: "Error interno del servidor",
            text: "Intente de nuevo o regrese después",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  };

  return (
    <div className="Navbar">
      <nav className="navbar navbar-light bg-dark">
        <div className="mx-3 my-1" style={{ width: "100vw" }}>
          <a className="navbar-brand" href="/">
            <img
              src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/logo%20(1).png"
              alt="logo"
              width="34"
              height="31"
            />
            <h4 className="d-inline">EcoCol</h4>
          </a>
          <button
            className="btn float-end"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBackdrop"
            aria-controls="offcanvasWithBackdrop"
          >
            <img
              src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/master/Recursos%20gu%C3%ADa/profile.png"
              alt="logo"
              width="35"
              height="33"
            />
          </button>
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasWithBackdrop"
          aria-labelledby="offcanvasWithBackdropLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="mydiv animate-bg py-2">
              <img
                className="d-block mt-3 mx-auto"
                src="https://raw.githubusercontent.com/JuanManuel-GAA/equipo7_gaa_ppi2020/22a4be8671d3b2ca676fd7a5f0d21e6148c81859/profile-user.svg"
                alt="profile"
                width="150"
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto my-5 w-75 ">
              <Input
                size="large"
                name="email"
                placeholder="Correo electrónico"
                className="mb-3"
                onChange={onChangeInputs}
              />
              <Input
                size="large"
                name="password"
                placeholder="Contraseña"
                type="password"
                className="mb-3"
                onChange={onChangeInputs}
              />
              <button
                className="btn btn-dark fs-5"
                type="button"
                onClick={singIn}
              >
                Iniciar sesión
              </button>
              <p className="fs-6 mt-2">
                ¿No tienes una cuenta?
                <a href="/sign-up-traveler"> Regístrate</a>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LogInNavbar;
