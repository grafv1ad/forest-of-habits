import axios from "axios";

import { getCookie } from "./cookies";

export async function request<T>(
  url: string,
  methodName: string,
  bodyObj: any = {}
): Promise<T> {
  try {
    const res = await axios({
      url: `${url}`,
      method: methodName,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: bodyObj,
    });
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return error.response?.data.errText;
    }
    return error;
  }
}
