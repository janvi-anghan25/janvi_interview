import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  CardBody,
  Input,
  Row,
  Col,
  Label,
  FormGroup,
  Table,
} from "reactstrap";
import { AddToCart, GetCarts } from "../../services/productService";
import { NotificationManager } from "react-notifications";

const Cart = () => {
  const location = useLocation();
  const product = location.state;
  const [defaultModifier, setDefaultModifier] = useState(
    product.modifiers[0].modifier_id
  );
  const [price, setPrice] = useState(product.modifiers[0].price);
  const [qty, setQty] = useState(1);
  const [cartData, setCartData] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    const filterModifier = product.modifiers.filter(
      (item) => item.modifier_id === defaultModifier
    );
    const data = {
      product_id: product.product_id,
      quantity: Number(qty),
      amount: price,
      modifier_id: defaultModifier,
      modifier_size: filterModifier[0].size,
    };
    AddToCart(data)
      .then((res) => {
        const data = res && res.data && res.data.message;
        getCart();
        NotificationManager.success(data);
      })
      .catch((err) => {
        const errorMessage = err && err.data && err.data.error;
        NotificationManager.error(errorMessage);
      });
  };

  useEffect(() => {
    const filterModifier = product.modifiers.filter(
      (item) => item.modifier_id === defaultModifier
    );
    setPrice(filterModifier[0].price * Number(qty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultModifier, qty]);

  const getCart = () => {
    let pagination;
    if (search !== "") {
      pagination = `?product_id=${product.product_id}&search=${search}`;
    } else {
      pagination = `?product_id=${product.product_id}`;
    }
    GetCarts(pagination)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setCartData(data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <h3 className="mt-3">Cart</h3>
      <div style={{ padding: "0px 20px 0px 20px" }} className="mt-3">
        <Card>
          <CardBody>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <FormGroup>
                  <Label>Select Modifier</Label>
                  <Input
                    name="modifiers"
                    type="select"
                    value={defaultModifier}
                    onChange={(e) => setDefaultModifier(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Modifier
                    </option>
                    {product &&
                      product.modifiers.length > 0 &&
                      product.modifiers.map((item, i) => {
                        return (
                          <React.Fragment key={i}>
                            <option value={item.modifier_id}>
                              {item.size}
                            </option>
                          </React.Fragment>
                        );
                      })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="number"
                    name="qty"
                    min={1}
                    max={100}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </FormGroup>
                <Button onClick={() => addToCart(product)}>Add to Cart</Button>
              </Col>
              <Col lg={4} md={4} sm={4}>
                <h3>Product Name: {product.product_name}</h3>
                <p>Price: ${price}</p>
                <p>Category: {product.category}</p>
                <p>Type: {product.type}</p>
              </Col>
            </Row>
            <Row>
              <Col className="mt-5">
                <div className="d-flex justify-content-end">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Search by price"
                    style={{ width: "50%" }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Table hover className="mt-3">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Product Name</th>
                      <th>Product Category</th>
                      <th>Amount</th>
                      <th>Quantity</th>
                      <th>Modifier Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData &&
                      cartData.length > 0 &&
                      cartData.map((cart, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{cart.product_name}</td>
                              <td>{cart.product_category}</td>
                              <td>{cart.amount}</td>
                              <td>{cart.quantity}</td>
                              <td>{cart.modifier_size}</td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                  {cartData.length === 0 && (
                    <tfoot>
                      <tr>
                        <td colSpan={6} className="mt-5 mb-5">
                          Cart data not found.
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Cart;
