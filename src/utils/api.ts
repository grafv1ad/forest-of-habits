import axios from "axios";

import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8097",
  timeout: 3000,
  withCredentials: true,
  headers: { Authorization: `Bearer ${getCookie("token")}` },
});
