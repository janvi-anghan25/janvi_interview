import express from "express";
import { constants as APP_CONST } from "./constant/application";
import apiRoutes from "./routes/index";
import "./config/database";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PATH = {
  API: "/api",
};

app.use(PATH.API, apiRoutes);

app.listen(APP_CONST.PORT, (err) => {
  if (err) {
    console.log(`Cannot run due to ${err}!`);
  } else {
    console.log(`Server started on port ${APP_CONST.PORT}`);
  }
});

export default app;
