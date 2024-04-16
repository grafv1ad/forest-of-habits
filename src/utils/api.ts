import axios from "axios";

import { getCookie } from "./cookies";

const axiosConfig = {
  baseURL: "http://127.0.0.1:8097",
  timeout: 3000,
  headers: {},
};

const token = getCookie("token");
if (token) {
  axiosConfig.headers = {
    Authorization: `Bearer ${token}`,
  };
}

export const axiosInstance = axios.create(axiosConfig);
