import React, { useLayoutEffect, useState } from "react";
import Ruleta from "../../images/ruleta.png";
import ModalPlaceInfo from "./ModalPlaceInfo";
import "antd/dist/antd.css";
import "../../styles/home.css";
import axios from "axios";
import { URL_SERVER_NODE } from "../../config/urlServers";
import _ from "lodash";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [idPlaceSelect, setIdPlaceSelect] = useState([]);

  useLayoutEffect(() => {
      axios
        .get(`${URL_SERVER_NODE}/getAllPlaces`)
        .then((res) => setPlaces(res.data))
        .catch((err) => console.log(err));
  }, []);

  return places.length > 0 ? (
    <div className="Home">
      <div className="ruleta">
        <button className="btn-ruleta">
          <img className="img-ruleta" src={Ruleta} alt="ruleta" />
        </button>
      </div>
      <input
        className="form-control fs-5 w-75 mx-auto my-5"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
      />
      <div>
        {places.map((value, key) => {
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
                className="button-modal-traveler p-1"
                onClick={() => {
                  setOpen(true);
                  setIdPlaceSelect(value.id);
                }}
              >
                Información
              </button>
            </div>
          );
        })}
        {open && (
          <ModalPlaceInfo
            places={places}
            idPlaceSelect={idPlaceSelect}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Home;
