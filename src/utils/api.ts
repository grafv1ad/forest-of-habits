import axios from "axios";

import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  timeout: 3000,
  withCredentials: true,
  headers: { Authorization: `Bearer ${getCookie("token")}` },
});
