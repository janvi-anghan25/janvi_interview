import mongoose from "mongoose";
import { constants as DB_CONST } from "../constant/application";

const URL = DB_CONST.MONGO_URL;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to the database at ${URL}`);
  })
  .catch((err) => {
    console.log(`connection error while connection at ${URL}`);
  });
