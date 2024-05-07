import axios from "axios";

import { getCookie } from "./cookies";

const API = axios.create({
  baseURL: "http://185.50.202.250:8097",
  timeout: 3000,
});

API.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
  return config;
});

export const axiosInstance = API;
