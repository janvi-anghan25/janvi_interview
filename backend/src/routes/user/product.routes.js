/**
 * * Product Routes
 */

import { Router } from "express";
import * as productCtrl from "../../controllers/product.controller";
import { constants as VALIDATOR } from "../../constant/validator/product.validator";
import { validate } from "../../validator/product";

const routes = new Router({ mergeParams: true });

const PATH = {
  ROOT: "/",
  ADD_CART: "/cart",
};

routes
  .route(PATH.ROOT)
  /**
   * @api {POST} /api/product
   * @desc Add Product API
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_PRODUCT), productCtrl.addProduct)
  /**
   * @api {GET} /api/product
   * @desc Get all Products API
   * @access Private
   * **/
  .get(productCtrl.getAllProducts);

routes
  .route(PATH.ADD_CART)
  /**
   * @api {GET} /api/product/cart
   * @desc Add to cart product API
   * @access Private
   * **/
  .post(validate(VALIDATOR.ADD_CART), productCtrl.addToCart)
  /**
   * @api {GET} /api/product/cart
   * @desc Get All Cart products API
   * @access Private
   * **/
  .get(productCtrl.getCart);

export default routes;
