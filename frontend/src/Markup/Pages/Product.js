import React, { useEffect, useState } from "react";
import { Card, Button, CardBody, Table } from "reactstrap";
import { GetAllProducts } from "../../services/productService";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import { constants as PATH } from "../../components/constants/componentPath";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getAllProducts = () => {
    GetAllProducts()
      .then((res) => {
        const data = res && res.data && res.data.data;
        setProductData(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h3 className="mt-3">Product</h3>
      <div style={{ padding: "0px 20px 0px 20px" }} className="mt-3">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-end">
              <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                Add Product +
              </Button>
              {isModalOpen && (
                <AddProduct
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  getAllProducts={getAllProducts}
                />
              )}
            </div>
            <Table hover className="mt-3">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productData &&
                  productData.length > 0 &&
                  productData.map((product, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr>
                          <th scope="row">{i + 1}</th>
                          <td>{product.product_name}</td>
                          <td>{product.category}</td>
                          <td>{product.type}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <i
                              onClick={() => {
                                navigate(PATH.CART, { state: product });
                              }}
                              className="fa fa-eye"
                              style={{ fontSize: 20 }}
                            ></i>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
              {productData.length === 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={6}>Product data not found.</td>
                  </tr>
                </tfoot>
              )}
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Product;
