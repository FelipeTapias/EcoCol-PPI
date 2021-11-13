import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "../../styles/signup.css";
import { Input, DatePicker, Tooltip } from "antd";
import { URL_SERVER_NODE } from "../../config/urlServers";
import swal from "sweetalert2";

const SignUp = () => {
  const [data, setData] = useState({});

  const submitUser = () => {
    axios
      .post(`${URL_SERVER_NODE}/insertUser`, {
        ...data,
        typeUser: "traveler",
      })
      .then((res) => {
        if (res.status === 200) {
          swal.fire({
            icon: "success",
            title: "Viajero creado correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          swal.fire({
            icon: "info",
            title: "Ocurrió un evento inesperado",
            text: "Por favor verifique de nuevo si el viajero fue creado, sino inténtelo de nuevo o regrese después",
            showConfirmButton: false,
            timer: 3500,
          });
        }
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1500);
      })
      .catch((err) => {
        swal.fire({
          icon: "error",
          title: "Error interno del servidor",
          text: "Intente de nuevo o regrese después",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  const onChangeInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDatePicker = (value, nameField) => {
    setData({ ...data, [nameField]: value });
  };

  return (
    <>
      <div className="container mt-5 w-50">
        <h1 className="pt-5 pb-1" style={{ color: "white" }}>
          Crea tu cuenta
        </h1>
        <form>
          <div>
            <div className="w-50 m-auto mb-3">
              <label>Nombre Completo</label>
              <Input name="name" onChange={onChangeInputs} />
            </div>
            <div className="w-50 m-auto mb-3">
              <label>Dirección de correo electrónico</label>
              <Input name="email" type="email" onChange={onChangeInputs} />
            </div>
            <div className="w-50 m-auto mb-3">
              <label>Contraseña</label>
              <Tooltip
                title="Asegúrese de que tenga al menos 8 caracteres, incluido un número y una letra minúscula."
                placement="right"
                color="green"
                key="#87d068"
              >
                <Input
                  name="password"
                  type="password"
                  onChange={onChangeInputs}
                />
              </Tooltip>
            </div>
            {/*<div className="w-50 m-auto mb-3">
              <label>Confirmar contraseña</label>
              <Tooltip
                title="Asegúrese de que tenga al menos 8 caracteres, incluido un número y una letra minúscula."
                placement="right"
                color="green"
                key="#87d068"
              >
                <Input
                  name="password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Tooltip>
                </div>*/}
            <div className="w-50 m-auto mb-5">
              <label>Fecha de nacimiento</label>
              <DatePicker
                showToday={false}
                className="d-block"
                onChange={(momentObject, value) =>
                  onChangeDatePicker(value, "birthDate")
                }
              />
            </div>
            <button type="button" className="btn btn-dark" onClick={submitUser}>
              Crear cuenta
            </button>
            <div className="pb-5">
              {/* Espacio entre el form y el container */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default withRouter(SignUp);
