import React, { useEffect, useState } from "react";
import { Upload, Modal, Input, Row, Col, Select } from "antd";
import "../../styles/modalContent.css";
import axios from "axios";
import { URL_SERVER_NODE, URL_SERVER_JAVA } from "../../config/urlServers";
import { PlusOutlined } from "@ant-design/icons";
import _ from "lodash";
import { validateEditorRoutes } from "../../config/functionsForValidatedRoutes";
import swal from "sweetalert2";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ModalContentCreate = ({ open, setOpen }) => {
  const [dataPlaceToCreate, setDataPlaceToCreate] = useState({});
  const [cities, setCities] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [idPlaceToCreated, setIdPlaceToCreated] = useState(4);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  useEffect(() => {
    axios
      .get(`${URL_SERVER_NODE}/getAllCities`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeInputs = (e) => {
    setDataPlaceToCreate({
      ...dataPlaceToCreate,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelects = (value, nameField) => {
    setDataPlaceToCreate({ ...dataPlaceToCreate, [nameField]: value });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const createPlace = () => {
    console.log(dataPlaceToCreate.description); 
    axios
      .post(`${URL_SERVER_JAVA}/addPlace`, {
        id: idPlaceToCreated,
        name: dataPlaceToCreate.name,
        codeCity: dataPlaceToCreate.codeCity,
        hashCodeQR: 0,
        codeLocation: "",
        description: dataPlaceToCreate.description,
        recommendations: dataPlaceToCreate.recommendations,
        address: dataPlaceToCreate.address,
        hours: dataPlaceToCreate.hours,
        entryPrice: dataPlaceToCreate.entryPrice,
        flora: dataPlaceToCreate.flora,
        fauna: dataPlaceToCreate.fauna,
      })
      .then(res => {
        setIdPlaceToCreated(idPlaceToCreated+1);
        window.location.pathname = "/list-places-to-created";
      })
      .catch(err => {
        swal.fire({
          icon: "error",
          title: "Error interno del servidor",
          text: "Intente de nuevo o regrese después",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };

  return (
    <Modal
      className="ModalContent"
      title={<b>Crear lugar</b>}
      visible={open}
      style={{ top: 50 }}
      maskClosable={false}
      keyboard={false}
      onCancel={() => setOpen(false)}
      cancelText="Cancelar"
      okText="Añadir"
      width={800}
      bodyStyle={{ padding: "30px" }}
      onOk={createPlace}
    >
      <b>
        <h3 className="text-center">Crear un lugar</h3>
      </b>

      <Row>
        <Col span={12}>
          <div className="inputStart">
            <label className="mt-3 fs-6">Nombre</label>
            <Input name="name" onChange={onChangeInputs} />
          </div>
        </Col>
        <Col span={12}>
          <div className="inputEnd">
            <label className="mt-3 fs-6">Ciudad de ubicación</label>
            <Select
              placeholder="Buscar para seleccionar"
              showSearch
              className="w-100"
              onChange={(value) => {
                onChangeSelects(value, "codeCity");
              }}
            >
              {_.map(cities, (value) => (
                <Select.Option key={value.code} value={value.code}>
                  {value.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Descripción</label>
            <Input.TextArea
              name="description"
              rows={4}
              onChange={onChangeInputs}
            />
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Recomendaciones</label>
            <Input.TextArea
              name="recommendations"
              rows={3}
              onChange={onChangeInputs}
            />
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Precio de entrada</label>
            <Input.TextArea
              name="entryPrice"
              rows={2}
              onChange={onChangeInputs}
            />
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Ubicación</label>
            <Input.TextArea name="address" rows={1} onChange={onChangeInputs} />
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Horarios</label>
            <Input.TextArea name="hours" rows={1} onChange={onChangeInputs} />
          </div>
        </Col>

        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Fauna</label>
            <Input.TextArea name="fauna" rows={3} onChange={onChangeInputs} />
          </div>
        </Col>
        <Col span={24}>
          <div>
            <label className="mt-3 fs-6">Flora</label>
            <Input.TextArea name="flora" rows={3} onChange={onChangeInputs} />
          </div>
        </Col>
        <Col span={24}>
          <label className="mt-3 fs-6">Fotos del lugar</label>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Col>
      </Row>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Modal>
  );
};

export default ModalContentCreate;
