import api from "../api/api";
import { constants as API_CONST } from "../api/url";

export const AddProductAPI = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.ADD_PRODUCT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetAllProducts = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .get(API_CONST.ADD_PRODUCT, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const AddToCart = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.ADD_TO_CART, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const GetCarts = (pagination) => {
  return new Promise((resolve, reject) => {
    return api
      .get(API_CONST.ADD_TO_CART + pagination)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};
