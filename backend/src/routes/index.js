import { Router } from "express";
import productRoutes from "./user/product.routes";

const routes = new Router();

const PATH = {
  ROOT: "/",
  PRODUCT: "/product",
};

routes.use(PATH.PRODUCT, productRoutes);

export default routes;
