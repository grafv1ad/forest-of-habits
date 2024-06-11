import axios from "axios";

import { getCookie } from "./cookies";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
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
