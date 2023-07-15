import { cartModel } from "../models/cart";
import { productModel } from "../models/product";

export const addProduct = async (body) => {
  const product = new productModel({
    ...body,
    modifiers: body.modifiers,
  });
  await product.save();
  const data = {
    message: "Product added successfully.",
  };
  return data;
};

export const getAllProducts = async () => {
  const productData = await productModel.find({}).sort({ createdAt: -1 });
  const data = {
    message: "Product data fetched successfully",
    data: productData,
  };
  return data;
};

export const addToCart = async (body) => {
  const { product_id, quantity } = body;
  let data = {};
  let filter = {
    product_id: product_id,
  };

  let [productData] = await productModel.find(filter);
  let qty = productData.quantity - quantity;

  if (qty <= 0) {
    data = {
      error: true,
      message: "Your product is out of stock",
    };
  } else {
    await productModel.update(
      {
        product_id,
      },
      { $set: { quantity: qty } }
    );

    const cartItem = new cartModel({
      ...body,
    });
    await cartItem.save();
    data = {
      error: false,
      message: "Product added to cart successfully",
    };
  }
  return data;
};

export const getCart = async (query) => {
  const { product_id, search } = query;
  let filter = {
    product_id: product_id,
  };

  if (search) {
    filter = {
      ...filter,
      amount: {
        $gte: Number(search),
      },
    };
  }

  const cartData = await cartModel.aggregate(pipelineForCart(filter));
  const data = {
    message: "Cart data fetched successfully",
    data: cartData,
  };
  return data;
};

const pipelineForCart = (filter) => {
  const pipeline = [
    { $match: filter },
    {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "product_id",
        as: "productData",
      },
    },
    {
      $project: {
        quantity: 1,
        amount: 1,
        modifier_size: 1,
        product_name: {
          $arrayElemAt: ["$productData.product_name", 0],
        },
        cart_id: 1,
        product_category: {
          $arrayElemAt: ["$productData.category", 0],
        },
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ];
  return pipeline;
};
