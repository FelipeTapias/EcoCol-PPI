import React, { useLayoutEffect, useState } from "react";
import { Modal } from "antd";
import ModalContentEdit from "./ModalContentEdit";
import ModalCreatePlace from "./ModalCreatePlace";
import "antd/dist/antd.css";
import "../../styles/home.css";
import axios from "axios";
import { URL_SERVER_NODE } from "../../config/urlServers";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert2";
import { validateEditorRoutes } from "../../config/functionsForValidatedRoutes";

const Home = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [places, setPlaces] = useState([]);
  const [idPlaceSelect, setIdPlaceSelect] = useState([]);
  const [dataPlaceToUpdate, setDataPlaceToUpdate] = useState({});

  const getAllPlaces = () => {
    axios
      .get(`${URL_SERVER_NODE}/getAllPlaces`)
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    const validateRoutes = validateEditorRoutes(); 
    if(validateRoutes === 500){
      window.location.pathname = "/error-route";
    } else {
      getAllPlaces();
    }
  }, []);

  const deletePlace = async (idPlace) => {
    swal
      .fire({
        title: "¿Estás seguro de eliminar este lugar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "No, cancelar",
        confirmButtonColor: "#0f6b02",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      })
      .then((result) => {
        setOpenEdit(false);
        if (result.isConfirmed) {
          axios
            .delete(`${URL_SERVER_NODE}/deletePlace`, { data: { id: idPlace } })
            .then((res) => {
              getAllPlaces();
              if (res.status === 200) {
                swal.fire({
                  icon: "success",
                  title: "Lugar eliminado coorrectamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                swal.fire({
                  icon: "info",
                  title: "Ocurrió un evento inesperado",
                  text: "Por favor verifique de nuevo si el lugar fue eliminado, sino inténtelo de nuevo o regrese después",
                  showConfirmButton: false,
                  timer: 3500,
                });
              }
            })
            .catch((err) => {
              setOpenEdit(false);
              swal.fire({
                icon: "error",
                title: "Error interno del servidor",
                text: "Intente de nuevo o regrese después",
                showConfirmButton: false,
                timer: 3000,
              });
            });
        }
      });
  };

  const updatePlace = (idPlace) => {
    axios
      .put(`${URL_SERVER_NODE}/updatePlace`, dataPlaceToUpdate)
      .then((res) => {
        setOpenEdit(false);
        if (res.status === 200) {
          getAllPlaces();
          swal.fire({
            icon: "success",
            title: "Lugar actualizado correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        setOpenEdit(false);
        swal.fire({
          icon: "error",
          title: "Error interno del servidor",
          text: "Intente de nuevo o regrese después",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return places.length > 0 ? (
    <div className="Home">
      <button className="btn mt-4" style={{ marginLeft: "88%" }}>
        <FontAwesomeIcon
          icon={faPlusSquare}
          size="3x"
          color="white"
          onClick={() => setOpenCreate(true)}
        />
      </button>
      <input
        className="form-control fs-5 w-75 mx-auto"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
      />

      <div>
        {_.map(places, (value, key) => {
          return (
            <div
              className="container place p-2 my-5"
              style={{ color: "white" }}
              key={key}
            >
              <div className="divImgPlace">
                <img
                  className="float-start mx-3 mb-3 mt-5 imgPlace"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS82yDrhjKDPkonzkqy6Q9iFZOJMwR99n9qVA&usqp=CAU"
                  alt="imagen lugar"
                  width="200"
                  height="200"
                />
              </div>
              <div className="float-end border border-white p-2 mt-5 mx-3">
                <h5 className="mt-2" style={{ color: "white" }}>
                  ¿Visitaste el lugar?
                </h5>
                <img
                  className="mb-2"
                  src="https://i1.wp.com/farm6.static.flickr.com/5012/5488631459_bac46cb32e_m.jpg?resize=240%2C240"
                  alt="logo"
                  width="125"
                  height="125"
                />
              </div>
              <h2 style={{ color: "white" }}>{value.name}</h2>
              <p>{value.description}</p>
              <button
                className="button-modal-editor p-1"
                onClick={() => deletePlace(value.id)}
              >
                Eliminar
              </button>
              <button
                className="button-modal-editor p-1"
                onClick={() => {
                  setOpenEdit(true);
                  setIdPlaceSelect(value.id);
                }}
              >
                Editar
              </button>
            </div>
          );
        })}

        {openEdit && (
          <Modal
            title={<b>Editar lugar</b>}
            visible={openEdit}
            style={{ top: 50 }}
            maskClosable={false}
            keyboard={false}
            onCancel={() => setOpenEdit(false)}
            cancelText="Cancelar"
            okText="Actualizar"
            width={800}
            bodyStyle={{ padding: "30px" }}
            onOk={updatePlace}
          >
            <ModalContentEdit
              places={places}
              idPlaceSelect={idPlaceSelect}
              setDataPlaceToUpdate={setDataPlaceToUpdate}
              dataPlaceToUpdate={dataPlaceToUpdate}
            />
          </Modal>
        )}

        {openCreate && (
          <ModalCreatePlace open={openCreate} setOpen={setOpenCreate} />
        )}
      </div>
    </div>
  ) : null;
};

export default Home;
