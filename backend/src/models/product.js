import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const modifierSchema = new Schema({
  modifier_id: { type: String, default: uuidv4 },
  size: String,
  type: String,
  price: Number,
  _id: false,
});

const productSchema = new Schema(
  {
    product_id: {
      type: String,
      default: uuidv4,
      index: true,
    },
    product_name: String,
    category: String,
    type: String,
    quantity: Number,
    modifiers: [modifierSchema],
  },
  { timestamps: true }
);

export const productModel = new mongoose.model("product", productSchema);
