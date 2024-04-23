import axios from "axios";

import { getCookie } from "./cookies";

const axiosConfig = {
  baseURL: "http://185.50.202.250:8097",
  timeout: 3000,
  headers: {},
};

const token = getCookie("jwt-token");
if (token) {
  axiosConfig.headers = {
    Authorization: `Bearer ${token}`,
  };
}

export const axiosInstance = axios.create(axiosConfig);
