import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { constants as PATH } from "../components/constants/componentPath";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

const Markup = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={PATH.ROOT} element={<Product />} />
        <Route path={PATH.CART} element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Markup;
