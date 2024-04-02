import axios from "axios";

import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8097",
  timeout: 3000,
  headers: { Authorization: `Bearer ${getCookie("jwt-token")}` },
});
