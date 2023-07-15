import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const cartSchema = new Schema(
  {
    cart_id: {
      type: String,
      default: uuidv4,
      index: true,
    },
    product_id: String,
    quantity: Number,
    amount: Number,
    modifier_id: String,
    modifier_size: String,
  },
  { timestamps: true }
);

export const cartModel = new mongoose.model("cart", cartSchema);
