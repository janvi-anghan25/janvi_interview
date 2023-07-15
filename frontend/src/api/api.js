import axios from "axios";
import { DEV_URL } from "./url";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (url, paydata) => {
    return axios.post(DEV_URL + url, paydata);
  },

  get: (url) => {
    return axios.get(DEV_URL + url);
  },

  delete: (url, paydata) => {
    return axios.delete(DEV_URL + url, paydata);
  },
};
