import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
} from "reactstrap";
import { errorConst as ERR_CONSTS } from "../../components/constants/errorConst";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/common/CustomInput";
import { AddProductAPI } from "../../services/productService";
import { NotificationManager } from "react-notifications";

const AddProduct = ({ isModalOpen, setIsModalOpen, getAllProducts }) => {
  const [modifiers, setModifiers] = useState([
    { size: "", type: "", price: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState([]);

  const initialValue = {
    product_name: "",
    category: "",
    type: "",
    quantity: "",
  };

  const createProductSchema = Yup.object().shape({
    product_name: Yup.string().required(ERR_CONSTS.PRODUCT_NAME),
    category: Yup.string().required(ERR_CONSTS.CATEGORY),
    type: Yup.string().required(ERR_CONSTS.TYPE),
    quantity: Yup.string().required(ERR_CONSTS.QTY),
  });

  const handleInputChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    let list = [...modifiers];

    list[index][name] = value;
    if (name === "price") {
      list[index][name] = Number(value);
    }
    setModifiers(list);
    let errorMsg = modifiers.map((item, key) => {
      let error = {};
      if (!item.size) {
        error.errorSize = ERR_CONSTS.SIZE;
      } else {
        error.errorSize = "";
      }
      if (!item.type) {
        error.errorType = ERR_CONSTS.TYPE;
      } else {
        error.errorType = "";
      }
      if (!item.price) {
        error.errorPrice = ERR_CONSTS.PRICE;
      } else {
        error.errorPrice = "";
      }
      return error;
    });
    setErrorMessage(errorMsg);
  };

  const handleRemoveClick = (index) => {
    let list = [...modifiers];
    list.splice(index, 1);
    setModifiers(list);
  };

  const handleAddClick = () => {
    let errorMsg = modifiers.map((item, key) => {
      let error = {};
      let valid = true;
      if (!item.size) {
        error.errorSize = ERR_CONSTS.SIZE;
        valid = false;
      } else {
        error.errorSize = "";
      }
      if (!item.type) {
        error.errorType = ERR_CONSTS.TYPE;
        valid = false;
      } else {
        error.errorType = "";
      }
      if (!item.price) {
        error.errorPrice = ERR_CONSTS.PRICE;
        valid = false;
      } else {
        error.errorPrice = "";
      }

      if (modifiers.length - 1 === key && valid) {
        setModifiers([...modifiers, { size: "", type: "", price: "" }]);
      }
      return error;
    });
    setErrorMessage(errorMsg);
  };

  const handleSubmit = (values, { resetForm }) => {
    let isInputValidError = false;

    let errorMsg = modifiers.map((item, key) => {
      let error = {};
      if (!item.size) {
        error.errorSize = ERR_CONSTS.SIZE;
        isInputValidError = true;
      } else {
        error.errorSize = "";
        isInputValidError = false;
      }
      if (!item.type) {
        error.errorType = ERR_CONSTS.TYPE;
        isInputValidError = true;
      } else {
        error.errorType = "";
        isInputValidError = false;
      }
      if (!item.price) {
        error.errorPrice = ERR_CONSTS.PRICE;
        isInputValidError = true;
      } else {
        error.errorPrice = "";
        isInputValidError = false;
      }
      return error;
    });
    setErrorMessage(errorMsg);

    let data = {
      product_name: values.product_name,
      category: values.category,
      type: values.type,
      quantity: values.quantity,
      modifiers: modifiers,
    };

    if (!isInputValidError) {
      AddProductAPI(data)
        .then((res) => {
          const data = res && res.data && res.data.message;
          NotificationManager.success(data);
          setIsModalOpen(!isModalOpen);
          getAllProducts();
          resetForm();
          setModifiers([{ size: "", type: "", price: "" }]);
        })
        .catch((err) => {
          const errorMessage = err.response.data.error.message;
          NotificationManager.error(errorMessage);
        });
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={() => setIsModalOpen(!isModalOpen)}
      size="lg"
    >
      <Formik
        initialValues={initialValue}
        validationSchema={createProductSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <ModalHeader>Add Product</ModalHeader>
            <ModalBody>
              <div>
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <CustomInput
                    type="text"
                    placeholder="Enter product name"
                    name="product_name"
                    values={values}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <CustomInput
                    type="text"
                    name="category"
                    placeholder="Please enter category"
                    values={values}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="type">Product type</Label>
                  <CustomInput
                    type="text"
                    name="type"
                    placeholder="Please enter product type"
                    values={values}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="qty">Quantity</Label>
                  <CustomInput
                    type="number"
                    name="quantity"
                    placeholder="Please enter quantity"
                    values={values}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="modifiers">Modifiers</Label>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 10,
                    }}
                  >
                    <Row>
                      {modifiers &&
                        modifiers.map((item, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Col lg={4} md={4} xl={4}>
                                <Input
                                  type="text"
                                  name="size"
                                  placeholder="Please enter size"
                                  value={item.size}
                                  onChange={(e) => {
                                    handleInputChange(e, i);
                                  }}
                                  autoComplete="off"
                                />
                                <div
                                  style={{ fontSize: 14 }}
                                  className="text-left mt-1 text-danger "
                                >
                                  {errorMessage.length - 1 >= i &&
                                    errorMessage[i].errorSize}
                                </div>
                              </Col>
                              <Col lg={4} md={4} xl={4} className="mx-2">
                                <Input
                                  type="text"
                                  name="type"
                                  placeholder="Please enter type"
                                  value={item.type}
                                  onChange={(e) => {
                                    handleInputChange(e, i);
                                  }}
                                  autoComplete="off"
                                />
                                <div
                                  style={{ fontSize: 14 }}
                                  className="text-left mt-1 text-danger "
                                >
                                  {errorMessage.length - 1 >= i &&
                                    errorMessage[i].errorType}
                                </div>
                              </Col>
                              <Col lg={4} md={4} xl={4} className="mx-2">
                                <Input
                                  type="number"
                                  name="price"
                                  placeholder="Please enter price"
                                  value={item.price}
                                  onChange={(e) => {
                                    handleInputChange(e, i);
                                  }}
                                  autoComplete="off"
                                />
                                <div
                                  style={{ fontSize: 14 }}
                                  className="text-left mt-1 text-danger "
                                >
                                  {errorMessage.length - 1 >= i &&
                                    errorMessage[i].errorPrice}
                                </div>
                              </Col>

                              <div className="d-flex flex-row mx-sm-2">
                                {modifiers.length !== 1 && (
                                  <i
                                    onClick={() => handleRemoveClick(i)}
                                    className="fa fa-trash"
                                    style={{ fontSize: 20, paddingTop: 15 }}
                                  ></i>
                                )}
                                <div className="mx-sm-2">
                                  {modifiers.length - 1 === i && (
                                    <i
                                      onClick={handleAddClick}
                                      className="fa fa-plus"
                                      style={{ fontSize: 20, paddingTop: 15 }}
                                    ></i>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Row>
                  </div>
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddProduct;
