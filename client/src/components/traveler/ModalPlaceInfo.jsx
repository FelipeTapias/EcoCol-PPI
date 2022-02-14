import React, { useEffect, useState } from "react";
import {
  BugOutlined,
  DollarCircleOutlined,
  ClockCircleOutlined,
  FormOutlined,
  EnvironmentOutlined,
  SnippetsOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { Modal } from "antd";
import photosPlaces from "../list_photos.json";

const ModalContent = ({ places, idPlaceSelect, open, setOpen }) => {
  const TabPane = Tabs.TabPane;
  const [place, setPlace] = useState([]);
  useEffect(() => {
    for (let i = 0; i < places.length; i++) {
      if (places[i].id === idPlaceSelect) {
        setPlace(places[i]);
        return;
      }
    }
  }, []);
  return (
    <Modal
      title={<b>Información del lugar</b>}
      visible={open}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.719)" }}
      style={{ top: 50 }}
      onCancel={() => setOpen(false)}
      confirmLoading
      cancelText="Salir"
      okText="Escanear código QR"
      width={920}
    >
      <b>
        <h3 className="text-center">{place.name}</h3>
      </b>
      <div
        id="carouselExampleControls"
        className="carousel slide w-75 m-auto"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner m-auto">
          <div className="carousel-inner m-auto">
            {photosPlaces.map(
              (photo, key) =>
                photo.idPlace === place.id && (
                  <div
                    className={
                      photo.firstPhoto ? `carousel-item active` : `carousel-item`
                    }
                  >
                    <img
                      src={photo.photoPath}
                      width="700"
                      height="300"
                      className="d-block w-100"
                      alt="imagen"
                    />
                  </div>
                )
            )}
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
      <Tabs className="mt-4">
        <TabPane
          tab={
            <span>
              <BugOutlined />
              Fauna
            </span>
          }
          key="1"
        >
          <div className="card card-body fs-6">
            <p>{place.fauna}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <PictureOutlined />
              Flora
            </span>
          }
          key="2"
        >
          <div className="card card-body fs-6">
            <p>{place.flora}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <EnvironmentOutlined />
              Ubicación
            </span>
          }
          key="3"
        >
          <div className="card card-body fs-6">
            <p>{place.address}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <SnippetsOutlined />
              Descripción
            </span>
          }
          key="4"
        >
          <div className="card card-body fs-6">
            <p>{place.description}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <FormOutlined />
              Recomendaciones
            </span>
          }
          key="5"
        >
          <div className="card card-body fs-6">
            <p>{place.recommendations}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <ClockCircleOutlined />
              Horarios
            </span>
          }
          key="6"
        >
          <div className="card card-body fs-6">
            <p>{place.hours}</p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <DollarCircleOutlined />
              Precios de entrada
            </span>
          }
          key="7"
        >
          <div className="card card-body fs-6">
            <p>{place.entryPrice}</p>
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};
export default ModalContent;