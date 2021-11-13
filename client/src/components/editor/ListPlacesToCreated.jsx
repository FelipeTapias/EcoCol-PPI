import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/listPlacesToCreated.css";
import axios from "axios";
import _ from "lodash";
import {
  faTree,
  faEye,
  faTrashAlt,
  faPen,
  faPlusSquare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { validateEditorRoutes } from "../../config/functionsForValidatedRoutes";
import { URL_SERVER_JAVA, URL_SERVER_NODE } from "../../config/urlServers";
import ModalCreatePlace from "./ModalCreatePlace";
import swal from "sweetalert2";
const { Meta } = Card;

const ListPlacesToCreated = () => {
  const [places, setPlaces] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const getAllPlaces = () => {
    axios
      .get(`${URL_SERVER_JAVA}/getPlaces`)
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => {
        window.location.pathname = "/home-editor";
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    const validateRoutes = validateEditorRoutes();
    if (validateRoutes === 500) {
      window.location.pathname = "/error-route";
    } else {
      getAllPlaces();
    } 
  }, []);

  const savePlaceDb = () => {
    for (let i = 0; i < places.length; i++) delete places[i].id;
    swal
      .fire({
        title: "¿Estás seguro de crear todos estos lugares?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, crearlos",
        cancelButtonText: "No, cancelar",
        confirmButtonColor: "#0f6b02",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${URL_SERVER_NODE}/insertPlaces`, { data: places })
            .then((res) => {
              axios.get(`${URL_SERVER_JAVA}/deletePlaces`);
              if (res.status === 200) {
                swal.fire({
                  icon: "success",
                  title: "Lugares creados coorrectamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
                setTimeout(() => {
                  window.location.pathname = "/home-editor";
                }, 1000);
                axios.get(`${URL_SERVER_JAVA}/deletePlaces`);
              } else {
                swal.fire({
                  icon: "info",
                  title: "Ocurrió un evento inesperado",
                  text: "Por favor verifique de nuevo si los lugares fueron creados, sino inténtelo de nuevo o regrese después",
                  showConfirmButton: false,
                  timer: 3500,
                });
              }
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
        } else {
          swal.fire({
            icon: "info",
            title: "Entendido",
            text: "Puede continuar con lo que estaba realizando, si está seguro de guardar pulse el botón",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      });
  };

  return (
    <div className="m-3 ListPlacesToCreated">
      <button className="btn mb-1" style={{ marginLeft: "92%" }}>
        <FontAwesomeIcon
          icon={faPlusSquare}
          size="3x"
          color="white"
          onClick={() => setOpenCreate(true)}
        />
      </button>
      <Row className="m-4">
        {_.map(places, (value, key) => (
          <Col span={6}>
            <Card
              key={key}
              className="cardCreatePlace mb-4"
              hoverable
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://trekkingsancristobal.com/wp-content/uploads/2019/12/123047954_5017930758231974_2731246614862967130_o.jpg"
                  width="200"
                  height="200"
                />
              }
              actions={[
                <FontAwesomeIcon icon={faTrashAlt} size="lg" key="delete" />,
                <FontAwesomeIcon
                  icon={faPen}
                  size="lg"
                  key="edit"
                  onClick={() => {
                    console.log("hola");
                  }}
                />,
                <FontAwesomeIcon icon={faEye} size="lg" key="preview" />,
              ]}
            >
              <Meta
                title={
                  <>
                    <FontAwesomeIcon icon={faTree} color="green" /> {value.name}
                  </>
                }
                description={"Precio de entrada: " + value.entryPrice}
              />
            </Card>
          </Col>
        ))}
      </Row>
      {openCreate && (
        <ModalCreatePlace open={openCreate} setOpen={setOpenCreate} />
      )}
      <button className="btn mb-1">
        <FontAwesomeIcon
          icon={faSave}
          size="3x"
          color="white"
          onClick={savePlaceDb}
        />
      </button>
    </div>
  );
};

export default ListPlacesToCreated;
