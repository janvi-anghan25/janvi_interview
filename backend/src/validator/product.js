import { body } from "express-validator";
import { constants as VALIDATOR } from "../constant/validator/product.validator";
import { productModel } from "../models/product";

export const validate = (method) => {
  let error = [];
  switch (method) {
    case VALIDATOR.ADD_PRODUCT: {
      error = [
        body("product_name", "Please enter product name").not().isEmpty(),
        body("category", "Please enter category").not().isEmpty(),
        body("type", "Please enter type").not().isEmpty(),
        body("quantity", "Please enter quantity").not().isEmpty(),
      ];
      break;
    }
    case VALIDATOR.ADD_CART: {
      error = [
        body("product_id", "Please enter product id")
          .not()
          .isEmpty()
          .custom(isProductExist),
      ];
      break;
    }
  }
  return error;
};

export const isProductExist = async (value) => {
  let isProductExist = await productModel.find({
    product_id: value,
  });
  if (isProductExist.length === 0) {
    throw new Error("Product data not found");
  }
  return value;
};
