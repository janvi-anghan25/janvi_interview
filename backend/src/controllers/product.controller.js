import { validationResult } from "express-validator";
import * as productRepo from "../repositories/product";
import httpStatus from "http-status";

export const addProduct = async (req, res) => {
  const errors = validationResult(req);
  let code, response;

  try {
    if (!errors.isEmpty()) {
      let err = errors.array()[0].msg;
      code = httpStatus.BAD_REQUEST;
      response = { error: err };
      return res.status(code).json(response);
    } else {
      const result = await productRepo.addProduct(req.body);
      code = httpStatus.OK;
      return res.status(code).json(result);
    }
  } catch (err) {
    console.log("addProduct error", err);
    code = httpStatus.INTERNAL_SERVER_ERROR;
    response = { error: err };
    return res.status(code).json(response);
  }
};

export const getAllProducts = async (req, res) => {
  let code, response;

  try {
    const result = await productRepo.getAllProducts();
    code = httpStatus.OK;
    return res.status(code).json(result);
  } catch (err) {
    console.log("getAllProducts error", err);
    code = httpStatus.INTERNAL_SERVER_ERROR;
    response = { error: err };
    return res.status(code).json(response);
  }
};

export const addToCart = async (req, res) => {
  let code, response;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      let err = errors.array()[0].msg;
      code = httpStatus.BAD_REQUEST;
      response = { error: err };
      return res.status(code).json(response);
    } else {
      const result = await productRepo.addToCart(req.body);
      if (result.error) {
        code = httpStatus.BAD_REQUEST;
        response = { error: result.message };
        return res.status(code).json(response);
      } else {
        code = httpStatus.OK;
        return res.status(code).json(result);
      }
    }
  } catch (err) {
    console.log("addToCart error", err);
    code = httpStatus.INTERNAL_SERVER_ERROR;
    response = { error: err };
    return res.status(code).json(response);
  }
};

export const getCart = async (req, res) => {
  let code, response;

  try {
    const result = await productRepo.getCart(req.query);
    code = httpStatus.OK;
    return res.status(code).json(result);
  } catch (err) {
    console.log("getCart error", err);
    code = httpStatus.INTERNAL_SERVER_ERROR;
    response = { error: err };
    return res.status(code).json(response);
  }
};
